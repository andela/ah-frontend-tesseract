import {
  FETCHING_PROFILE, SET_PROFILE, SAVING_PROFILE, EDITING_PROFILE, PROFILE_ERROR,
} from '../actions/types';

const setProfile = payload => ({
  email: payload.email,
  username: payload.username,
  bio: payload.bio,
  image: payload.image,
  location: payload.location,
  occupation: payload.occupation,
});

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHING_PROFILE:
      return { ...state, isFetchingProfile: action.payload };
    case SET_PROFILE:
      return { ...state, ...setProfile(action.payload), profileErrors: undefined };
    case SAVING_PROFILE:
      return { ...state, isSavingProfile: action.payload, profileErrors: undefined };
    case EDITING_PROFILE:
      return { ...state, isEditing: action.payload, profileErrors: undefined };
    case PROFILE_ERROR:
      return { ...state, profileErrors: action.payload };
    default:
      return state;
  }
};
