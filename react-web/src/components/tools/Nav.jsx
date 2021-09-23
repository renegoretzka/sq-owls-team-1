import { AiOutlineShoppingCart } from "react-icons/ai";
import useWindowDimensions from "./useWindowDimensions";

const DestopNav = ({ lists, setCurrentListId, currentListId }) => {
  console.log(currentListId, lists);
  return (
    <nav className="desktop-nav">
      <div className="logo">
        <AiOutlineShoppingCart />
      </div>
      <div className="list-title">My Lists</div>

      {lists?.map((list) => (
        <div
          className={`list-btn ${
            list.list.id === currentListId ? "active" : ""
          }`}
          key={list.list.id}
          onClick={() => setCurrentListId(list.list.id)}
        >
          {list.list.title}
        </div>
      ))}
    </nav>
  );
};

const MobileNav = () => {
  return <nav className="mobile-nav"></nav>;
};

const Nav = () => {
  const dimensions = useWindowDimensions();
  if (dimensions.width <= 760) {
    return <MobileNav />;
  } else {
    return <DestopNav />;
  }
};

export default Nav;
