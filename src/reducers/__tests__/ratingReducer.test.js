import { ratingReducer } from '../ratingReducer';

import {
  SENDING_RATING,
  SET_RATING,
  RATING_FAILURE,
} from '../../actions/types';

describe('rating profiler', () => {
  let ratingData;
  let beforeState;

  beforeEach(() => {
    ratingData = {
      rating: 1,
      article: 'Test article',
      rated_by: 'test@test.com',
    };
    beforeState = {};
  });

  it('returns initial state', () => {
    expect(ratingReducer(undefined, {})).toEqual(beforeState);
  });

  it('sets sending rating status', () => {
    const action = { type: SENDING_RATING, payload: true };
    const afterState = ratingReducer(beforeState, action);
    expect(afterState).toEqual({
      sending: true,
    });
  });

  it('sets the rating info', () => {
    const action = { type: SET_RATING, payload: ratingData };
    const afterState = ratingReducer(beforeState, action);
    expect(afterState).toEqual({
      rating: { ...ratingData },
    });
  });

  it('sets the error info', () => {
    const errorInfo = { error: 'There was an error' };
    const action = { type: RATING_FAILURE, payload: errorInfo };
    const afterState = ratingReducer(beforeState, action);
    expect(afterState).toEqual({
      error: { ...errorInfo },
    });
  });
});
