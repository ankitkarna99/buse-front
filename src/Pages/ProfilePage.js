import React from "react";
import Post from "../Components/Post";
import bed from "../Images/bed.svg";
import Profile from "../Components/Profile";
import myAxios, { getAuthorizationHeaders, baseURL } from "../axios";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [posts, setPosts] = React.useState([]);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    myAxios
      .get("/post/mine", getAuthorizationHeaders())
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(err => {
        console.log(err);
      });
    myAxios
      .get("/user/aboutMe", getAuthorizationHeaders())
      .then(({ data }) => {
        setName(data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="profilePage">
      <div className="profiles">
        <Profile name={name} />
        <div></div>
      </div>
      <div className="posts">
        {posts.map(post => (
          <Link key={post._id} to={"/home/post/" + post._id}>
            <Post
              title={post.title}
              price={post.price}
              location={post.address}
              rating="0"
              image={baseURL + post.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
