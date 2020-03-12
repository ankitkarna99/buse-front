import React from "react";
import Details from "../Components/Details";
import Button from "../Components/Button";
import myAxios, { getAuthorizationHeaders } from "../axios";
import { withRouter } from "react-router-dom";
import makeToast from "../toast";

const AddProfilePicturePage = ({ setProfilePicture, history }) => {
  const fileRef = React.createRef();
  const updateProfilePicture = () => {
    const data = new FormData();
    data.append("file", fileRef.current.files[0]);
    myAxios
      .post("/user/updateProfilePicture", data, getAuthorizationHeaders())
      .then(({ data }) => {
        makeToast("success", data.message);
        setProfilePicture(data.url);
        history.push("/home/profile");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="postDetails" style={{ marginTop: "-2rem" }}>
      <Details title="Edit Profile Picture">
        <input type="file" name="myFile" ref={fileRef} />
        <br></br>
        <br></br>
        <Button onClick={updateProfilePicture}>Update Profile Picture</Button>
      </Details>
    </div>
  );
};

export default withRouter(AddProfilePicturePage);
