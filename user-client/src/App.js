import LoginPage from "./pages/LoginPage";
import BasketPage from "./pages/BasketPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import store from "./store/index";


const axios = require("axios");

function App(props) {
  var currentPath = store.getState().path;
  var currentComponent = null;
  if (currentPath == "basket") {
    currentComponent = <BasketPage />
  } else if (currentPath == "login") {
    currentComponent = <LoginPage />
  }

  const [path, setPath] = useState(currentPath);
  const [component, setComponent] = useState(currentComponent);

  store.subscribe(() => {
    console.log("####App store subscribe####");
    console.log(store.getState());
    var ppp = store.getState().path;

    setPath(ppp);

    if (ppp == "basket") {
      setComponent(<BasketPage />);
    } else if (ppp == "login") {
      setComponent(<LoginPage />);
    }

  })


  return (<div>{component}</div>);

}

export default App;
