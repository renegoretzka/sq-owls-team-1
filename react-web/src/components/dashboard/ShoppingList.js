import React, { useEffect } from "react";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({ items, deleteCallback }) {
  return (
    <div>
      {items.map((item, index) => (
        <ShoppingItem
          key={item.id}
          item={item}
          deleteCallback={(item) => deleteCallback(item)}
        />
      ))}
    </div>
  );
}
