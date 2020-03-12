import React from "react";
import { Link } from "react-router-dom";
import Post from "../Components/Post";
import { baseURL } from "../axios";

const SearchPage = ({ searchResult }) => {
  return (
    <div className="posts" style={{ marginTop: "2.5rem" }}>
      {searchResult.map(post => (
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
  );
};

export default SearchPage;
