import "../App.css";
import Nav from "./tools/Nav";
import DashBoard from "./dashboard";
import { Auth, API } from "aws-amplify";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { getUser } from "../graphql/custom/user.queries";
import { createItem } from "../graphql/custom/mutations";
import { syncItems } from "../graphql/custom/subscription";

Amplify.configure(awsExports);

console.log(Auth.currentUserInfo());

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lists, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentListId, setCurrentListId] = useState(null);

  const currentList = lists.find((list) => list.id === currentListId);

  const fetchUser = async () => {
    const { attributes } = await Auth.currentUserInfo();
    setUserFromDatabase(attributes.sub);
  };

  const setUserFromDatabase = async (id) => {
    try {
      let result = await API.graphql({
        query: getUser,
        variables: { id: id },
      });
      setUser({ ...result.data.getUser });
      setUserId(result.data.getUser.id);
      setList(result.data.getUser.memberships.items);
      setCurrentListId(result.data.getUser.memberships.items[0].list.id);
    } catch (error) {
      console.log("Error from setUserFromDatabase", error);
    }
  };

  const addDemoItem = async () => {
    if (!user) return;
    console.log(user, user.memberships.items[0].list.id);
    try {
      let result = await API.graphql({
        query: createItem,
        variables: {
          name: "Demo Item",
          quantity: "2KG",
          listID: user.memberships.items[0].list.id,
        },
      });
      console.log(result);
    } catch (error) {
      console.log("Error from addDemoItem", error);
    }
  };

  const subscribeToList = () => {
    let subscription = null;
    if (!user) return;
    console.log("Subscribing to syncItems");
    subscription = API.graphql({
      query: syncItems,
      variables: { listID: user.memberships.items[0].list.id },
    }).subscribe({
      next: ({ value }) => {
        console.log(value.data.syncItems);
      },
      error: (error) => setRefresh(!refresh),
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  useEffect(fetchUser, []);
  // useEffect(subscribeToList, [refresh, user]);
  // useEffect(addDemoItem, [user]);

  return (
    <div className="App">
      <Nav
        lists={lists}
        setCurrentListId={setCurrentListId}
        currentListId={currentListId}
      />
      <DashBoard />
    </div>
  );
}

export default withAuthenticator(App);
