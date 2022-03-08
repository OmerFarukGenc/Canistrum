import axios from "axios";
import { store } from "../store";

import Cookies from "js-cookie";

import helpers from "./helpers";
import interactors from "./interactors";
import mutators from "./mutators";
import initializers from "./initializers";

const services = {helpers,interactors,mutators,initializers}


export default services;