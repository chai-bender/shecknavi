import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

export default function Home() {
  return (
    <div className="container">
      <div>
        <img
          className="banner"
          src="./images/backdrop/banner.jpeg"
          alt="peaceful art gallery"
        />

        <h1 className="title">ScheckNaví</h1>
      </div>
      <br></br>
      <br></br>
      <Link to="/Exhibits">
        <button>Explore</button>
      </Link>
    </div>
  );
}
