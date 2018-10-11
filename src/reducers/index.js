import { combineReducers } from 'redux';
import signUpReducer from './signupReducer';
import { loginReducer } from './authentication';
import { passwordResetReducer } from './passwordReset';
import { ConfirmPasswordResetReducer } from './confirmPasswordReset';
import { articleReducer } from './articles';
import { profileReducer } from './profile';

export default combineReducers({
  create_user: signUpReducer,
  authentication: loginReducer,
  passwordReset: passwordResetReducer,
  confirmPasswordReset: ConfirmPasswordResetReducer,
  article: articleReducer,
  profile: profileReducer,
});
