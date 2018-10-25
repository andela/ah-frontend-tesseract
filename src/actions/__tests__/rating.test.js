import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../globals';
import {
  SENDING_RATING,
  SET_RATING,
  RATING_FAILURE,
} from '../types';
import {
  handleRating,
} from '../rating';

describe('rating actions', () => {
  let store; let httpMock;
  let expected;

  const response = {
    message: 'success',
  };

  const errorData = {
    error: 'There was an error',
  };

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureMockStore();
    store = mockStore({});
    expected = [
      { type: SENDING_RATING, payload: true },
      { type: SENDING_RATING, payload: false },
    ];
  });

  it('sends the users rating', async () => {
    httpMock.onPost('/article/rating/').reply(201, response);
    handleRating()(store.dispatch);
    await flushAllPromises();
    expected.splice(1, 0, { type: SET_RATING, payload: response });
    expect(store.getActions()).toEqual(expected);
  });

  it('returns an error', async () => {
    httpMock.onPost('/article/rating').reply(400, errorData);
    handleRating()(store.dispatch);
    await flushAllPromises();
    expected.splice(1, 0, { type: RATING_FAILURE, payload: errorData });
  });
});
