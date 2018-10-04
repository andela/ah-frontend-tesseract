import { combineReducers } from 'redux';
import signUpReducer from "./signupReducer";
import {loginReducer} from "./authentication";

export default combineReducers({
    create_user:signUpReducer,
    authentication: loginReducer
});
