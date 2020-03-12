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
import AddProfilePicturePage from "./AddProfilePicturePage";

export default function HomeRouter({ history }) {
  const [searchResult, setSearchResult] = React.useState([]);
  const [profilePicture, setProfilePicture] = React.useState("");

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

  const getProfilePicture = () => {
    myAxios
      .get("/user/aboutMe", getAuthorizationHeaders())
      .then(({ data }) => {
        setProfilePicture(data.image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getProfilePicture();
  }, []);

  return (
    <div className="sections">
      <div id="left-section">
        <Header search={search} profilePicture={profilePicture}></Header>
        <Switch>
          <Route path="/home" component={HomePage} exact />
          <Route path="/home/profile" component={ProfilePage} exact />
          <Route path="/home/post/:id" component={PostDetailsPage} exact />
          <Route path="/home/new" component={NewPostPage} exact />
          <Route
            path="/home/addProfilePicture"
            render={() => (
              <AddProfilePicturePage setProfilePicture={setProfilePicture} />
            )}
            exact
          />
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
      <Notification profilePicture={profilePicture} />
    </div>
  );
}
