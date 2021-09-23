// Doc: https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-four/

import { API } from "aws-amplify";
import { getUser as getUserQuery } from "../graphql/queries";
import {
  createItem as createItemMutation,
  updateItem as updateItemMutation,
  deleteItem as deleteItemMutation,
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
