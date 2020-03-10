import React from "react";
import NewComment from "../Components/NewComment";
import Comments from "../Components/Comments";
import back from "../Images/back-arrow.svg";
import Details from "../Components/Details";
import myAxios, { getAuthorizationHeaders, baseURL } from "../axios";

export default function PostDetailsPage({ match }) {
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
  return (
    <div className="postDetails">
      <div className="back-post-grid">
        <img className="back-arrow" src={back} alt="" />
        <div>
          <img className="post-image" src={baseURL + post.image} alt="" />
          <div className="information">
            <Details title="General Details">
              <div>Ad Id: {post._id}</div>
              <div>Ad Post Date: {post.createdAt}</div>
              <div>Ad Expiry Date: {post.expiresIn}</div>
            </Details>

            <Details title="Seller Details">
              <div>Sold By:{post.user && post.user.name}</div>
              <div>Email:{post.user && post.user.email}</div>
              <div>Phone Number:{post.user && post.user.phoneNumber}</div>
              <div>Location:{post.address}</div>
            </Details>
            <Details title="Pricing Details">
              <div> Price:{post.price}</div>
              <div> Condition:{post.condition}</div>
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
