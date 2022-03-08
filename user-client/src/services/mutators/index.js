import actions from "../../store/actions";
import  store  from "../../store";

const setPath = async (path = "") => {
    store.dispatch(actions.setPath(path))
}

const setUsername = async (username = "") => {
    store.dispatch(actions.setUsername(username));
}

const setGoodsList = async (goodsList = []) => {
    store.dispatch(actions.setGoodsList(goodsList));
}

const setBasket = async (basket = []) => {
    store.dispatch(actions.setBasket(basket));
}

const setBasketGoodAmountById = async (id = "",amount = 0) => {
    const newBasket = store.getState().basket;
    for(var g in newBasket){
        if(newBasket[g].id == id){
            newBasket[g].amount = amount;
        }
    }
    store.dispatch(actions.setBasket(newBasket));
}

const increaseBasketGoodAmountById = async (id = "") => {
    const newBasket = store.getState().basket;
    for(var g in newBasket){
        if(newBasket[g].id == id){
            newBasket[g].amount = newBasket[g].amount + 1;
        }
    }
    store.dispatch(actions.setBasket(newBasket));
}

const decreaseBasketGoodAmountById = async (id = "") => {
    const newBasket = store.getState().basket;
    for(var g in newBasket){
        if(newBasket[g].id == id && newBasket[g].amount > 0){
            newBasket[g].amount = newBasket[g].amount - 1;
        }
    }
    store.dispatch(actions.setBasket(newBasket));
}

const setLoginFormUsername = async (loginFormUsername = "") => {
    store.dispatch(actions.setLoginFormUsername(loginFormUsername))
    console.log("TTT"+store.getState().loginFormUsername)
}

const setLoginFormPassword = async (loginFormPassword = "") => {
    store.dispatch(actions.setLoginFormPassword(loginFormPassword))
}

const setLoginPageMessage = async (loginPageMessage = "") => {
    store.dispatch(actions.setLoginPageMessage(loginPageMessage))
}

const setInflation = async (inflation = "") => {
    store.dispatch(actions.setInflation(inflation))
}

const mutators = {
    setPath,setUsername,setBasket,setBasketGoodAmountById,setGoodsList,increaseBasketGoodAmountById,decreaseBasketGoodAmountById,setBasketGoodAmountById,setLoginFormUsername,setLoginFormPassword,setLoginPageMessage,setInflation
}


export default mutators;