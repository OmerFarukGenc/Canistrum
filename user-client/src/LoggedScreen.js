import React from "react";
import Cookies from "js-cookie";

const axios = require("axios");

class LoggedScreen extends React.Component {
  constructor(props){
    super(props);
    this.setState({username:""});
  }

  getUsername = async () => {
    const res = await axios.get("http://localhost:8000/api/profile/whoami");
    if(res.status = 200){
      this.setState({username:res.data.username});
    }

  }

  render(){
    return <p>welcome {this.state.username}</p>
  }
}

export default LoggedScreen;