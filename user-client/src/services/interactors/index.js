import helpers from "../helpers";
import store from "../../store";
import mutators from "../mutators";
import Cookies from "js-cookie";
import actions from "../../store/actions";


const userClickedExitButton = async () => {
    Cookies.remove("token")
    await mutators.setPath("login")
    await mutators.setLoginPageMessage("EXITED")
    await mutators.setUsername(null)

}

const userClickedLoginButton = async () => {
    const username = store.getState().loginFormUsername;
    const password = store.getState().loginFormPassword;
    console.log(username + "###" + password);
    const token = await helpers.fetchTokenByCredentials(username,password);
    if(token == null){
        await mutators.setLoginPageMessage("LOGIN ERROR")
        return null;
    }else {
        Cookies.set("token",token);
        await mutators.setUsername(username)
        await mutators.setPath("basket")
        return true;
    }
}

const userChangedLoginFormUsername = async (loginFormUsername = "") => {
    await mutators.setLoginFormUsername(loginFormUsername)
}

const userChangedLoginFormPassword = async (loginFormPassword = "") => {
    await mutators.setLoginFormPassword(loginFormPassword)
}

const userIncreasedAmountByGoodId = async (id = "") => {
    await mutators.increaseBasketGoodAmountById(id)
}

const userDecreasedAmountByGoodId = async (id = "") => {
    await mutators.decreaseBasketGoodAmountById(id);
}

const userClickedCalculateInflationOnBasketPage = async () => {
    const basket = store.getState().basket;
    const result = await helpers.fetchInflationByBasket(basket);
    await mutators.setInflation("%"+result);
}


const interactors = {
    userClickedLoginButton,userChangedLoginFormPassword,userChangedLoginFormUsername,userClickedExitButton,userIncreasedAmountByGoodId,userDecreasedAmountByGoodId,userClickedCalculateInflationOnBasketPage
}


export default interactors;