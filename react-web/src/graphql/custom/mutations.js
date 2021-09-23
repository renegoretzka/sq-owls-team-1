const createItem = /* GraphQL */ `
  mutation createItem(
    $name: String!
    $quantity: String
    $listID: ID!
    $status: ItemStatusEnum
  ) {
    createItem(
      input: {
        name: $name
        quantity: $quantity
        listID: $listID
        status: $status
      }
    ) {
      id
      name
      quantity
      listID
      updatedAt
      status
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

const updateItem = /* GraphQL */ `
  mutation updateItem(
    $id: ID!
    $name: String
    $quantity: String
    $status: ItemStatusEnum
  ) {
    updateItem(
      input: { id: $id, name: $name, quantity: $quantity, status: $status }
    ) {
      id
      name
      quantity
      listID
      status
      updatedAt
    }
  }
`;

export {
  createItem,
  createMembership,
  createMembershipNewList,
  createShoppingList,
  updateItem,
};
