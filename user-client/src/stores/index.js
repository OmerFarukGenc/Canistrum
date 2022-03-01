import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import { getGoodsList } from "../services";
import thunkMiddleware from "redux-thunk"


const defaultState = {
    path: "profile",
    username: null,
    gotGoodsList: false,
    goodsList: [],
    basket: []
}

function reducer(state = defaultState, action) {

    if (action.type == "redirect") {
        state.path = action.path
        return state
    } else if (action.type == "username") {
        state.username = action.username
        return state
    } else if (action.type == "setGoodsList") {
        state.gotGoodsList = true
        state.goodsList = action.goodsList;
        return state
    } else if (action.type == "setEmptyBasket") {
        state.basket = [];
        console.log("IN SETEMPTYBASKET: " + JSON.stringify(state));
        for (var i = 0; i < state.goodsList.length; i++) {
            const good = state.goodsList[i];
            state.basket.push({ id: good.id, name: good.name, amount: 0 });

        }

        return state;

    } else if (action.type == "increment") {
        for (var i = 0; i < state.basket.length; i++) {
            if (state.basket[i].id == action.id)
                state.basket[i].amount++;
        }
        return state;
    } else if (action.type == "decrement") {
        for (var i = 0; i < state.basket.length; i++) {
            if (state.basket[i].id == action.id && state.basket[i].amount > 0)
                state.basket[i].amount--;
        }
        return state;
    }




    return state;
}

async function fetchGoodsList(dispatch, getState) {
    const goodsList = await getGoodsList()
    console.log("LIST: " + goodsList)
    console.log("BEFORE: " + JSON.stringify(getState()))
    dispatch({ type: "setGoodsList", goodsList: goodsList })
    dispatch({ type: "setEmptyBasket" })
    console.log("AFTER: " + JSON.stringify(getState()))
    return
}

const store = createStore(reducer, defaultState, applyMiddleware(thunkMiddleware));


export { store, fetchGoodsList };
