/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Link} from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"

const User = {
  name: "Poppy",
  Email: "test@test.com",
  Win: 70,
  Loss: 0
}

const UserProfile = () => {
  return (
    <div className="User">
      <div className="User-container">
        <p>
          Player Name: {User.name}
        </p>
        <p>
          Player Email:{User.email}
        </p>
        <p>
          Game Record: {User.Win} : {User.Loss}
        </p>
        <button>
        <Link to={`/profile/${User.name}`}>Edit Profile information</Link>
        </button>
      </div>
      </div>
  )
};

export default UserProfile;
