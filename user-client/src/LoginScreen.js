import { useCookies } from "react-cookie";

const axios = require("axios").default;



function LoginScreen() {
  return (
    <form>
      <label>username</label>
      <input id="username" name="username" type="text" />
      <label>password</label>
      <input id="password" name="password" type="password" />
      <button type="button" >submit</button>

    </form>
  );
}

export default LoginScreen;
