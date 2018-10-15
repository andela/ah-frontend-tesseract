import {CREATE_NORMAL_USER,FETCHING, SIGNUP_ERROR} from "../actions/types";

const initialState = {
    user: {},
    isFetching: false,
};

const signUpReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CREATE_NORMAL_USER:

            return {
                ...state,
                user: action.payload,
            };

        case FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                creation_error: action.payload,
            };

        default:
            return state;
    }
};

export default signUpReducer;
