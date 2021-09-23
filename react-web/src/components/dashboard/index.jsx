import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

import ShoppingItem from "./ShoppingItem";
import TopBar from "./TopBar";
import Banner from "./DashBoardBanner";
import ShoppingList from "./ShoppingList";
import { fetchItems, createItem, deleteItem } from "../../api/api";
import ItemForm from "../itemform/ItemForm";
import Alert from "../tools/Alert";

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

const sortingMethods = {
  "alp-asc": (a, b) => ("" + a.name).localeCompare(b.name),
  "alp-des": (b, a) => ("" + a.name).localeCompare(b.name),
  "cnt-asc": (a, b) => a.count - b.count,
  "cnt-des": (b, a) => a.count - b.count,
};

const DashBoard = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [sortedBy, setSortedBy] = useState("alp-asc");

  const loadData = async () => {
    const res = await fetchItems();
    res.sort(sortingMethods[sortedBy]);
    console.log(res);
    setItems(res);
  };

  useEffect(() => {
    loadData();
    return () => {
      // await push list to server
    };
  }, []);

  function addListItem(newItem) {
    setShowPopup(false);
    if (newItem) {
      let newList = [...items, newItem];
      newList.sort(sortingMethods[sortedBy]);

      setItems(newList);
      //createItem(newItem); // should we await this?
    }
  }

  function deleteListItem({ id }) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    // deleteItem(id);
  }

  function handleSearch() {
    setShowPopup(true);
    //setSearchValue("");
  }

  return (
    <div className="dashboard">
      <TopBar />
      <div className="dash-main">
        <div className="left">
          <Banner />
          <div className="input-form">
            <input
              type="text"
              placeholder="Add items"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>
              <AiOutlineShoppingCart />
            </button>
          </div>
          {showPopup && (
            <ItemForm name={searchValue} submitCallback={addListItem} />
          )}
          {showAlert && <Alert text={showAlert} />}
          <div className="list-title">My List</div>
          <ShoppingList items={items} deleteCallback={deleteListItem} />
        </div>

        <aside className="right">
          <div className="list-title">Recent Items</div>
          {items.slice(0, 3).map((item, index) => (
            <ShoppingItem key={index} item={item} mini={true} />
          ))}

          <div className="list-title">Most Frequent</div>
          {items.slice(0, 2).map((item, index) => (
            <ShoppingItem key={index} item={item} mini={true} />
          ))}
        </aside>
      </div>
    </div>
  );
};

export default DashBoard;
