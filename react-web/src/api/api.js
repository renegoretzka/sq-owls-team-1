// Doc: https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-four/

import { API } from "aws-amplify";
import { getUser as getUserQuery } from "../graphql/queries";
import {
  createItem as createItemMutation,
  updateItem as updateItemMutation,
  deleteItem as deleteItemMutation,
  createMembership as createMembershipMutation,
  updateMembership as updateMembershipMutation,
  deleteMembership as deleteMembershipMutation,
  createShoppingList as createShoppingListMutation,
  updateShoppingList as updateShoppingListMutation,
  deleteShoppingList as deleteShoppingListMutation,
} from "../graphql/mutations";

export async function getUser() {
  const { data } = await API.graphql({ query: getUserQuery });
  return data; // Just data?
}

export async function fetchItems() {
  const items = [
    {
      name: "Banana",
      id: "abc",
      count: 1,
    },
    {
      name: "Loaf of bread",
      id: "asd",
      count: 2,
    },
    {
      name: "Tin of milk",
      id: "abcs",
      count: 1,
    },
    {
      name: "Cooking gas",
      id: "a2bc",
      count: 3,
    },
  ];
  return items;
}

export async function createItem(newItem) {
  if (!newItem.name || !newItem.quantity) return;
  await API.graphql({
    query: createItemMutation,
    variables: { input: newItem },
  });
}

export async function updateItem(newItem) {
  if (!newItem.name || !newItem.quantity) return;
  await API.graphql({
    query: updateItemMutation,
    variables: { input: newItem },
  });
}

export async function deleteItem(id) {
  await API.graphql({
    query: deleteItemMutation,
    variables: { input: { id } },
  });
}

/* End of item API */

export async function createMembership(newMutation) {
  // clean data
  await API.graphql({
    query: createMembershipMutation,
    variables: { input: newMutation },
  });
}

export async function updateMembership(newMutation) {
  // clean data
  await API.graphql({
    query: updateMembershipMutation,
    variables: { input: newMutation },
  });
}

export async function deleteMembership(id) {
  await API.graphql({
    query: deleteMembershipMutation,
    variables: { input: { id } },
  });
}

/* End of membership API */

export async function createShoppingList(newShoppingList) {
  // clean data
  await API.graphql({
    query: createShoppingListMutation,
    variables: { input: newShoppingList },
  });
}

export async function updateShoppingList(newShoppingList) {
  // clean data
  await API.graphql({
    query: updateShoppingListMutation,
    variables: { input: newShoppingList },
  });
}

export async function deleteShoppingList(id) {
  await API.graphql({
    query: deleteShoppingListMutation,
    variables: { input: { id } },
  });
}

/* End of list API */
