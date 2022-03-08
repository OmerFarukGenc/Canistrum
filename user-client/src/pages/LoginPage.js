import React from "react";
import Cookies from "js-cookie";
import { Form,Button,Container } from "react-bootstrap";
import store from "../store";
import interactors from "../services/interactors";

const axios = require("axios").default;



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    //this.setState({ errorMessage: " " });
    this.state = { loginPageMessage: "" }
  }

  componentDidMount() {
    this.bindLoginPageMessage();
  }

  
  async bindLoginPageMessage() {
    const loginPageMessage = store.getState().loginPageMessage;
    this.setState({loginPageMessage:loginPageMessage})
    store.subscribe(() => {
      const LoginPageMessage = store.getState().loginPageMessage;
      this.setState({loginPageMessage:LoginPageMessage})
    })
    
  }

  async handleUsernameChange(e) {
    e.preventDefault();
    const formUsername = e.target.value;
    console.log("EVENT" + formUsername)
    await interactors.userChangedLoginFormUsername(formUsername)
  }

  async handlePasswordChange(e) {
    e.preventDefault();
    const formPassword = e.target.value;
    await interactors.userChangedLoginFormPassword(formPassword)
  }

  async handleSubmit() {
    await interactors.userClickedLoginButton();
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
        <Form.Label className="mt-1">{this.state.loginPageMessage}</Form.Label>
      </Form.Group>
      </Form>
    );
  }
}

export default LoginPage;
