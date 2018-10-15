/* eslint-disable no-shadow,no-undef */
import signUpReducer from "../signupReducer";
import {CREATE_NORMAL_USER,FETCHING, SIGNUP_ERROR} from "../../actions/types";

describe('sign_up reducer', () => {
    let userData, beforeState;

    beforeEach(() => {

        userData = {
            email: 'test@test.com',
            username: 'test_user',
        };

        beforeState = {
            user: {},
            isFetching: false,

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

        expect(afterState).toEqual({isFetching: false, user: userData});
    });

    it('resets loading status', () => {
        const beforeState = {
            user: {},
            isFetching: false,
        };
        const action = {type: FETCHING, payload: true};
        const afterState = signUpReducer(beforeState, action);
        expect(afterState).toEqual({
            user: {},
            isFetching: true,
        });
    });

    it('sets error', () => {
        let error = 'username must be 8 characters';

        const action = {
            type: SIGNUP_ERROR,
            payload: error,
        };

        const afterState = signUpReducer(beforeState, action);

        expect(afterState).toEqual({
            user: {},
            isFetching: false,
            creation_error: error,
        });
    });
});
