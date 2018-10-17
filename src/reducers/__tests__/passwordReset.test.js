/* eslint-disable no-undef */
import { passwordResetReducer } from '../passwordReset';
import { ConfirmPasswordResetReducer } from '../confirmPasswordReset';
import {
  requestReset, processingAction, failedAction, confirmReset,
} from '../../actions';
import rootReducer from '../index';


const state = {
  message: '',
  processing: false,
  error: '',
};

describe('Request Password reset reducer', () => {
  it('should return initial State', () => {
    const newState = passwordResetReducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle REQUEST PASSWORD RESET action', () => {
    const payload = 'A password reset email has been sent to your inbox';
    const newState = passwordResetReducer(state, requestReset(payload));

    expect(newState).toEqual({ ...state, message: payload });
  });

  it('should handle PROCESSING action', () => {
    const payload = true;
    const newState = passwordResetReducer(state, processingAction(payload));

    expect(newState).toEqual({ ...state, processing: payload });
  });

  it('should handle FAILURE action', () => {
    const payload = 'error';
    const newState = passwordResetReducer(state, failedAction(payload));

    expect(newState).toEqual({ ...state, error: payload });
  });
});


describe('Confirm Password reset reducer', () => {
  it('should return initial State', () => {
    const newState = ConfirmPasswordResetReducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle COMFIRM PASSWORD RESET action', () => {
    const payload = 'Your password has been reset';
    const newState = ConfirmPasswordResetReducer(state, confirmReset(payload));

    expect(newState).toEqual({ ...state, message: payload });
  });

  it('should handle PROCESSING action', () => {
    const payload = true;
    const newState = ConfirmPasswordResetReducer(state, processingAction(payload));

    expect(newState).toEqual({ ...state, processing: payload });
  });

  it('should handle FAILURE action', () => {
    const payload = 'error';
    const newState = ConfirmPasswordResetReducer(state, failedAction(payload));

    expect(newState).toEqual({ ...state, error: payload });
  });
});


describe('Root Reducer', () => {
  const initialState = {};
  it('should return initial state', () => {
    const store = rootReducer(initialState, '');

    expect(String(store)).toContain(String(initialState));
  });
});
