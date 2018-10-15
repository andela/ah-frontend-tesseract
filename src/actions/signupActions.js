/* eslint-disable no-return-await,no-unused-vars,import/prefer-default-export */
import { axiosInstance } from "../globals";
import {CREATE_NORMAL_USER, FETCHING, SIGNUP_ERROR} from "./types";

export const createUser = postData =>  async (dispatch) => {
        dispatch({type:FETCHING,payload:true});
        return await axiosInstance
                .post('/users/', postData)
                .then((response) => {
                    dispatch({ type: CREATE_NORMAL_USER, payload: response.data });
                    dispatch({ type: FETCHING, payload:false});
                } )
                .catch(error => {
                    try {
                        let errors= error.response.data.errors;
                        dispatch({ type: SIGNUP_ERROR, payload: errors});
                        dispatch({ type: FETCHING, payload:false});
                    } catch(error) {
                        dispatch({ type: SIGNUP_ERROR, payload: {error : 'Check your internet connection'}});
                    }
                })

};
