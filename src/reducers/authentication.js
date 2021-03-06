/* eslint-disable no-shadow,camelcase,no-use-before-define,import/prefer-default-export */
import {
  LOGIN,
  SOCIAL_LOGIN,
  LOGIN_FAILURE,
  INVALID_CREDENTIALS,
  FETCHING,
  LOGOUT,
  USER_FROM_TOKEN,
  USER_FROM_TOKEN_SUCCESS,
  USER_FROM_TOKEN_FAILURE,
} from '../actions/types';

const initialState = {
  userDetails: {},
  isLoggedIn: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return setState(state, action.payload, undefined, true, undefined);

    case INVALID_CREDENTIALS:
      return setState(state, state.userDetails, action.payload, state.isLoggedIn, undefined);

    case FETCHING:
      return setState(state, state.userDetails, state.login_error,
        state.isLoggedIn, action.payload);

    case LOGOUT:
      return setState(state, {}, undefined, false, undefined);

    case SOCIAL_LOGIN:
      return { ...state, userDetails: action.payload, isLoggedIn: true };

    case LOGIN_FAILURE:
      return { ...state, userDetails: action.payload, isLoggedIn: false };

    case USER_FROM_TOKEN:
      return { ...state, isLoggedIn: false, isFetchingUserFromToken: true };

    case USER_FROM_TOKEN_SUCCESS:
      return {
        ...state, userDetails: action.payload, isLoggedIn: true, isFetchingUserFromToken: false,
      };

    case USER_FROM_TOKEN_FAILURE:
      return { ...state, isLoggedIn: false, isFetchingUserFromToken: false };

    default:
      return { ...state };
  }
};

const setState = (
  initialState,
  userDetails,
  login_error,
  isLoggedIn,
  isFetching,
) => ({
  ...initialState,
  userDetails,
  login_error,
  isLoggedIn,
  isFetching,
});
