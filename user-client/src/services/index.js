import axios from "axios";
import { store } from "../stores";

import Cookies from "js-cookie";


const getGoodsList = async () => {

    const res = await axios.get("http://localhost:8000/api/crud/good")
    var goodsList = [];

    for (var g in res.data) {
        goodsList.push({ id: res.data[g]._id, name: res.data[g].name })
    }
    return goodsList



}

const isLoggedIn = async () => {
    const res = await axios.get("http://localhost:8000/api/profile/whoami",{withCredentials:true});
    if(res.status == 200){
        return true;
    }else {
        return false;
    }

}

const login = async (username, password) => {

    const res = await axios.post("http://localhost:8000/api/security/login", { username: username, password: password }).then(r => r);
    if (res.status == 200) {
        const token = res.data.token;
        Cookies.set("token", token);
        console.log(Cookies.get("token"));
        store.dispatch({ type: "username", username: username });
        store.dispatch({ type: "redirect", path: "profile" });
    } else {
        store.dispatch({ type: "redirect", path: "login" });
    }


}

const exit = () => {
    console.log("exit");
    Cookies.remove("token");
    //window.location = "/login";
    store.dispatch({ type: "username", username: null });
    store.dispatch({ type: "redirect", path: "login" });
}



export { getGoodsList, login, exit,isLoggedIn }