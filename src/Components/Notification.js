import React from "react";
import profilePic from "../Images/pp.jpg";
import dropdown from "../Images/down-arrow.svg";
import NotificationItem from "./NotificationItem";
import pp1 from "../Images/pp1.jpg";
import bed from "../Images/bed.svg";
import pp2 from "../Images/pp2.jpg";
import { Link, withRouter } from "react-router-dom";
import myAxios, { getAuthorizationHeaders, baseURL } from "../axios";
import moment from "moment";

function Notification({ history }) {
  const [showLogout, setShowLogout] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  const getNotifications = () => {
    myAxios.get("/notification", getAuthorizationHeaders()).then(({ data }) => {
      setNotifications(data);
      console.log(data);
    });
  };

  React.useEffect(() => {
    getNotifications();
    setInterval(getNotifications, 20000);
    //eslint-disable-next-line
  }, []);
  return (
    <div className="notifications">
      <div className="notification-header">
        <span>
          <strong>Notifications</strong>
        </span>
        <Link to="/home/profile">
          <img id="pp" src={profilePic} alt="" />
        </Link>
        <img
          id="drop-down"
          src={dropdown}
          onClick={() => {
            setShowLogout(!showLogout);
          }}
          alt=""
        />
      </div>
      {showLogout && (
        <div
          style={{
            position: "fixed",
            background: "white",
            right: "2.4rem",
            top: "6.5rem",
            border: "1px solid #CCC",
            padding: "0.5rem 1rem"
          }}
        >
          <div
            onClick={() => {
              history.push("/login");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </div>
        </div>
      )}
      {notifications.map(notification => (
        <Link to={"/home/post/" + notification.post._id}>
          <NotificationItem
            key={notification._id}
            pp={pp1}
            userName={notification.user.name}
            post={baseURL + notification.post.image}
            time={moment(notification.createdAt).fromNow()}
          />
        </Link>
      ))}
    </div>
  );
}

export default withRouter(Notification);
