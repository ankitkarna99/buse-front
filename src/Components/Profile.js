import React from "react";
import profile from "../Images/profile-pic.svg";

export default function Profile({ name }) {
  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={profile} alt="" />
      </div>
      <div className="buttons">
        <h2>{name}</h2>
        <button id="connect">Connect</button>
        <button id="message">Message</button>
      </div>
    </div>
  );
}
