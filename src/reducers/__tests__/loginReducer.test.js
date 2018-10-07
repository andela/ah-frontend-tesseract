import {loginReducer} from "../authentication";
import {LOGIN, INVALID_CREDENTIALS, FETCHING, LOGOUT} from "../../actions/types";

describe('login reducer', () => {
    let userData;
    let beforeState;

    beforeEach(() => {
        userData = {
            email: 'test@email.com',
            username: 'test',
            token: "test_token"
        };

        beforeState = {
            userDetails: {},
            isLoggedIn: false
        };
    });

    it('returns initial state', () => {
        expect(loginReducer(undefined, {})).toEqual({userDetails: {}, isLoggedIn: false});
    });

    it('sets up users details', function () {
        const action = {type: LOGIN, payload: userData};
        const afterState = loginReducer(beforeState, action);
        expect(afterState).toEqual({userDetails: userData, isLoggedIn: true});
    });

    it('sets error flag', function () {
        let errorData = {
            "errors": {
                "error": [
                    "A user with this email and password was not found."
                ]
            }};
        const action = {type: INVALID_CREDENTIALS, payload: errorData};
        const afterState = loginReducer(beforeState, action);
        expect(afterState).toEqual({
            userDetails: {},
            isLoggedIn: false,
            login_error: errorData
        });
    });

    it('sets fetching status', function () {
        const action = {type: FETCHING, payload: true};
        const afterState = loginReducer(beforeState, action);
        expect(afterState).toEqual({
            userDetails: {},
            isLoggedIn: false,
            isFetching: true
        });
    });

    it('resets user status', function () {
        beforeState = {
            userDetails: userData,
            isLoggedIn: true
        };
        const action = {type: LOGOUT};
        const afterState = loginReducer(beforeState, action);
        
        expect(afterState).toEqual({
            userDetails: {},
            isLoggedIn: false
        });
    });
});