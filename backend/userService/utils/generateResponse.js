const generatePolicyDocument = (effect, resource) => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  };
};

const generateResponse = (principalId, effect, resource) => {
  return {
    principalId,
    policyDocument: generatePolicyDocument(effect, resource),
  };
};

module.exports.generateResponse = generateResponse;
