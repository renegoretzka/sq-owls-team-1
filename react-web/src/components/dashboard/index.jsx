import { AiOutlineShoppingCart } from "react-icons/ai";
import ShoppingItem from "./ShoppingItem";
import TopBar from "./TopBar";
import Banner from "./DashBoardBanner";
import AddListModal from "./AddListModal";
import { useState } from "react";

const items = [
  {
    name: "Banana",
    prize: "2.99",
    count: 1,
  },
  {
    name: "Loaf of bread",
    prize: "1.99",
    count: 2,
  },
  {
    name: "Tin of milk",
    prize: "40",
    count: 1,
  },
  {
    name: "Cooking gas",
    prize: "85",
    count: 3,
  },
];

const DashBoard = ({
  currentList,
  modalVisible,
  setModalVisible,
  createNewList,
  createNewItem,
}) => {
  const listItems = currentList?.list.items.items || [];
  const listName = currentList?.list.name || "";

  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = (e) => {
    if (newItemName === "") return;
    createNewItem(newItemName);
    setNewItemName("");
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
          <div className="list-title">{listName}</div>
          {listItems.map((item) => (
            <ShoppingItem key={item.id} item={item} />
          ))}
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
