exports.createUser = /* GraphQL */ `
  query createUser($name: String) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

exports.createShoppingList = /* GraphQL */ `
  query createShoppingList($name: String) {
    createShoppingList(name: $name) {
      id
      name
    }
  }
`;

exports.createMembership = /* GraphQL */ `
  query createMembership($listID: ID!, $userID: ID!) {
    createShoppingList(listID: $listID, userID: $userID) {
      id
      listID
      userID
    }
  }
`;
