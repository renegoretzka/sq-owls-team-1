/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncItems = /* GraphQL */ `
  subscription SyncItems($listID: ID!) {
    syncItems(listID: $listID) {
      id
      name
      quantity
      listID
      createdAt
      updatedAt
    }
  }
`;
export const syncMembership = /* GraphQL */ `
  subscription SyncMembership($userID: ID!) {
    syncMembership(userID: $userID) {
      id
      userID
      listID
      createdAt
      updatedAt
      user {
        id
        name
        createdAt
        updatedAt
        memberships {
          nextToken
        }
      }
      list {
        id
        name
        createdAt
        updatedAt
        users {
          nextToken
        }
        items {
          nextToken
        }
      }
    }
  }
`;
