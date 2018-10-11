/* eslint-disable no-undef,no-use-before-define,camelcase */
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import Enzyme from 'enzyme';
import { axiosInstance } from '../../globals';
import { SOCIAL_LOGIN, LOGIN_FAILURE, FETCHING } from '../types';
import { handleSocialResponse } from '../authentication';

Enzyme.configure({ adapter: new Adapter() });

describe('test authentication login actions', () => {
  let store; let response_data; let httpMock; let
    requestUrl;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({ authentication: jest.fn() });
    requestUrl = '/social/';
    response_data = { username: 'user', email: 'email', token: 'user_token' };
    httpMock = new MockAdapter(axiosInstance);
  });

  it('should login with social platform', async () => {
    await performRequest(200, SOCIAL_LOGIN);
  });

  it('should fail to login with social platform', async () => {
    await performRequest(400, LOGIN_FAILURE);
  });

  const performRequest = async (code, action) => {
    httpMock.onPost(requestUrl).reply(code, response_data);
    handleSocialResponse({ accessToken: 'token' }, 'social')(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()).toEqual([
      { type: FETCHING, payload: true },
      { type: action, payload: response_data },
      { type: FETCHING, payload: false },
    ]);
  };
});
