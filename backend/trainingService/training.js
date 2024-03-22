"use strict";

const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

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
