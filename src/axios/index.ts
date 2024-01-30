import axios from "axios";

const URL = 'https://orozkg.pythonanywhere.com/api/v1'

export const apiToken = axios.create({
    baseURL: URL,
});



apiToken.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

