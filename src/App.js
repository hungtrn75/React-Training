import React, { Component } from "react";
import "./App.css";
import ContactList from "./components/features/contact";
import AppPagination from "./components/pagination/AppPagination";
import Header from "./components/layout/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ImageUpload from "./components/upload/ImageUpload";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={ContactList} />
            <Route exact path="/pagination" component={AppPagination} />
            <Route exact path="/upload" component={ImageUpload} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
