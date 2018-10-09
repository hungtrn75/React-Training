import React, { Component } from "react";
import "./App.css";
import ContactList from "./components/features/contact";
import Header from "./components/layout/Header";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={ContactList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
