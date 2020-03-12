import React from "react";
import { baseURL } from "../axios";

export default function NotificationItem({
  pp,
  text,
  post,
  time,
  profilePicture
}) {
  return (
    <div className="notification">
      <img
        className="noti-pp"
        src={profilePicture ? baseURL + profilePicture : pp}
        alt=""
      />
      <span>
        <strong>{text.split("commented")[0]}</strong>
        commented{text.split("commented")[1] + " "}
        {time}
      </span>
      <img className="noti-post" src={post} alt="" />
    </div>
  );
}
