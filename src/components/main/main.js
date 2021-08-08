import React from "react";
import LinksNav from "../navLinks/linksNav";

function Main() {
  return (
    <div className="d-flex justify-content-between flex-column align-items-center pt-5 mt-5">
      <h1>Welcome to Rick and Morty APP</h1>
      <h3>select a group below</h3>
      <LinksNav />
    </div>
  );
}

export default Main;
