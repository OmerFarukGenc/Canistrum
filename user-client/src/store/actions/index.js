const setPath = (path = "path") => {
    return {type:"setPath",path:path}
}

const setUsername = (username = "username") => {
    return {type:"setUsername",username:username}
}

const setGoodsList = (goodsList = []) => {
    return {type:"setGoodsList",goodsList:goodsList}
}

const setBasket = (basket = []) => {
    return {type:"setBasket",basket:basket}
}


const setLoginFormUsername = (loginFormUsername = "") => {
    return {type:"setLoginFormUsername",loginFormUsername:loginFormUsername}
}

const setLoginFormPassword = (loginFormPassword = "") => {
    return {type:"setLoginFormPassword",loginFormPassword:loginFormPassword}
}

const setLoginPageMessage = (loginPageMessage = "") => {
    return {type:"setLoginPageMessage",loginPageMessage:loginPageMessage}
}

const setInflation = (inflation = "") => {
    return {type:"setInflation",inflation:inflation}
}


const actions = {setPath,setUsername,setGoodsList,setBasket,setLoginFormUsername,setLoginFormPassword,setLoginPageMessage,setInflation}


export default actions;