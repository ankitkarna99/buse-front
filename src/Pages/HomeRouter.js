import React from "react";
import Header from "../Components/Header";
import { Switch, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import Notification from "../Components/Notification";
import plus from "../Images/plus.svg";
import PostDetailsPage from "./PostDetailsPage";
import NewPostPage from "./NewPostPage";
import myAxios, { getAuthorizationHeaders } from "../axios";
import SearchPage from "./SearchPage";

export default function HomeRouter({ history }) {
  const [searchResult, setSearchResult] = React.useState([]);

  const search = query => {
    myAxios
      .get("/search/" + query, getAuthorizationHeaders())
      .then(({ data }) => {
        history.push("/home/search");
        setSearchResult(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="sections">
      <div id="left-section">
        <Header search={search}></Header>
        <Switch>
          <Route path="/home" component={HomePage} exact />
          <Route path="/home/profile" component={ProfilePage} exact />
          <Route path="/home/post/:id" component={PostDetailsPage} exact />
          <Route path="/home/new" component={NewPostPage} exact />
          <Route
            path="/home/search"
            render={() => <SearchPage searchResult={searchResult} />}
            exact
          />
        </Switch>

        <Link to="/home/new">
          <div className="add-new-post">
            <img src={plus} alt="" />
          </div>
        </Link>
      </div>
      <Notification />
    </div>
  );
}
