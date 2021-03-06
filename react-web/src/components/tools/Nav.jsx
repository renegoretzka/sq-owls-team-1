import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

const DestopNav = ({
  lists,
  setCurrentListId,
  currentListId,
  setModalVisible,
}) => {
  return (
    <nav className="desktop-nav">
      <div className="logo">
        <AiOutlineShoppingCart />
      </div>
{/*       
      <div className="logo-alt">
        <AiOutlineMenu/>
      </div> */}
    
      
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

      <div className="new-list">
        <button onClick={() => setModalVisible(true)}>+</button>
      </div>
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
