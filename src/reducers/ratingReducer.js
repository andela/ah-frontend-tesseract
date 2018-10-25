import {
  SENDING_RATING,
  SET_RATING,
  RATING_FAILURE,
} from '../actions/types';

export const ratingReducer = (state = {}, action) => {
  switch (action.type) {
    case SENDING_RATING:
      return { ...state, sending: true };
    case SET_RATING:
      return { ...state, rating: action.payload, error: undefined };
    case RATING_FAILURE:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
