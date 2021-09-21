import { useState } from "react";

const ShoppingItem = ({ item, mini }) => {
  const [shoppingItem, setItem] = useState({ ...item });

  const increaseCount = () =>
    setItem({ ...shoppingItem, count: shoppingItem.count + 1 });

  const decreaseCount = () => {
    if (shoppingItem.count == 1) return;
    setItem({ ...shoppingItem, count: shoppingItem.count - 1 });
  };

  return (
    <div className="shopping-item">
      <div className="item-icon">{shoppingItem.name[0]}</div>
      <div className="item-main">
        <div className="item-name">{shoppingItem.name}</div>
        <div className="item-price">{`$${shoppingItem.prize}`}</div>
      </div>

      {!mini && (
        <div className="item-count">
          <button onClick={increaseCount} className="btn1">
            +
          </button>
          <div className="count">{shoppingItem.count}</div>
          <button onClick={decreaseCount} className="btn2">
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingItem;
