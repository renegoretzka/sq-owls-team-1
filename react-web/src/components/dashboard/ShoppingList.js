import React, { useState, useEffect } from "react";
import { fetchItems, createItem, deleteItem } from "../../api/api";
import ShoppingItem from "./ShoppingItem";

const sortingMethods = {
  "alp-asc": (a, b) => ("" + a.name).localeCompare(b.name),
  "alp-des": (b, a) => ("" + a.name).localeCompare(b.name),
  "cnt-asc": (a, b) => a.count - b.count,
  "cnt-des": (b, a) => a.count - b.count,
};

export default function ShoppingList({ listID, sortedBy = "alp-asc" }) {
  const [items, setItems] = useState([]);

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
    let newList = [...items, newItem];
    newList.sort(sortingMethods[sortedBy]);
    setItems(newList);
    // clear form
    //createItem(newItem); // should we await this?
  }

  function deleteListItem({ id }) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    //deleteItem(id);
  }

  return (
    <div>
      {items.map((item, index) => (
        <ShoppingItem
          key={item.id}
          item={item}
          deleteCallback={(item) => deleteListItem(item)}
        />
      ))}
    </div>
  );
}
