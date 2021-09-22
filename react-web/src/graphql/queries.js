/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      createdAt
      updatedAt
      memberships {
        items {
          id
          userID
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
