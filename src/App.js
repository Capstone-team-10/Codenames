import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>{/* Add other routes here */}</Switch>
    </Router>
  );
}

export default App;
