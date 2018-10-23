import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../globals';
import {
    FETCHING_PROFILE,
    SET_PROFILE,
    SAVING_PROFILE,
    PROFILE_ERROR, USERS_LIST,
} from '../types';
import {
    handleGetProfileResponse,
    handleGetSpecificUserProfile,
    handleEditProfile, getUsers, followUser, unFollowUser,
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

  it('get list of users', async () => {
    httpMock.onGet('/profiles/users').reply(200, []);
    getUsers(' ')(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: USERS_LIST, payload: {data:[]} }
    ]);
  });


  it('fails to get list of users', async () => {
    httpMock.onGet('/profiles/users').reply(400, []);
    getUsers('')(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([]);
  });


  it('should follow user', async () => {
    httpMock.onPost('/profiles/user/follow').reply(200, []);
    followUser("user")(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
        { type: FETCHING_PROFILE, payload: true },
      { type: USERS_LIST, payload: {"data": [], "follow": true, "followedUser": "user"}},
      { type: FETCHING_PROFILE, payload: false },
    ]);
  });

   it('should un follow user', async () => {
    httpMock.onDelete('/profiles/user/follow').reply(200, []);
    unFollowUser("user")(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
        { type: FETCHING_PROFILE, payload: true },
      { type: USERS_LIST, payload: {"data": [], "follow": false, "followedUser": "user"}},
      { type: FETCHING_PROFILE, payload: false },
    ]);
  });

   it('should fail on unFollow', async () => {
    httpMock.onDelete('/profiles/user/follow').reply(ErrorEvent, []);
    unFollowUser("user")(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
        { type: FETCHING_PROFILE, payload: true },
      { type: FETCHING_PROFILE, payload: false },
    ]);
  });

});
