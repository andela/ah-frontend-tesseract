/* eslint-disable no-undef,no-use-before-define */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../index';
import { SOCIAL_LOGIN, LOGIN_FAILURE, FETCHING } from '../../actions/types';

Enzyme.configure({ adapter: new Adapter() });

describe('test authentication login actions', () => {
  let intialState; let
    afterState;

  beforeEach(() => {
    intialState = { userDetails: {}, isLoggedIn: false };
  });

  it('should return initial state', () => {
    reduceAction('UNKNOWN', '');
    expect(afterState.authentication).toEqual(intialState);
  });

  it('should update state on successful social login', () => {
    reduceAction(SOCIAL_LOGIN, { user: 'test', email: 'email' });
    expect(afterState.authentication).toEqual({
      userDetails: { user: 'test', email: 'email' },
      isLoggedIn: true,
    });
  });

  it('should update state with errors on failure to login', () => {
    reduceAction(LOGIN_FAILURE, { errors: 'errors' });
    expect(afterState.authentication).toEqual({ userDetails: { errors: 'errors' }, isLoggedIn: false });
  });

  it('should update state on fetch', () => {
    reduceAction(FETCHING, true);
    expect(afterState.authentication).toEqual({
      isFetching: true,
      isLoggedIn: false,
      userDetails: {},
    });
  });

  const reduceAction = (actionType, payload) => {
    const action = { type: actionType, payload };
    afterState = reducer(intialState, action);
  };
});
