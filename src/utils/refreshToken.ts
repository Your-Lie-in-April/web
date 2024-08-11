import { API } from '@constants/api';
import axios from 'axios';

export async function getRefreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token');
    }
    try {
        const response = await axios.post(API.TOKEN_REISSUE, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        const { data } = response;
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
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
        await getRefreshToken();
    } catch (error) {
        console.error('Failed to refresh token:', error);
        removeTokens();
        throw error;
    }
}
