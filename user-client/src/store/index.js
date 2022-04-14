import { createStore, applyMiddleware } from "redux";
import actions from "./actions";

const defaultState = {
    path: "basket",
    username: null,
    goodsList: [],
    basket: [],
    loginFormUsername: "",
    loginFormPassword: "",
    loginPageMessage: "",
    inflation:""
}

function reducer(state = defaultState, action) {

    if (action.type == "setPath") {
        state.path = action.path
        return state
    } else if (action.type == "setUsername") {
        state.username = action.username
        return state
    } else if (action.type == "setGoodsList") {
        state.goodsList = action.goodsList;
        return state
    } else if (action.type == "setBasket") {
        state.basket = action.basket;
        return state;
    } else if (action.type == "setInflation"){
        state.inflation = action.inflation;
        return state;
    } else if(action.type == "setLoginFormUsername"){
        state.loginFormUsername = action.loginFormUsername
        return state
    } else if(action.type == "setLoginFormPassword"){
        state.loginFormPassword = action.loginFormPassword
        return state
    } else if(action.type == "setLoginPageMessage"){
        state.loginPageMessage = action.loginPageMessage;
    }
    return state;
}


const store = createStore(reducer, defaultState);


export default store;
