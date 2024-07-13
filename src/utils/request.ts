import createRequest from './createRequest';

export const request = createRequest({
    onRequest: (config: RequestInit) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers = new Headers(config.headers || {});
            (config.headers as Headers).set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    onResponse: (response: Response) => {
        return response;
    },
    onRequestError: (error: any) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
    onResponseError: (error: any) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    },
});
