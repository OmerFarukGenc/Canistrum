import React from "react";
import Cookies from "js-cookie";

const axios = require("axios").default;



class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setState({errorMessage:" "});
  }



  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  async handleSubmit() {
    const res = await axios.post("http://localhost:8000/api/security/login", { username: this.state.username, password: this.state.password });
    //console.log(JSON.stringify(res.data));
    if(res.status == 200){
      const token = res.data.token;
      Cookies.set("token",token);
      console.log(Cookies.get("token"));
    }else {
      this.setState({errorMessage:"username or password is wrong"});
    }
    //console.log("" + this.state.username + " " + this.state.password);

  }

  render() {
    return (
      <form>
        <label>username</label>
        <input id="username" name="username" type="text" onChange={(e) => this.handleUsernameChange(e)} />
        <label>password</label>
        <input id="password" name="password" type="password" onChange={(e) => this.handlePasswordChange(e)} />
        <button type="button" onClick={() => this.handleSubmit()} >submit</button>

      </form>
    );
  }
}

export default LoginScreen;
