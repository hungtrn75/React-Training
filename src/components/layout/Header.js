import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="header">
      <ul className="nav">
        <Link to="/">Infinite Scroll</Link>
      </ul>
    </nav>
  );
};
