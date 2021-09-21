import { AiOutlineShoppingCart } from "react-icons/ai";

const DestopNav = () => {
  return (
    <nav className="desktop-nav">
      <div className="logo">
        <AiOutlineShoppingCart />
      </div>
    </nav>
  );
};

const MobileNav = () => {
  return <nav className="mobile-nav"></nav>;
};

export default DestopNav;
