/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMembership = /* GraphQL */ `
  mutation CreateMembership(
    $input: CreateMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    createMembership(input: $input, condition: $condition) {
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
export const updateMembership = /* GraphQL */ `
  mutation UpdateMembership(
    $input: UpdateMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    updateMembership(input: $input, condition: $condition) {
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
export const deleteMembership = /* GraphQL */ `
  mutation DeleteMembership(
    $input: DeleteMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    deleteMembership(input: $input, condition: $condition) {
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
export const createShoppingList = /* GraphQL */ `
  mutation CreateShoppingList(
    $input: CreateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    createShoppingList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      users {
        items {
          id
          userID
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      items {
        items {
          id
          name
          quantity
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateShoppingList = /* GraphQL */ `
  mutation UpdateShoppingList(
    $input: UpdateShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    updateShoppingList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      users {
        items {
          id
          userID
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      items {
        items {
          id
          name
          quantity
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteShoppingList = /* GraphQL */ `
  mutation DeleteShoppingList(
    $input: DeleteShoppingListInput!
    $condition: ModelShoppingListConditionInput
  ) {
    deleteShoppingList(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      users {
        items {
          id
          userID
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
      items {
        items {
          id
          name
          quantity
          listID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      name
      quantity
      listID
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      name
      quantity
      listID
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      name
      quantity
      listID
      createdAt
      updatedAt
    }
  }
`;
