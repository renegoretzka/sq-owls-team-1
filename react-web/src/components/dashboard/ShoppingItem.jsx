import { BsCheckAll } from "react-icons/bs";
import { AiTwotoneCheckSquare } from "react-icons/ai";

const ShoppingItem = ({ item, handleDeactivate }) => {
  return (
    <div className="shopping-item">
      <div className="item-icon">{item.name[0]}</div>
      <div className="item-main">
        <div className="item-name">{item.name}</div>
        <div className="item-price">{`${item.quantity}`}</div>
      </div>
      <div className="item-count">
        {item.status === "ACTIVE" ? (
          <AiTwotoneCheckSquare
            className="active"
            onClick={() => handleDeactivate(item.id)}
          />
        ) : (
          <BsCheckAll onClick={() => handleDeactivate(item.id)} />
        )}

        <div className="count">{item.count}</div>
      </div>
    </div>
  );
};

export default ShoppingItem;
