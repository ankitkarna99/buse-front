import React from "react";
import myAxios, { getAuthorizationHeaders } from "../axios";
import Button from "../Components/Button";
import makeToast from "../toast";

export default function NewPostPage({ history }) {
  const [categories, setCategories] = React.useState([]);
  const titleRef = React.useRef();
  const addressRef = React.useRef();
  const priceRef = React.useRef();
  const descriptionRef = React.useRef();
  const conditionRef = React.useRef();
  const categoryRef = React.useRef();
  const fileRef = React.useRef();

  React.useEffect(() => {
    myAxios
      .get("/category", getAuthorizationHeaders())
      .then(response => {
        setCategories(
          response.data.filter(category => category.name !== "All")
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const newPost = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("condition", conditionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("file", fileRef.current);

    console.log(formData);

    myAxios
      .post("/post", formData, getAuthorizationHeaders(true))
      .then(({ data }) => {
        makeToast("success", data.message);
        history.push("/home");
      })
      .catch(err => {
        makeToast("error", err.response.data.message);
      });
  };

  return (
    <div style={{ paddingTop: "7rem" }}>
      <h3>Add Post</h3>
      <div style={{ width: "50%" }}>
        <form action="" method="post" onSubmit={newPost}>
          <input
            type="text"
            className="text"
            placeholder="Ad Post Title"
            ref={titleRef}
          />
          <input
            type="text"
            className="text"
            placeholder="Your Address"
            ref={addressRef}
          />
          <input
            type="text"
            className="text"
            placeholder="Price"
            ref={priceRef}
          />
          <textarea
            name=""
            id=""
            rows="5"
            className="text"
            placeholder="Description"
            ref={descriptionRef}
          ></textarea>
          Condition:
          <div style={{ height: "16px" }}></div>
          <select name="condition" className="text" ref={conditionRef}>
            <option value="Brand New">Brand New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
            <option value="Antique">Antique</option>
            <option value="Excellent">Excellent</option>
          </select>
          Category:
          <div style={{ height: "16px" }}></div>
          <select name="condition" className="text" ref={categoryRef}>
            {categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
          Select Image File:
          <div style={{ height: "16px" }}></div>
          <input
            type="file"
            name="myFile"
            onChange={e => {
              fileRef.current = e.currentTarget.files[0];
              console.log(e.currentTarget.files[0]);
            }}
          />
          <div style={{ height: "16px" }}></div>
          <Button fullWidth={true} variant={3}>
            Add Post
          </Button>
          <div style={{ height: "48px" }}></div>
        </form>
      </div>
    </div>
  );
}
