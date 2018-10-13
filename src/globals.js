import axios from 'axios';

const API_HOST_URL=process.env.REACT_APP_API_HOST_URL;

export const axiosInstance = axios.create({
    baseURL: API_HOST_URL,
    headers: {'Authorization': localStorage.getItem('token')?localStorage.getItem('token'):""}
});
