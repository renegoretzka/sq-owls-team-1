import { useState } from "react";

const ShoppingItem = ({ item, mini, handleDeactivate }) => {
  return (
    <div className="shopping-item">
      <div className="item-icon">{item.name[0]}</div>
      <div className="item-main">
        <div className="item-name">{item.name}</div>
        <div className="item-price">{`${item.quantity}`}</div>
      </div>

      {!mini && (
        <div className="item-count">
          <button onClick={() => handleDeactivate(item.id)} className="btn2">
            -
          </button>
          <div className="count">{item.count}</div>
        </div>
      )}
    </div>
  );
};

export default ShoppingItem;
