import React from "react";
import Cookies from "js-cookie";
import { Form,Button,Container } from "react-bootstrap";
import { pathStore } from "./stores";

const axios = require("axios").default;



class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    //this.setState({ errorMessage: " " });
    this.state = { errorMessage: "" }
  }

  componentDidMount() {
    //this.state = {errorMessage:""};
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
    try {
      const res = await axios.post("http://localhost:8000/api/security/login", { username: this.state.username, password: this.state.password });
      //console.log(JSON.stringify(res.data));
      if (res.status == 200) {
        const token = res.data.token;
        Cookies.set("token", token);
        console.log(Cookies.get("token"));
        //window.location = "/profile";
        pathStore.dispatch({type:"",path:"profile"});
      }
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: "username or password is wrong" });
    }
    //console.log("" + this.state.username + " " + this.state.password);

  }

  render() {
    /*<form>
        <label>username</label>
        <input id="username" name="username" type="text" onChange={(e) => this.handleUsernameChange(e)} />
        <label>password</label>
        <input id="password" name="password" type="password" onChange={(e) => this.handlePasswordChange(e)} />
        <button type="button" onClick={() => this.handleSubmit()} >submit</button>
        <label>{this.state.errorMessage}</label>
      </form>*/
    return (
      <Form>
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" name="username" onChange={(e) => this.handleUsernameChange(e)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type="password" name="password" onChange={(e) => this.handlePasswordChange(e)} />
        </Form.Group>
        <Button className="mt-1" variant="primary" type="button" onClick={() => this.handleSubmit()}>
          Login
        </Button>
       <Form.Group> 
        <Form.Label className="mt-1">{this.state.errorMessage}</Form.Label>
      </Form.Group>
      </Form>
    );
  }
}

export default LoginScreen;
