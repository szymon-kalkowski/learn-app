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

module.exports.updateMe = async (event) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    address,
    specializationId,
    isActive,
  } = JSON.parse(event.body);
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

    if (email) {
      const userExist = await dynamoDb
        .query({
          TableName: "users",
          IndexName: "EmailIndex",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: { ":email": email },
        })
        .promise();

      if (userExist.Count > 0 && userExist.Items[0].id !== decoded.id) {
        return {
          statusCode: 400,
          body: JSON.stringify(
            {
              message: "Email already exists",
              errorCode: 400,
            },
            null,
            2
          ),
        };
      }
    }

    const updateParams = {
      TableName: "users",
      Key: {
        id: decoded.id,
      },
      UpdateExpression:
        "set firstName = :firstName, lastName = :lastName, email = :email, isActive = :isActive",
      ExpressionAttributeValues: {
        ":firstName": firstName || user.firstName,
        ":lastName": lastName || user.lastName,
        ":email": email || user.email,
        ":isActive": isActive === undefined ? user.isActive : isActive,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const userResponse = await dynamoDb.update(updateParams).promise();
    const updatedUser = userResponse.Attributes;

    if (user.role === "student") {
      const studentParams = {
        TableName: "students",
        IndexName: "UserIdIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": decoded.id },
      };

      const response = await dynamoDb.query(studentParams).promise();

      if (response.Count > 0) {
        const student = response.Items[0];
        let studentUpdateExpression = "set ";
        let studentExpressionAttributeValues = {};

        if (address && dateOfBirth) {
          studentUpdateExpression +=
            "address = :address, dateOfBirth = :dateOfBirth";
          studentExpressionAttributeValues[":address"] = address;
          studentExpressionAttributeValues[":dateOfBirth"] = dateOfBirth;
        } else if (address) {
          studentUpdateExpression += " address = :address";
          studentExpressionAttributeValues[":address"] = address;
        } else if (dateOfBirth) {
          studentUpdateExpression += " dateOfBirth = :dateOfBirth";
          studentExpressionAttributeValues[":dateOfBirth"] = dateOfBirth;
        }

        const studentUpdateParams = {
          TableName: "students",
          Key: {
            id: student.id,
          },
          UpdateExpression: studentUpdateExpression,
          ExpressionAttributeValues: studentExpressionAttributeValues,
          ReturnValues: "UPDATED_NEW",
        };

        const result = await dynamoDb.update(studentUpdateParams).promise();
        const updatedStudent = result.Attributes;

        return {
          statusCode: 200,
          body: JSON.stringify(
            {
              ...user,
              ...updatedUser,
              ...updatedStudent,
            },
            null,
            2
          ),
        };
      }

      if (user.role === "trainer") {
        const trainerParams = {
          TableName: "trainers",
          IndexName: "UserIdIndex",
          KeyConditionExpression: "userId = :userId",
          ExpressionAttributeValues: { ":userId": decoded.id },
        };

        const response = await dynamoDb.query(trainerParams).promise();

        if (response.Count > 0) {
          const trainer = response.Items[0];
          const trainerUpdateParams = {
            TableName: "trainers",
            Key: {
              id: trainer.id,
            },
            UpdateExpression: "set specializationId = :specializationId",
            ExpressionAttributeValues: {
              ":specializationId": specializationId || trainer.specializationId,
            },
            ReturnValues: "UPDATED_NEW",
          };

          const result = await dynamoDb.update(trainerUpdateParams).promise();
          const updatedTrainer = result.Attributes;

          return {
            statusCode: 200,
            body: JSON.stringify(
              {
                ...user,
                ...updatedUser,
                ...updatedTrainer,
              },
              null,
              2
            ),
          };
        }
      }
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
