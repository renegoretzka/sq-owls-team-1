import { AiOutlineSearch } from "react-icons/ai";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="search-form">
        <AiOutlineSearch color="black" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="user">
        <div>Hello Nick</div>
        <img className="profile-img" src="/avatar.png" alt="profile img" />
      </div>
    </div>
  );
};

export default TopBar;
