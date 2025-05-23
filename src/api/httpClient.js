import axios from 'axios';
import {JWT_COOKIE_NAME} from "../commons/Constants";

const http = axios.create({
    baseURL:'http://localhost:8080',
    timeout: 10000,
    withCredentials: true
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem(JWT_COOKIE_NAME);
    console.log(token);
    if (token) {
        config.headers['Cookie'] = `${JWT_COOKIE_NAME}=${token}`;
    }
    return config;
});

http.interceptors.response.use(
    response => response.data, // unwrap response
    error => {
        if (error.response?.status === 401) {
            // window.location.href = '/login'; // optional
        }
        return Promise.reject(error);
    }
);

export default http;
