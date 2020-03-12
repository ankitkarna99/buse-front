import React from "react";
import profile from "../Images/profile-pic.svg";
import { baseURL } from "../axios";
import { Link } from "react-router-dom";

export default function Profile({ name, profilePicture }) {
  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={profilePicture ? baseURL + profilePicture : profile} alt="" />
      </div>
      <div className="buttons">
        <h2>{name}</h2>
        <Link to="/home/addProfilePicture">
          <button id="connect">Edit Profile Picture</button>
        </Link>
      </div>
    </div>
  );
}
