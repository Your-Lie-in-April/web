import getIsLogin from '@utils/getIsLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        if (getIsLogin()) {
            navigate('/', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return null;
}
