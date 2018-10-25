import { combineReducers } from 'redux';
import signUpReducer from './signupReducer';
import { loginReducer } from './authentication';
import { passwordResetReducer } from './passwordReset';
import { ConfirmPasswordResetReducer } from './confirmPasswordReset';
import {articleReducer} from "./articles";
import landingReducer from "./landingStories";
import { profileReducer } from './profile';
import { ratingReducer } from "./ratingReducer";

export default combineReducers({
  create_user: signUpReducer,
  authentication: loginReducer,
  passwordReset: passwordResetReducer,
  confirmPasswordReset: ConfirmPasswordResetReducer,
  article: articleReducer,
  landing:landingReducer,
  profile: profileReducer,
  articleRating: ratingReducer,
});
