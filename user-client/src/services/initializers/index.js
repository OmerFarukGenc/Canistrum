import helpers from "../helpers"
import mutators from "../mutators"
import Cookies from "js-cookie";
import store from "../../store";

const init = async () => {
    const goodsList = await helpers.fetchGoodsList();
    if(goodsList != null){
        await mutators.setGoodsList(goodsList);
    }



    const username = await helpers.fetchUsernameByTokenFromCookies();
    if(username != null){
        await mutators.setUsername(username)
        await mutators.setPath("basket");
    }else{
        await mutators.setUsername(null)
        await mutators.setPath("login")
    }

    const basket = []

    for(var g in goodsList){
        basket.push({id:goodsList[g].id,name:goodsList[g].name,amount:0})
    }
    
    await mutators.setBasket(basket)

}



const initializers = {init}

export default initializers