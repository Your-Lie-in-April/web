import { Http } from '#/constants/backendURL';

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
        const response = await fetch(`${Http}/v1/auth/reissue`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to refresh token:', response.statusText);
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.data.accessToken);
        localStorage.setItem('refresh_token', data.data.refreshToken);
        return data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

export function removeTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('member_id');
}

export async function handleTokenRefresh() {
    try {
        const newToken = await refreshToken();
        return newToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        removeTokens();
        return;
    }
}
