"use strict";

const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getMe = async (event) => {
  const { headers } = event;
  try {
    const token = headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const params = {
      TableName: "users",
      Key: {
        id: decoded.id,
      },
    };

    const { Item: user } = await dynamoDb.get(params).promise();

    if (decoded.role === "student") {
      const studentParams = {
        TableName: "students",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": decoded.id },
      };

      const response = await dynamoDb.query(studentParams).promise();
      const student = response.Items[0];

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            ...user,
            ...student,
          },
          null,
          2
        ),
      };
    } else if (decoded.role === "trainer") {
      const trainerParams = {
        TableName: "trainers",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": decoded.id },
      };

      const response = await dynamoDb.query(trainerParams).promise();
      const trainer = response.Items[0];

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            ...user,
            ...trainer,
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

module.exports.deleteMe = async (event) => {
  const { headers } = event;
  try {
    const token = headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const params = {
      TableName: "users",
      Key: {
        id: decoded.id,
      },
    };

    await dynamoDb.delete(params).promise();

    if (decoded.role === "student") {
      const studentParams = {
        TableName: "students",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": decoded.id },
      };

      const response = await dynamoDb.query(studentParams).promise();
      const student = response.Items[0];

      if (student) {
        const studentDeleteParams = {
          TableName: "students",
          Key: {
            id: student.id,
          },
        };

        await dynamoDb.delete(studentDeleteParams).promise();
      }
    } else if (decoded.role === "trainer") {
      const trainerParams = {
        TableName: "trainers",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": decoded.id },
      };

      const response = await dynamoDb.query(trainerParams).promise();
      const trainer = response.Items[0];

      if (trainer) {
        const trainerDeleteParams = {
          TableName: "trainers",
          Key: {
            id: trainer.id,
          },
        };

        await dynamoDb.delete(trainerDeleteParams).promise();
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted" }, null, 2),
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

module.exports.updatePassword = async (event) => {
  const { headers } = event;
  const { oldPassword, newPassword } = JSON.parse(event.body);
  try {
    if (!oldPassword || !newPassword) {
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

    const token = headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const params = {
      TableName: "users",
      Key: {
        id: decoded.id,
      },
    };

    const { Item: user } = await dynamoDb.get(params).promise();

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Invalid password",
            errorCode: 400,
          },
          null,
          2
        ),
      };
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateParams = {
        TableName: "users",
        Key: {
          id: decoded.id,
        },
        UpdateExpression: "set password = :password",
        ExpressionAttributeValues: {
          ":password": hashedPassword,
        },
        ReturnValues: "UPDATED_NEW",
      };

      await dynamoDb.update(updateParams).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Password updated" }, null, 2),
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
