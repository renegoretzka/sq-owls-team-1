/* Amplify Params - DO NOT EDIT
	API_SHOPPINGLIST_GRAPHQLAPIENDPOINTOUTPUT
	API_SHOPPINGLIST_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

require("es6-promise").polyfill();
require("isomorphic-fetch");

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });

const AWSAppSyncClient = require("aws-appsync").default;
const { AUTH_TYPE } = require("aws-appsync");
const gql = require("graphql-tag");

const config = {
  url: process.env.API_SHOPPINGLIST_GRAPHQLAPIENDPOINTOUTPUT,
  region: process.env.REGION,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials,
  },
  disableOffline: true,
};

const client = new AWSAppSyncClient(config);

const {
  createUser,
  createShoppingList,
  createMembership,
} = require("./graphql.js");

const initializeUser = async (id) => {
  try {
    const { userMutation } = await client.mutate({
      mutation: gql(createUser),
      variables: {
        id,
      },
      fetchPolicy: "no-cache",
    });

    const { listMutation } = await client.mutate({
      mutation: gql(createShoppingList),
      variables: {
        name: "My Home List",
      },
      fetchPolicy: "no-cache",
    });

    await client.mutate({
      mutation: gql(createMembership),
      variables: {
        userID: userMutation.createUser.id,
        listID: listMutation.createShoppingList.id,
      },
      fetchPolicy: "no-cache",
    });
  } catch (error) {
    console.log("Something went wrong in the initializeUser function:", error);
  }
};

exports.handler = async (event, callback) => {
  await initializeUser(event.request.userAttributes.sub);
  callback.done(null, event);
};
