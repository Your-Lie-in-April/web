import { FC, useState, useEffect } from 'react';
import BeforeLogin from './BeforeLogin';
import AfterLogin from './AfterLogin';

const Header: FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.get('access_token') || '';
        const refreshToken = localStorage.get('refresh_token') || '';

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        }

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
    });

    return <>{isLoggedIn ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Header;
