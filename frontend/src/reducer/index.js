import { combineReducers } from "redux";

import storedUserData from "./storeUserData";
import resetPasswordState from "./resetPasswordState";

const rootReducers = combineReducers({ storedUserData, resetPasswordState });
export default rootReducers;
