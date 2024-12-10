// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/anime/api/',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;
