import React from "react";
import menu from "../Images/menu.svg";
import logo from "../Images/logo.svg";
import search from "../Images/magnifying-glass.svg";
import { Link } from "react-router-dom";

export default function Header({ search: searchFn, history }) {
  const searchRef = React.createRef();

  const doSearch = e => {
    e.preventDefault(); //disable form submit from refreshing page
    //Call Search API
    searchFn(searchRef.current.value);
  };

  return (
    <header>
      <div>
        <Link to="/home">
          <img id="menu" src={menu} alt="" />
        </Link>
      </div>
      <div>
        <Link to="/home">
          <img id="logo" src={logo} alt="" />
        </Link>
      </div>
      <div id="search-box">
        <form action="" onSubmit={doSearch}>
          <input className="large" type="text" ref={searchRef} />
        </form>
        <img src={search} alt="" />
      </div>
    </header>
  );
}
