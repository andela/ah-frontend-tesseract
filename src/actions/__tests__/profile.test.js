import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../globals';
import {
  FETCHING_PROFILE,
  SET_PROFILE,
  SAVING_PROFILE,
  PROFILE_ERROR,
} from '../types';
import {
  handleGetProfileResponse,
  handleGetSpecificUserProfile,
  handleEditProfile,
} from '../profile';

describe('profile actions', () => {
  let store;
  let httpMock;
  let profileUrl;
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
      { type: FETCHING_PROFILE, payload: true },
      { type: FETCHING_PROFILE, payload: false },
    ];
  });

  it('gets users own profile', async () => {
    profileUrl = '/user';
    httpMock.onGet(profileUrl).reply(200, response);

    handleGetProfileResponse()(store.dispatch);
    await flushAllPromises();

    expected.splice(1, 0, { type: SET_PROFILE, payload: response });

    expect(store.getActions()).toEqual(expected);
  });

  it('edits profile', async () => {
    profileUrl = '/user/';
    httpMock.onPut(profileUrl).reply(200, response);

    handleEditProfile()(store.dispatch);
    await flushAllPromises();

    expected = [
      { type: SAVING_PROFILE, payload: true },
      { type: SET_PROFILE, payload: response },
      { type: SAVING_PROFILE, payload: false },
    ];

    expect(store.getActions()).toEqual(expected);
  });

  it('gets specific user profile', async () => {
    const responseData = { profile: 'some profile' };
    httpMock.onGet('/profiles/user1').reply(200, responseData);

    handleGetSpecificUserProfile('user1')(store.dispatch);
    await flushAllPromises();
    expected.splice(1, 0, { type: SET_PROFILE, payload: responseData.profile });
    expect(store.getActions()).toEqual(expected);
  });

  it('dispatches an error action when user gets their own profile', async () => {
    httpMock.onGet('/user').reply(403, errorData);
    handleGetProfileResponse()(store.dispatch);
    await flushAllPromises();
    expected.splice(1, 0, { type: PROFILE_ERROR, payload: errorData });
    expect(store.getActions()).toEqual(expected);
  });

  it('dispatches an error action when user edits their profile', async () => {
    httpMock.onPut('/user/').reply(403, errorData);
    handleEditProfile()(store.dispatch);
    await flushAllPromises();
    expected = [
      { type: SAVING_PROFILE, payload: true },
      { type: PROFILE_ERROR, payload: errorData },
      { type: SAVING_PROFILE, payload: false },
    ];
    expect(store.getActions()).toEqual(expected);
  });

  it('dispatches an error action when getting specific user', async () => {
    httpMock.onGet('/profiles/user1').reply(404, errorData);
    handleGetSpecificUserProfile('user1')(store.dispatch);
    await flushAllPromises();
    expected.splice(1, 0, { type: PROFILE_ERROR, payload: errorData });

    expect(store.getActions()).toEqual(expected);
  });
});
