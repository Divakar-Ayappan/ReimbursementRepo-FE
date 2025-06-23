import axios from 'axios';

const http = axios.create({
    baseURL:'http://localhost:8080',
    timeout: 10000,
    withCredentials: true
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
