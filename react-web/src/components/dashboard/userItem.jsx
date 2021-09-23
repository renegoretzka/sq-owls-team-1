import { useState } from "react";

const UserItem = ({ username }) => {
  return (
    <div className="user-item">
      <div className="user-icon">
        <img className="profile-img" src="/avatar.png" alt="profile img" />
      </div>
      <div className="user-main">
        <div className="user-name">{username}</div>
      </div>
    </div>
  );
};

export default UserItem;
