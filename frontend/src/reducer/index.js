import { combineReducers } from "redux";

import storedUserData from "./storeUserData";
import resetPasswordState from "./resetPasswordState";
import dataFetching from "./dataFetching";

const rootReducers = combineReducers({
  storedUserData,
  resetPasswordState,
  dataFetching,
});
export default rootReducers;
