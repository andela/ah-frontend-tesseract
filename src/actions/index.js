/* eslint-disable camelcase,no-return-await,no-shadow */
import { axiosInstance } from '../globals';
import {
  REQUEST_PASSWORD_RESET, CONFIRM_PASSWORD_RESET, PROCESSING, FAILED,
} from './types';

export * from "./authentication";
export * from "./articles"
export const requestReset = payload => ({
  type: REQUEST_PASSWORD_RESET,
  payload,
});


export const confirmReset = payload => ({
  type: CONFIRM_PASSWORD_RESET,
  payload,
});

export const processingAction = payload => ({
  type: PROCESSING,
  payload,
});

export const failedAction = payload => ({
  type: FAILED,
  payload,
});

const CatchError = (dispatch, error) => {
    try{
         dispatch(failedAction(error.response.data));
    }catch (e) {
        
    }
    dispatch(processingAction(false));
};

export const handleRequestReset = user_email => async (dispatch) => {
  dispatch(processingAction(true));
  await (
    axiosInstance.post('/password-reset/', user_email)
      .then((response) => {
        localStorage.setItem('TOKEN', response.data.token);

        dispatch(requestReset(response.data));
        dispatch(processingAction(false));
      })
      .catch((error) => {
        try {
          CatchError(dispatch, error);
        } catch (error) {
          console.log('check your internet connection');
        }
      })
  );
};

export const handlePasswordReset = user_password => async (dispatch) => {
  dispatch(processingAction(true));
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('TOKEN'),
  };
  return await (
    axiosInstance.put('/password-reset/done', user_password, { headers })
      .then((response) => {
        dispatch(confirmReset(response.data));
        dispatch(processingAction(false));
      })
      .catch((error) => {
        CatchError(dispatch, error);
      })
  );
};
