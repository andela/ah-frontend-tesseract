import {LOGIN, INVALID_CREDENTIALS, FETCHING, LOGOUT} from "./types";
import {axiosInstance} from "../globals";

const Login = (payload) => {
    return {
        type: LOGIN,
        payload: payload
    };
};

const InvalidCredentialsError = (payload) => {
    return {
        type: INVALID_CREDENTIALS,
        payload: payload
    }
};

const FetchAction = (payload) => {
    return {
        type: FETCHING,
        payload: payload
    }
};

const Logout = () => {
    return {
        type: LOGOUT
    }
};

export const handleLoginResponse = (user_data) => async (dispatch) => {

    dispatch(FetchAction(true));
    return await (
        axiosInstance.post('/users/login/', user_data)
            .then((response) => {
                dispatch(Login(response.data));
                dispatch(FetchAction(false));
                localStorage.setItem('token', response.data.token);
            })
            .catch((error) => {
                dispatch(InvalidCredentialsError(error.response.data));
                dispatch(FetchAction(false));
            })
    )
};

export const logoutUser = () => (dispatch) => {
    dispatch(Logout());
    localStorage.removeItem('token');
};