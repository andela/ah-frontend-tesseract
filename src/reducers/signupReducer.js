import { CREATE_NORMAL_USER, IS_LOADING, SIGNUP_ERROR } from '../actions/types';

const initialState = {
  user: {},
  is_loading: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NORMAL_USER:

      return {
        ...state,
        user: action.payload,

      };
    case IS_LOADING:
      return {
        ...state,
        is_loading: action.payload,
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
