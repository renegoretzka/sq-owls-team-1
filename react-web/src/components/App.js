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

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lists, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentListId, setCurrentListId] = useState(null);
  const [currentList, setCurrentList] = useState(null);

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

  useEffect(() => {
    if (lists === []) return;
    let currentList = lists.find((list) => list.list.id === currentListId);
    currentList &&
      currentList.list.items.items.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    setCurrentList(currentList);
    console.log("currentList", currentList);
  }, [currentListId, lists]);

  // useEffect(subscribeToList, [refresh, user]);

  const createNewList = (newListName) => {
    console.log(newListName);
    if (!user) return;
    try {
      let result = await API.graphql({
        query: createItem,
        variables: {
          name: newLItemName,
          quantity: "2KG",
          listID: currentListId,
        },
      });
    } catch (error) {
      console.log("Error from addDemoItem", error);
    }
  };

  const createNewItem = async (newLItemName) => {
    if (!user) return;
    try {
      let result = await API.graphql({
        query: createItem,
        variables: {
          name: newLItemName,
          quantity: "2KG",
          listID: currentListId,
        },
      });

      let currentList = {
        ...lists.find((list) => list.list.id === currentListId),
      };

      currentList.list.items.items.push(result.data.createItem);

      const newList = [
        currentList,
        ...lists.filter((list) => list.list.id !== currentListId),
      ];

      setList(newList);
    } catch (error) {
      console.log("Error from addDemoItem", error);
    }
  };

  return (
    <div className="App">
      <Nav
        lists={lists}
        setCurrentListId={setCurrentListId}
        currentListId={currentListId}
        setModalVisible={setModalVisible}
      />
      <DashBoard
        currentList={currentList}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        createNewList={createNewList}
        createNewItem={createNewItem}
      />
    </div>
  );
}

export default withAuthenticator(App);
