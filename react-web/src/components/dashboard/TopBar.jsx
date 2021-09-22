import { AiOutlineSearch } from "react-icons/ai";
import { Auth, Hub } from "aws-amplify";

const TopBar = () => {
  const handleSignOutButtonClick = async () => {
    try {
      await Auth.signOut();
      Hub.dispatch("UI Auth", {
        event: "AuthStateChange",
        message: "signedout",
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="top-bar">
      <div className="search-form">
        <AiOutlineSearch color="black" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="user">
        <button className="signout" onClick={handleSignOutButtonClick}>
          Sign out
        </button>
        <div>Hello Nick</div>
        <img className="profile-img" src="/avatar.png" alt="profile img" />
      </div>
    </div>
  );
};

export default TopBar;
