/* eslint-disable no-undef,camelcase,no-shadow */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { handlePasswordReset, handleRequestReset } from '../index';
import {
  PROCESSING, FAILED, CONFIRM_PASSWORD_RESET, REQUEST_PASSWORD_RESET,
} from '../types';
import { axiosInstance } from '../../globals';


jest.setTimeout(30000);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});


describe('test password reset actions', () => {
  let store; let response_data; let httpMock; let
    requestUrl;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({ PasswordReset: jest.fn() });
    requestUrl = '/password-reset/';
    response_data = { token: 'tokeggsggh' };
    httpMock = new MockAdapter(axiosInstance);
  });

  it('should successfully request a password reset', async () => {
    httpMock.onPost(requestUrl).reply(200, response_data);
    handleRequestReset({ email: 'mailme@g.com' })(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: PROCESSING, payload: true },
      { type: REQUEST_PASSWORD_RESET, payload: response_data },
      { type: PROCESSING, payload: false },
    ]);
  });

  it('should successfully reset the password', async () => {
    httpMock.onPut('/password-reset/done').reply(200, 'Your password has been reset');
    handlePasswordReset({ password: '15password' })(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: PROCESSING, payload: true },
      { type: CONFIRM_PASSWORD_RESET, payload: 'Your password has been reset' },
      { type: PROCESSING, payload: false },
    ]);
  });
});