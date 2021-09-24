import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

import ShoppingItem from "./ShoppingItem";
import TopBar from "./TopBar";
import Banner from "./DashBoardBanner";
import ShoppingList from "./ShoppingList";
import { fetchItems, createItem, deleteItem } from "../../api/api";
import ItemForm from "../itemform/ItemForm";
import Alert from "../tools/Alert";
import AddListModal from "./AddListModal";
import UserItem from "./userItem";

const DashBoard = ({
  currentList,
  modalVisible,
  setModalVisible,
  createNewList,
  createNewItem,
  handleDeactivate,
}) => {
  const listItems = currentList?.list.items.items || [];
  const listName = currentList?.list.name || "";

  const [newItemName, setNewItemName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleAddItem = (e) => {
    if (newItemName === "") return;
    createNewItem(newItemName);
    setNewItemName("");
    setShowAlert(true);
  };

  return (
    <div className="dashboard">
      {modalVisible && (
        <AddListModal
          setModalVisible={setModalVisible}
          createNewList={createNewList}
        />
      )}

      <TopBar />
      <div className="dash-main">
        <div className="left">
          <Banner />
          <div className="input-form">
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              type="text"
              placeholder="Add items"
            />
            <button onClick={handleAddItem}>
              <AiOutlineShoppingCart />
            </button>
          </div>
          {showAlert && (
            <Alert
              type="success"
              text="Item added successfully"
              closeCallback={() => setShowAlert(false)}
            />
          )}
          <div className="list-title">{listName}</div>
          {listItems
            .filter((item) => item.status === "ACTIVE")
            .map((item) => (
              <ShoppingItem
                handleDeactivate={handleDeactivate}
                key={item.id}
                item={item}
              />
            ))}
        </div>

        <aside className="right">
          <div className="list-title">Recent Items</div>
          {listItems
            .filter((item) => item.status === "INACTIVE")
            .slice(0, 5)
            .map((item, index) => (
              <ShoppingItem
                handleDeactivate={handleDeactivate}
                key={index}
                item={item}
                mini={true}
              />
            ))}
          <br />
          <br />
          <div className="list-title">who else can see this list</div>
          {["Father", "Mother"].map((username, index) => (
            <UserItem username={username} key={index} />
          ))}
          <button className="add-user">
            <span>+</span> Add someone else
          </button>
        </aside>
      </div>
    </div>
  );
};

export default DashBoard;
