import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Infinite Scroll</Link>
        <Link to="/pagination">Pagination</Link>
      </div>
    </div>
  );
};
