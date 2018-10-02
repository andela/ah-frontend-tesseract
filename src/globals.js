import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://ah-backend-tesseract-staging.herokuapp.com/api"
});

export const TWITTER_LOGIN_URL = "https://ah-backend-tesseract-staging.herokuapp.com/oauth/complete/twitter/";
export const TWITTER_REQUEST_URL = "https://ah-backend-tesseract-staging.herokuapp.com/oauth/login/twitter/";