import LoginScreen from "./LoginScreen";
import LoggedScreen from "./LoggedScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";

const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
            <Router>
              <Routes>
                <Route path="/login" element={<LoginScreen />} />

                <Route path="/profile" element={<LoggedScreen />} />
              </Routes>
            </Router>
    )
  }
}

export default App;
