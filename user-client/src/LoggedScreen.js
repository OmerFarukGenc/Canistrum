import React from "react";
import Cookies from "js-cookie";
import { Alert, Button } from "react-bootstrap";

const axios = require("axios");



class LoggedScreen extends React.Component {
  constructor(props) {

    super(props);
    //this.setState({username:""});
    this.state = { username: "" }
    //this.getUsername();
    //this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.getUsername();
  }

  async getUsername() {
    console.log(Cookies.get("token"));
    try{
    const res = await axios.get("http://localhost:8000/api/profile/whoami", { withCredentials: true });
    if (res.status = 200) {
      this.setState({ username: res.data.username });
      return;
      //return <span>res.data.username</span>;
    } }catch(err) {
      console.log(err);
      window.location="/login";
    }
  }

  handleExit = () => {
    console.log("exit");
    Cookies.remove("token");
    window.location = "/login";
  }

  render() {
    return (<div><p>welcome {this.state.username}</p>
      <Button onClick={() => this.handleExit()}>exit</Button>

    </div>);
  }
}

export default LoggedScreen;