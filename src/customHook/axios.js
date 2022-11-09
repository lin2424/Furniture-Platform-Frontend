import axios from 'axios';
const ServerURL = 'http://localhost:3500';

export default axios.create({
    baseURL: ServerURL
});

export const axiosPrivate = axios.create({
    baseURL: ServerURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});