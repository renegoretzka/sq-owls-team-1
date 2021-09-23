const createItem = /* GraphQL */ `
  mutation createItem($name: String!, $quantity: String, $listID: ID!) {
    createItem(input: { name: $name, quantity: $quantity, listID: $listID }) {
      id
      name
      quantity
      listID
      updatedAt
    }
  }
`;

const createShoppingList = /* GraphQL */ `
  mutation createShoppingList($name: String) {
    createShoppingList(input: { name: $name }) {
      id
      name
    }
  }
`;

const createMembershipNewList = /* GraphQL */ `
  mutation createMemberShip($userID: ID!, $listID: ID!) {
    createMemberShip(input: { userID: $userID, listID: $listID }) {
      list {
        id
        name
      }
    }
  }
`;

const createMembership = /* GraphQL */ `
  mutation createMembership($userID: ID!, $listID: ID!) {
    createMembership(input: { userID: $userID, listID: $listID }) {
      id
      list {
        id
        name
        items {
          items {
            id
            name
            quantity
          }
        }
      }
    }
  }
`;

export { createItem, createMembership };
