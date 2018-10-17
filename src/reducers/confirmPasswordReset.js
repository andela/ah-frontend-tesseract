/* eslint-disable import/prefer-default-export */
import { CONFIRM_PASSWORD_RESET, PROCESSING, FAILED } from '../actions/types';

const initialState = {
  message: '',
  processing: false,
  error: '',
};

export const ConfirmPasswordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case CONFIRM_PASSWORD_RESET:
      return {
        ...state,
        message: action.payload,
      };
    case FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case PROCESSING:
      return {
        ...state,
        processing: action.payload,
      };
  }
};
