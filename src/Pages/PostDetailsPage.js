import React from "react";
import NewComment from "../Components/NewComment";
import Comments from "../Components/Comments";
import back from "../Images/back-arrow.svg";
import Details from "../Components/Details";
import myAxios, { getAuthorizationHeaders, baseURL } from "../axios";
import { Link } from "react-router-dom";

export default function PostDetailsPage({ match, history }) {
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);

  const getComments = () => {
    myAxios
      .get("/comment/" + match.params.id, getAuthorizationHeaders())
      .then(({ data }) => {
        setComments(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    myAxios
      .get("/post/" + match.params.id, getAuthorizationHeaders())
      .then(({ data }) => {
        setPost(data);
      })
      .catch(err => {
        console.log(err);
      });
    getComments();
    //eslint-disable-next-line
  }, []);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      myAxios
        .get("/post/delete/" + post._id, getAuthorizationHeaders())
        .then(({ data }) => {
          history.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <div className="postDetails">
      <div className="back-post-grid">
        <Link to="/home">
          <img className="back-arrow" src={back} alt="" />
        </Link>
        <div style={{ position: "relative" }}>
          {post && post.canDelete && (
            <button
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                border: "none",
                background: "red",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={deletePost}
            >
              Delete Post
            </button>
          )}
          <img
            className="post-image"
            style={{ width: "40%", margin: "0 auto", display: "block" }}
            src={baseURL + post.image}
            alt=""
          />
          <div className="information">
            <Details title="General Details">
              <div>Ad Id: {post._id}</div>
              <div>Ad Post Date: {post.createdAt}</div>
              <div>Ad Expiry Date: {post.expiresIn}</div>
            </Details>

            <Details title="Seller Details">
              <div>Sold By: {post.user && post.user.name}</div>
              <div>Email: {post.user && post.user.email}</div>
              <div>Phone Number: {post.user && post.user.phoneNumber}</div>
              <div>Location: {post.address}</div>
            </Details>
            <Details title="Pricing Details">
              <div> Price: Rs. {post.price}</div>
              <div> Condition: {post.condition}</div>
            </Details>
            <Details title="Description">
              <div>{post.description}</div>
            </Details>

            <NewComment id={post._id} getComments={getComments} />
            {comments.map(comment => (
              <Comments
                key={comment._id}
                userName={comment.user ? comment.user.name : ""}
                comment={comment.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
