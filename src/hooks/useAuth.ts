import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
    memberId: string | null;
}

export const useAuth = () => {
    const location = useLocation();

    const getTokensFromUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        return {
            accessToken: searchParams.get('access_token'),
            refreshToken: searchParams.get('refresh_token'),
            memberId: searchParams.get('member_id'),
        };
    };

    const getTokensFromStorage = () => {
        return {
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token'),
            memberId: localStorage.getItem('member_id'),
        };
    };

    const saveTokensToStorage = (tokens: Partial<AuthTokens>) => {
        if (tokens.accessToken) localStorage.setItem('access_token', tokens.accessToken);
        if (tokens.refreshToken) localStorage.setItem('refresh_token', tokens.refreshToken);
        if (tokens.memberId) localStorage.setItem('member_id', tokens.memberId);
    };

    useEffect(() => {
        const urlTokens = getTokensFromUrl();
        const storageTokens = getTokensFromStorage();

        const tokens = {
            accessToken: urlTokens.accessToken || storageTokens.accessToken,
            refreshToken: urlTokens.refreshToken || storageTokens.refreshToken,
            memberId: urlTokens.memberId || storageTokens.memberId,
        };

        saveTokensToStorage(tokens);
    }, [location.search]);

    return getTokensFromStorage();
};
