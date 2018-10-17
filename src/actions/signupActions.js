/* eslint-disable no-return-await,no-unused-vars,import/prefer-default-export */
import axios from 'axios';
import { SIGN_UP_URL } from '../components/globals';
import { CREATE_NORMAL_USER, IS_LOADING, SIGNUP_ERROR } from './types';


export const createUser = postData => async (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return await (
    axios.post(SIGN_UP_URL, postData)
      .then((response) => {
        dispatch({ type: CREATE_NORMAL_USER, payload: response.data });
        dispatch({ type: IS_LOADING, payload: false });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_ERROR, payload: 'Failed to process request. Try again later' });
      })
  );
};
