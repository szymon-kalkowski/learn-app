"use strict";

const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.postTraining = async (event) => {
  try {
    const { studentId, trainerId, date, duration, name, type, description } =
      JSON.parse(event.body);

    if (!studentId || !trainerId || !date || !duration || !name || !type) {
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

    const training = {
      id: uuidv4(),
      studentId,
      trainerId,
      date,
      duration,
      name,
      type,
      description,
    };

    await dynamoDb
      .put({
        TableName: "trainings",
        Item: training,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(training, null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Internal server error",
          errorCode: 500,
        },
        null,
        2
      ),
    };
  }
};

module.exports.getTrainings = async (event) => {
  try {
    const { headers } = event;
    if (!headers.authorization) {
      return {
        statusCode: 401,
        body: JSON.stringify(
          {
            message: "Unauthorized",
            errorCode: 401,
          },
          null,
          2
        ),
      };
    }

    const token = headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "student") {
      const trainings = await dynamoDb
        .scan({
          TableName: "trainings",
          FilterExpression: "studentId = :studentId",
          ExpressionAttributeValues: {
            ":studentId": decoded.id,
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(trainings.Items, null, 2),
      };
    } else if (decoded.role === "trainer") {
      const trainings = await dynamoDb
        .scan({
          TableName: "trainings",
          FilterExpression: "trainerId = :trainerId",
          ExpressionAttributeValues: {
            ":trainerId": decoded.id,
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(trainings.Items, null, 2),
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Internal server error",
          errorCode: 500,
        },
        null,
        2
      ),
    };
  }
};
