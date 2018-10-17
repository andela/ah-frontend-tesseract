/* eslint-disable import/prefer-default-export */
import { REQUEST_PASSWORD_RESET, PROCESSING, FAILED } from '../actions/types';


const initialState = {
  message: '',
  processing: false,
  error: '',
};

export const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PASSWORD_RESET:
      return {
        ...state,
        message: action.payload,
        error: '',

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
    default:
      return { ...state };
  }
};
