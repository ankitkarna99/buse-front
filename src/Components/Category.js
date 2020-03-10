import React from "react";

export default function Category(props) {
  return (
    <div
      className={`category ${props.active ? "active" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <img src={props.picture} alt="" />
      <span className="category-name">{props.category}</span>
    </div>
  );
}
