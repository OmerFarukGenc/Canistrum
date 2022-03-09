import LoginPage from "./pages/LoginPage";
import BasketPage from "./pages/BasketPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import store  from "./store/index";


const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { path: "", component: <>xyz</> };

    this.init();
  }


  async init() {





    /*try {
      const res = await axios.get("http://localhost:8000/api/profile/whoami", { withCredentials: true });
      if (res.status = 200) {
        //this.setState({ username: res.data.username });
        window.location = "/profile";
        return;
        //return <span>res.data.username</span>;
      }
    } catch (err) {
      console.log(err);
      window.location = "/login";
    }*/

  }

  componentDidMount() {
    
    var currentPath = store.getState().path;
    this.state = { path: currentPath }
    if (this.state.path == "basket") {
      this.setState({ component: <BasketPage /> });
    } else if (this.state.path == "login") {
      this.setState({ component: <LoginPage /> });
    }


    store.subscribe(() => {
      console.log(store.getState());
      console.log(store.getState().path)
      var ppp = store.getState().path;

      this.state = { path: ppp }
      console.log(this.state.path);
      if (this.state.path == "basket") {
        this.setState({ component: <BasketPage /> });
      } else if (this.state.path == "login") {
        this.setState({ component: <LoginPage /> });
      }

    })


  }

  render() {
    return (<div>{this.state.component}</div>);
  }
}

export default App;
