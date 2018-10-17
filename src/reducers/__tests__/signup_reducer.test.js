/* eslint-disable no-shadow,no-undef */
import signUpReducer from '../signupReducer';
import { CREATE_NORMAL_USER, IS_LOADING, SIGNUP_ERROR } from '../../actions/types';
import { loginReducer } from '../authentication';

describe('sign_up reducer', () => {
  let userData; let beforeState;

  beforeEach(() => {
    userData = {
      email: 'test@test.com',
      username: 'test_user',
    };

    beforeState = {
      user: {},
      is_loading: false,

    };
  });

  it('returns initial state', () => {
    expect(signUpReducer(undefined, {})).toEqual(beforeState);
  });

  it('sets up fetched new state', () => {
    const action = {
      type: CREATE_NORMAL_USER,
      payload: userData,
    };

    const afterState = signUpReducer(beforeState, action);

    expect(afterState).toEqual({ is_loading: false, user: userData });
  });

  it('resets loading status', () => {
    const beforeState = {
      user: {},
      is_loading: true,
    };
    const action = { type: IS_LOADING };
    const afterState = loginReducer(beforeState, action);
    expect(afterState).toEqual({
      user: {},
      is_loading: true,
    });
  });

  it('sets error', () => {
    const error = 'username must be 8 characters';

    const action = {
      type: SIGNUP_ERROR,
      payload: error,
    };

    const afterState = signUpReducer(beforeState, action);

    expect(afterState).toEqual({
      user: {},
      is_loading: false,
      creation_error: error,
    });
  });
});
