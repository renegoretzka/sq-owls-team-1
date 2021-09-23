import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import useWindowDimensions from "./useWindowDimensions";

const DestopNav = () => {
  return (
    <nav className="desktop-nav">
      <div className="logo">
        <AiOutlineShoppingCart />
      </div>
      <div className="logo-alt">
        <AiOutlineMenu/>
      </div>
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
