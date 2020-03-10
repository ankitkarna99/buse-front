import React from "react";
import Category from "../Components/Category";
import Post from "../Components/Post";
import all from "../Images/all.svg";
import myAxios, { baseURL, getAuthorizationHeaders } from "../axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [categories, setCategories] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const getPostsByCategory = categoryId => {
    myAxios
      .get("/post/category/" + categoryId, getAuthorizationHeaders())
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getPosts = () => {
    myAxios
      .get("/post", getAuthorizationHeaders())
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    myAxios
      .get("/category", getAuthorizationHeaders())
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    getPosts();
  }, []);

  return (
    <div className="homePage">
      <div className="categories">
        <h2>Categories</h2>
        <span
          onClick={() => {
            setActiveCategory("All");
            getPosts();
          }}
        >
          <Category
            picture={all}
            category="All"
            active={activeCategory === "All"}
          />
        </span>

        {categories.map(category => (
          <span
            onClick={() => {
              setActiveCategory(category.name);
              getPostsByCategory(category._id);
            }}
          >
            <Category
              key={category._id}
              picture={baseURL + category.image}
              category={category.name}
              active={activeCategory === category.name}
            />
          </span>
        ))}
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
