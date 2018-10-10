import React, { Component } from "react";
import "./App.css";
import ContactList from "./components/features/contact";
import AppPagination from "./components/pagination/AppPagination";
import Header from "./components/layout/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { Breadcrumb, Alert } from "antd";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={ContactList} />
          <Route exact path="/pagination" component={AppPagination} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
