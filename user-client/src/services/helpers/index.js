import axios from "axios";

const fetchGoodsList = async () => {

    try {
        const res = await axios.get("http://localhost:8000/api/crud/good")
        var goodsList = [];

        for (var g in res.data) {
            goodsList.push({ id: res.data[g]._id, name: res.data[g].name })
        }
        return goodsList
    } catch (err) {
        console.log(err)
        return null;
    }

}

const fetchUsernameByTokenFromCookies = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/profile/whoami", { withCredentials: true });
        const username = res.data.username;
        return username;
    } catch (err) {
        console.log(err);
        return null;
    }

}

const fetchTokenByCredentials = async (username = "", password = "") => {
    try {
        const res = await axios.post("http://localhost:8000/api/security/login", { username: username, password: password });
        //console.log(JSON.stringify(res.data));
        if (res.status == 200) {
            const token = res.data.token;
            return token;
            //window.location = "/profile";
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

const fetchInflationByBasket = async (basket = []) => {

    try {
        const res = await axios.post("http://localhost:8000/api/calculation", basket)
        return res.data.inflation;
    } catch (err) {
        console.log(err)
        return null;
    }
}

/*
Cookies.set("token", token);
        console.log(Cookies.get("token"));
*/


const helpers = {
    fetchGoodsList, fetchTokenByCredentials, fetchUsernameByTokenFromCookies, fetchInflationByBasket
}


export default helpers;