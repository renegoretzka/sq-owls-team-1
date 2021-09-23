import React, { useState, useEffect } from "react";
import { fetchItems, createItem, deleteItem } from "../../api/api";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({ listID }) {
  const [items, setItems] = useState([]);

  const loadData = async () => {
    const res = await fetchItems();
    setItems(res);
    console.log("AHDAWAGASASDF");
  };

  useEffect(() => {
    console.log("what");
    loadData();
    return () => {
      // await push list to server
    };
  }, []);

  function addItem(newItem) {
    setItems([...items, newItem]);
    //clearForm
    createItem(newItem); // should we await this?
  }

  function deleteItem({ id }) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    deleteItem(id);
  }

  return (
    <div>
      {items.map((item, index) => (
        <ShoppingItem key={index} item={item} />
      ))}
    </div>
  );
}
