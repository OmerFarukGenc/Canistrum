import LoginScreen from "./LoginScreen";
import LoggedScreen from "./LoggedScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import { pathStore } from "./stores/index";


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

    //pathStore.dispatch({ type: "", path: "profile" });
    pathStore.subscribe(() => {

      console.log(pathStore.getState().path)
      var ppp = pathStore.getState().path;
      console.log(ppp);
      //this.setState({ path: pathStore.getState().path})
      //this.setState({path: ppp});
      this.state = {path: ppp}
      console.log(this.state.path);
      if (this.state.path == "profile") {
        this.setState({ component: <LoggedScreen /> });
      } else if (this.state.path == "login") {
        this.setState({ component: <LoginScreen /> });
      }

    })
    pathStore.dispatch({ type: "", path: "profile" });
  }

  render() {
    /*return (
            <Router>
              <Routes>
                <Route path="/login" element={<LoginScreen />} />

                <Route path="/profile" element={<LoggedScreen />} />
                <Route path="/redux" element={<ReduxTest />} />
              </Routes>
            </Router>


    )*/
    return (<div>{this.state.component}</div>);
  }
}

export default App;
