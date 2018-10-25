/* eslint-disable no-return-await */
import {
  SENDING_RATING,
  SET_RATING,
  RATING_FAILURE,
} from './types';
import { axiosInstance } from '../globals';

export const SendingRatingAction = payload => ({
  type: SENDING_RATING,
  payload,
});

export const SetRatingAction = payload => ({
  type: SET_RATING,
  payload,
});

export const RatingFailureAction = payload => ({
  type: RATING_FAILURE,
  payload,
});

export const handleRating = ratingData => async (dispatch) => {
  dispatch(SendingRatingAction(true));

  return await axiosInstance.post('/article/rating/', ratingData)
    .then((response) => {
      dispatch(SetRatingAction(response.data));
      dispatch(SendingRatingAction(false));
    })
    .catch((error) => {
      dispatch(RatingFailureAction(error.response.data));
      dispatch(SendingRatingAction(false));
    })
    .catch((error) => {
      dispatch(RatingFailureAction(error.response));
      dispatch(SendingRatingAction(false));
    });
};
