import {createStore} from "redux";

function nameReducer(state = {name:""}, action){
    return {name:action.name};
}


const nameStore = createStore(nameReducer);

function pathReducer(state = {path: "profile"},action){
    return {path:action.path};
}

const pathStore = createStore(pathReducer,{path:"profile"});

export {nameStore, nameReducer,pathReducer,pathStore};
