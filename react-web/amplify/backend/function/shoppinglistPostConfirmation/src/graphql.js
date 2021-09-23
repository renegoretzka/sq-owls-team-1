exports.createUser = /* GraphQL */ `
  mutation createUser($id: ID) {
    createUser(input: { id: $id }) {
      id
      name
    }
  }
`;

exports.createShoppingList = /* GraphQL */ `
  mutation createShoppingList($name: String) {
    createShoppingList(input: { name: $name }) {
      id
      name
    }
  }
`;

exports.createMembership = /* GraphQL */ `
  mutation createMembership($listID: ID!, $userID: ID!) {
    createMembership(input: { listID: $listID, userID: $userID }) {
      id
      listID
      userID
    }
  }
`;
