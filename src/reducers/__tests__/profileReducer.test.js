import { profileReducer } from '../profile';

import {
    SET_PROFILE,
    PROFILE_ERROR,
    SAVING_PROFILE,
    EDITING_PROFILE,
    FETCHING_PROFILE, USERS_LIST,
} from '../../actions/types';

describe('profile reducer', () => {
  let profileData;
  let beforeState;
  let user_list;
  let beforeStateList;

  beforeEach(() => {
    profileData = {
      username: 'test',
      bio: 'test_bio',
    };
    user_list ={data: "responseData", followedUser: "user", follow: true};

    beforeStateList = {usersList:[]};
    beforeState = {};
  });

  it('returns initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(beforeState);
  });

  it('sets fetching status', () => {
    const action = { type: FETCHING_PROFILE, payload: true };
    const afterState = profileReducer(beforeState, action);
    expect(afterState).toEqual({
      isFetchingProfile: true,
    });
  });

  it('sets users profile', () => {
    const action = { type: SET_PROFILE, payload: profileData };
    const afterState = profileReducer(beforeState, action);
    expect(afterState).toEqual(profileData);
  });

  it('sets saving status', () => {
    const action = { type: SAVING_PROFILE, payload: true };
    const afterState = profileReducer(beforeState, action);
    expect(afterState).toEqual({
      isSavingProfile: true,
    });
  });

  it('sets editing status', () => {
    const action = { type: EDITING_PROFILE, payload: true };
    const afterState = profileReducer(beforeState, action);
    expect(afterState).toEqual({
      isEditing: true,
    });
  });

  it('sets profile errors', () => {
    const errorMessage = { error: 'There was an error' };
    const action = { type: PROFILE_ERROR, payload: errorMessage };
    const afterState = profileReducer(beforeState, action);
    expect(afterState).toEqual({
      profileErrors: errorMessage,
    });
  });

  it('updates follow status ', () => {
    const action = { type: USERS_LIST, payload: user_list };
    const afterState = profileReducer(beforeStateList, action);
    expect(afterState).toEqual({"followers": 0, "following": 0, "usersList": []});
  });
});
