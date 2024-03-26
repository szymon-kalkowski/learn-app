"use strict";

const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateResponse } = require("./utils/generateResponse.js");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.register = async (event) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      photo,
      dateOfBirth,
      address,
      specializationId,
    } = JSON.parse(event.body);
    if (!firstName || !lastName || !email || !password || !role) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Invalid request",
            errorCode: 400,
          },
          null,
          2
        ),
      };
    }

    const userExist = await dynamoDb
      .query({
        TableName: "users",
        IndexName: "EmailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: { ":email": email },
      })
      .promise();

    if (userExist.Count > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "User already exist",
            errorCode: 400,
          },
          null,
          2
        ),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      role,
      photo,
      username: email,
      password: hashedPassword,
      isActive: false,
    };

    await dynamoDb.put({ TableName: "users", Item: user }).promise();

    if (role === "student") {
      const studnet = {
        id: uuidv4(),
        userId: user.id,
        dateOfBirth,
        address,
      };

      await dynamoDb.put({ TableName: "students", Item: studnet }).promise();
    } else if (role === "trainer") {
      const trainer = {
        id: uuidv4(),
        userId: user.id,
        specializationId,
      };

      await dynamoDb.put({ TableName: "trainers", Item: trainer }).promise();
    }

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: "User registered successfully",
          errorCode: 201,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Internal Server Error",
          errorCode: 500,
        },
        null,
        2
      ),
    };
  }
};

module.exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Invalid request",
            errorCode: 400,
          },
          null,
          2
        ),
      };
    }

    const user = await dynamoDb
      .query({
        TableName: "users",
        IndexName: "EmailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: { ":email": email },
      })
      .promise();

    if (user.Count === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: "User not found",
            errorCode: 404,
          },
          null,
          2
        ),
      };
    }

    const userData = user.Items[0];

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify(
          {
            message: "Invalid password",
            errorCode: 401,
          },
          null,
          2
        ),
      };
    }

    const token = jwt.sign(
      { ...userData, password: undefined },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    if (userData.role === "student") {
      const studentParams = {
        TableName: "students",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userData.id },
      };

      const response = await dynamoDb.query(studentParams).promise();
      const student = response.Items[0];

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            token,
            user: { ...userData, ...student, password: undefined },
          },
          null,
          2
        ),
      };
    } else if (userData.role === "trainer") {
      const trainerParams = {
        TableName: "trainers",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userData.id },
      };

      const response = await dynamoDb.query(trainerParams).promise();
      const trainer = response.Items[0];

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            token,
            user: { ...userData, ...trainer, password: undefined },
          },
          null,
          2
        ),
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Internal Server Error",
          errorCode: 500,
        },
        null,
        2
      ),
    };
  }
};

module.exports.jwtAuthorizer = async (event) => {
  const { headers, routeArn } = event;
  try {
    if (!headers.authorization) {
      return generateResponse("user", "Deny", routeArn);
    }

    const token = headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return generateResponse(decoded.id, "Allow", routeArn);
  } catch (error) {
    console.log("error", error);
    return generateResponse("user", "Deny", routeArn);
  }
};
