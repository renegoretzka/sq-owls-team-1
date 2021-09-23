import "../App.css";
import Nav from "./tools/Nav";
import DashBoard from "./dashboard";
import { Auth, API } from "aws-amplify";
import Amplify from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { getUser } from "../graphql/custom/user.queries";
import {
  createItem,
  createMembership,
  createShoppingList,
  updateItem,
} from "../graphql/custom/mutations";
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
    if (!user) return;
    if (lists.length < 1) return;
    let subscriptions = [];

    for (let i = 0; i < lists.length; i++) {
      const listId = lists[i].list.id;

      subscriptions[i] = API.graphql({
        query: syncItems,
        variables: { listID: listId },
      }).subscribe({
        next: ({ value }) => {
          let subscribedList = {
            ...lists.find((list) => list.list.id === listId),
          };

          subscribedList.list.items.items.push(value.data.syncItems);

          const newLists = [
            subscribedList,
            ...lists.filter((list) => list.list.id !== listId),
          ];

          setList(newLists);
        },
        error: (error) => setRefresh(!refresh),
      });
    }

    return () => {
      for (let i = 0; i < lists.length; i++) {
        let subscription = subscriptions[i];
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    };
  };

  useEffect(subscribeToList, [user, lists]);

  useEffect(() => {
    if (lists === []) return;
    let currentList = lists.find((list) => list.list.id === currentListId);
    currentList &&
      currentList.list.items.items.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    setCurrentList(currentList);
  }, [currentListId, lists]);

  useEffect(fetchUser, []);

  const createNewList = async (newListName) => {
    if (!user) return;
    try {
      let shopResult = await API.graphql({
        query: createShoppingList,
        variables: {
          name: newListName,
        },
      });

      let membershipResult = await API.graphql({
        query: createMembership,
        variables: {
          userID: userId,
          listID: shopResult.data.createShoppingList.id,
        },
      });

      setList([...lists, membershipResult.data.createMembership]);

      setModalVisible(false);
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
          status: "ACTIVE",
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

  const handleDeactivate = async (itemId) => {
    try {
      let currentList = {
        ...lists.find((list) => list.list.id === currentListId),
      };

      let currentItem = currentList.list.items.items.find(
        (item) => item.id === itemId
      );

      await API.graphql({
        query: updateItem,
        variables: { ...currentItem, status: "INACTIVE" },
      });

      currentItem.status = "INACTIVE";

      const newList = [
        currentList,
        ...lists.filter((list) => list.list.id !== currentListId),
      ];

      setList(newList);
    } catch (e) {
      console.log("error while handling deactivate", e);
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
        handleDeactivate={handleDeactivate}
      />
    </div>
  );
}

export default withAuthenticator(App);
