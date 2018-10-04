import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://ah-backend-tesseract-staging.herokuapp.com/api"
});