import { handleTokenRefresh, removeTokens } from './refreshToken';

interface Interceptor {
    onRequest?: (config: RequestInit) => RequestInit;
    onResponse?: (response: Response) => Response | PromiseLike<Response>;
    onRequestError?: (reason: any) => Promise<never>;
    onResponseError?: (reason: any) => Promise<never>;
}

const createRequest = ({
    onRequest = (config: RequestInit) => config,
    onResponse = (response: Response) => response,
    onRequestError = (reason: any) => Promise.reject(reason),
    onResponseError = (reason: any) => Promise.reject(reason),
}: Interceptor) => {
    const request = async (url: string, config?: RequestInit) => {
        try {
            let requestConfig = config ? onRequest(config) : onRequest({});
            let response = await fetch(url, requestConfig);

            if (response.status === 400) {
                console.error('401 error. Redirecting to main');
                window.location.href = '/';
                return Promise.reject(new Error('Forbidden: Access denied'));
            }

            if (response.status === 401) {
                console.warn('Token expired');
                const newAccessToken = await handleTokenRefresh();
                if (newAccessToken) {
                    localStorage.setItem('access_token', newAccessToken);

                    const updatedHeaders = new Headers(requestConfig.headers || {});
                    updatedHeaders.set('Authorization', `Bearer ${newAccessToken}`);
                    requestConfig = {
                        ...requestConfig,
                        headers: updatedHeaders,
                    };

                    response = await fetch(url, requestConfig);
                } else {
                    console.error('Failed to refresh token');
                    removeTokens();
                    window.location.href = '/login';
                    return Promise.reject(new Error('Failed to refresh token'));
                }
            }

            if (response.status === 403) {
                console.error('403 error. Redirecting to main');
                window.location.href = '/';
                return Promise.reject(new Error('Forbidden: Access denied'));
            }

            return onResponse(response);
        } catch (reason) {
            console.error('Request failed:', reason);
            return onResponseError(reason);
        }
    };

    return request;
};

export default createRequest;
