import { AiOutlineShoppingCart } from "react-icons/ai";

import ShoppingItem from "./ShoppingItem";
import TopBar from "./TopBar";
import Banner from "./DashBoardBanner";
import ShoppingList from "./ShoppingList";

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

const DashBoard = () => {
  return (
    <div className="dashboard"> 
      <TopBar />
      <div className="dash-main">
        <div className="left">
          <Banner />

          <div className="input-form">
            <input type="text" placeholder="Add items"/>
            <button>
              <AiOutlineShoppingCart />
            </button>
          </div>
          <div className="list-title">My List</div>
          <ShoppingList listID={undefined} />
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
