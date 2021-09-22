// Doc: https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/module-four/

import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import {
  createTodo as createTodoMutation,
  deletetodo as deleteTodoMutation,
} from "../graphql/mutations";

export async function fetchTodos() {
  const { data } = await API.graphql({ query: listTodos });
  return data.listTodos.items; // Just data?
}

export async function createTodo(newTodo) {
  if (!newTodo.name || !newTodo.description) return;
  await API.graphql({
    query: createTodoMutation,
    variables: { input: newTodo },
  });
  //setTodos([...todos, newTodo]);
  //setFormData(initialFormState);
}

export async function deleteTodo({ id }) {
  /* This should be handled in react
  const newTodosArray = todo.filter((todo) => todo.id !== id);
  setTodos(newTodosArray);
  */
  await API.graphql({
    query: deleteTodoMutation,
    variables: { input: { id } },
  });
}
