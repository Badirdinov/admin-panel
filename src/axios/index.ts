import axios from "axios";

const URL = 'https://orozkg.pythonanywhere.com/api/v1'

export const apiToken = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type" : 'application/json',
    }
});



apiToken.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

