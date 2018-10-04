import {LOGIN, INVALID_CREDENTIALS, FETCHING, LOGOUT} from "../actions/types";


const initialState = {
    userDetails: {},
    isLoggedIn: false
};

export const loginReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOGIN:
            return setState(state, action.payload, undefined, true, undefined);
        case INVALID_CREDENTIALS:
            return setState(state, state.userDetails, action.payload, state.isLoggedIn, undefined);
        case FETCHING:
            return setState(state, state.userDetails, state.login_error, state.isLoggedIn, action.payload);
        case LOGOUT:
            return setState(state, {}, undefined, false, undefined);
        default:
                return {...state};
    }
};

const setState = (initialState, userDetails, login_error, isLoggedIn, isFetching) => {
    return {
        ...initialState,
        userDetails: userDetails,
        login_error: login_error,
        isLoggedIn: isLoggedIn,
        isFetching: isFetching
    }
};