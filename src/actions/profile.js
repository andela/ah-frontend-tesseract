/* eslint-disable no-return-await */
import { axiosInstance } from '../globals';
import {
  FETCHING_PROFILE,
  SET_PROFILE,
  SAVING_PROFILE,
  EDITING_PROFILE,
  PROFILE_ERROR,
} from './types';

const FetchProfileAction = payload => ({
  type: FETCHING_PROFILE,
  payload,
});

const SetProfileAction = payload => ({
  type: SET_PROFILE,
  payload,
});

export const ToggleEditingAction = payload => ({
  type: EDITING_PROFILE,
  payload,
});

const SavingProfileAction = payload => ({
  type: SAVING_PROFILE,
  payload,
});

const ProfileErrorAction = payload => ({
  type: PROFILE_ERROR,
  payload,
});

export const handleGetProfileResponse = dontThrowError => async (dispatch) => {
  dispatch(FetchProfileAction(true));
  return await axiosInstance.get('/user')
    .then((response) => {
      dispatch(SetProfileAction(response.data));
      dispatch(FetchProfileAction(false));
    })
    .catch((error) => {
      if (!dontThrowError) dispatch(ProfileErrorAction(error.response.data));
      dispatch(FetchProfileAction(false));
    })
    .catch((error) => {
      dispatch(ProfileErrorAction(`Internet Connection error ${error.response}`));
      dispatch(FetchProfileAction(false));
    });
};

export const handleGetSpecificUserProfile = username => async (dispatch) => {
  dispatch(FetchProfileAction(true));
  let url = `/profiles/${username}`;
  if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
    url = `profiles/user/${username}`;
  }

  return await axiosInstance.get(url)
    .then((response) => {
      dispatch(SetProfileAction(response.data.profile));
      dispatch(FetchProfileAction(false));
    })
    .catch((error) => {
      dispatch(ProfileErrorAction(error.response.data));
      dispatch(FetchProfileAction(false));
    })
    .catch((error) => {
      dispatch(ProfileErrorAction(`Internet Connection error ${error.response}`));
      dispatch(FetchProfileAction(false));
    });
};

export const handleEditProfile = profileData => async (dispatch) => {
  dispatch(SavingProfileAction(true));

  return await axiosInstance.put('/user/', profileData)
    .then((response) => {
      dispatch(SetProfileAction(response.data));
      dispatch(SavingProfileAction(false));
    })
    .catch((error) => {
      dispatch(ProfileErrorAction(error.response.data));
      dispatch(SavingProfileAction(false));
    })
    .catch((error) => {
      dispatch(ProfileErrorAction(`Internet Connection error ${error.response}`));
      dispatch(SavingProfileAction(false));
    });
};
