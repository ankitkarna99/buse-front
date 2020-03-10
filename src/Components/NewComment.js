import React from "react";
import myAxios, { getAuthorizationHeaders } from "../axios";
import makeToast from "../toast";

export default function NewComment({ id, getComments }) {
  const commentRef = React.createRef();

  const comment = () => {
    const formData = new FormData();
    formData.append("text", commentRef.current.value);
    myAxios
      .post("/comment/" + id, formData, getAuthorizationHeaders())
      .then(({ data }) => {
        makeToast("success", data.message);
        getComments();
        commentRef.current.value = "";
      })
      .catch(err => {
        makeToast("error", err.response.data.message);
      });
  };

  return (
    <div>
      <div className="newComment">
        <h4>Comment :</h4>
        <textarea
          className="large normal"
          type="text"
          placeholder="Write a comment"
          ref={commentRef}
        />
        <br />
        <div style={{ textAlign: "right" }}>
          <button onClick={comment}>Post</button>
        </div>
      </div>
    </div>
  );
}
