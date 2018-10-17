/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  LOGIN, FETCHING, INVALID_CREDENTIALS, LOGIN_FAILURE,
} from '../types';
import { handleLoginResponse, logoutUser } from '../index';
import { axiosInstance } from '../../globals';

describe('login actions', () => {
  let store;
  let httpMock;
  let loginUrl;
  let expected;

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axiosInstance);
    const mockStore = configureMockStore();
    store = mockStore({});
    loginUrl = '/users/login/';
    expected = [
      { type: FETCHING, payload: true },
      { type: FETCHING, payload: false },
    ];
  });

  it('logs in user', async () => {
    const responseData = {
      email: 'test@email.com',
      username: 'test',
      token: 'test_token',
    };

    httpMock.onPost(loginUrl).reply(200, responseData);

    handleLoginResponse()(store.dispatch);
    await flushAllPromises();

    expected.splice(1, 0, { type: LOGIN, payload: responseData });
    expect(store.getActions()).toEqual(expected);
  });

  it('returns error if invalid credentials provided', async () => {
    const responseData = {
      errors: {
        error: ['A user with this email and password was not found.'],
      },
    };

    httpMock.onPost(loginUrl).reply(400, responseData);

    handleLoginResponse()(store.dispatch);
    await flushAllPromises();

    expected.splice(1, 0, { type: INVALID_CREDENTIALS, payload: responseData });

    expect(store.getActions()).toEqual(expected);
  });

  it('should logout user', async () => {
    logoutUser()(store.dispatch);
    expect(localStorage.getItem('token')).toBe(null);
  });
});
