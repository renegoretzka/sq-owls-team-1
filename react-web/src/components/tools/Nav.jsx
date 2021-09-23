import { AiOutlineShoppingCart } from "react-icons/ai";
import useWindowDimensions from "./useWindowDimensions";

const DestopNav = ({ lists, setCurrentListId, currentListId }) => {
  return (
    <nav className="desktop-nav">
      <div className="logo">
        <AiOutlineShoppingCart />
      </div>
      <div className="list-title">My Lists</div>

      {lists?.map((list) => {
        const { id, name } = list.list;
        return (
          <div
            key={id}
            className={`list-btn ${id === currentListId ? "active" : ""}`}
            onClick={() => setCurrentListId(id)}
          >
            {name}
          </div>
        );
      })}
    </nav>
  );
};

const MobileNav = () => {
  return <nav className="mobile-nav"></nav>;
};

const Nav = (props) => {
  const dimensions = useWindowDimensions();
  if (dimensions.width <= 760) {
    return <MobileNav />;
  } else {
    return <DestopNav {...props} />;
  }
};

export default Nav;
