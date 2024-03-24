import axios from 'axios';

const dev = 'http://localhost:5000';
export const API_URL =  '/api';
export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (!config.headers) return config;
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'zhas-token-2024'
    )}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log(error);
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('zhas-token-2024', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                localStorage.removeItem('zhas-token-2024');
                console.log(e);
            }
        }
        throw error;
    }
);
