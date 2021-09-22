import { AiOutlineShoppingCart } from "react-icons/ai";
import ShoppingItem from "./ShoppingItem";
import TopBar from "./TopBar";
import Banner from "./DashBoardBanner";

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

const DashBoard = () => { 
  return (
    <div className="dashboard">
      <TopBar />
      <div className="dash-main">
        <div className="left">
          <Banner />

          <div className="input-form">
            <input type="text" placeholder="What do you want to buy ?" />
            <button>
              <AiOutlineShoppingCart />
            </button>
          </div>
          <div className="list-title">My List</div>
          {items.map((item, index) => (
            <ShoppingItem key={index} item={item} />
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
