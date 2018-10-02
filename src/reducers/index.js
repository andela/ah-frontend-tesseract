import { combineReducers } from 'redux';
import {loginReducer } from "./authentication";

export default combineReducers({
    authentication: loginReducer
});
