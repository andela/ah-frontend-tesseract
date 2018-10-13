/* eslint-disable no-return-await,no-shadow,camelcase */
import { axiosInstance } from '../globals';

import {
  LOGIN,
  INVALID_CREDENTIALS,
  FETCHING,
  LOGOUT,
  SOCIAL_LOGIN,
  LOGIN_FAILURE,
} from './types';

// actions

const Login = payload => ({
  type: LOGIN,
  payload,
});

const socialLogin = payload => ({
  type: SOCIAL_LOGIN,
  payload,
});

const InvalidCredentialsError = payload => ({
  type: INVALID_CREDENTIALS,
  payload,
});

export const FetchAction = payload => ({
  type: FETCHING,
  payload,
});

const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload,
});

const Logout = () => ({
  type: LOGOUT,
});
// action creators

export const handleLoginResponse = user_data => async (dispatch) => {
  dispatch(FetchAction(true));
  return await axiosInstance
    .post('/users/login/', user_data)
    .then((response) => {
      dispatch(Login(response.data));
      dispatch(FetchAction(false));
      localStorage.setItem("currentUser",response.data.username);
      localStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      dispatch(InvalidCredentialsError(error.response.data));
      dispatch(FetchAction(false));
    });
};

export const handleSocialResponse = (
  socialResponse,
  provider,
) => async (dispatch) => {
  dispatch(FetchAction(true));
  const data = { provider, access_token: socialResponse.accessToken };

  return await axiosInstance
    .post('/social/', data)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("currentUser",response.data.username);
      dispatch(socialLogin(response.data));
      dispatch(FetchAction(false));
    })
    .catch((error) => {
      try {
        // dispatch the errors from the authors haven api
        dispatch(loginFailure(error.response.data));
        dispatch(FetchAction(false));
      } catch (error) {
        // This error could be network error since it does not have response.
        console.log('Check your internet connection');
      }
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(Logout());
  localStorage.removeItem('token');
};
