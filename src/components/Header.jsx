import React from "react";
import "./HeaderStyle.css";


export default function Header(props) {
  return (
    <>
    <div className="header">
      <img class="logo" src="../logocheck.png" alt="logo" />
      <h1>{props.title}</h1>
      </div>
       <div class="header-text">
       <h4>{props.subtitle}</h4>
    </div>
    </>
  );
}