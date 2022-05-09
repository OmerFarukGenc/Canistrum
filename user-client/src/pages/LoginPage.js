import React, {useState} from "react";
import Cookies from "js-cookie";
import { Form,Button,Container } from "react-bootstrap";
import store from "../store";
import interactors from "../services/interactors";

const axios = require("axios").default;

function LoginPage(props){
  var currentLoginPageMessage = store.getState().loginPageMessage;
  const [loginPageMessage,setLoginPageMessage] = useState(currentLoginPageMessage);

  store.subscribe(() => {
    console.log("####LoginPage store subscribe####");
    const tempLoginPageMessage = store.getState().loginPageMessage;
    setLoginPageMessage(tempLoginPageMessage)
  })

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    const formUsername = e.target.value;
    await interactors.userChangedLoginFormUsername(formUsername)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formPassword = e.target.value;
    await interactors.userChangedLoginFormPassword(formPassword)
  }

  const handleSubmit = async (e) => {
    await interactors.userClickedLoginButton();
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Username
        </Form.Label>
        <Form.Control type="text" name="username" onChange={(e) => handleUsernameChange(e)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control type="password" name="password" onChange={(e) => handlePasswordChange(e)} />
      </Form.Group>
      <Button className="mt-1" variant="primary" type="button" onClick={() => handleSubmit()}>
        Login
      </Button>
     <Form.Group> 
      <Form.Label className="mt-1">{loginPageMessage}</Form.Label>
    </Form.Group>
    </Form>
  );
}

/*
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
}*/

export default LoginPage;
