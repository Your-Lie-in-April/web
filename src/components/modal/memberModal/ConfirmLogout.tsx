import ModalPortal from '@utils/modalPortal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div<{ opacity: number }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #f2f2f2;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

    color: #633ae2;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    opacity: ${({ opacity }) => opacity};
    transition: opacity 1s ease;
`;

interface ConfirmLogoutProps {
    setLogOut: (value: boolean) => void;
}

const ConfirmLogout: React.FC<ConfirmLogoutProps> = ({ setLogOut }) => {
    const [opacity, setOpacity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(0);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (opacity === 0) {
            const hideTimer = setTimeout(() => {
                localStorage.clear();
                navigate('/login');
                setLogOut(true);
            }, 500);
            return () => clearTimeout(hideTimer);
        }
    }, [opacity, setLogOut, localStorage]);

    return (
        <ModalPortal>
            <Container opacity={opacity}>로그아웃 되었습니다</Container>
        </ModalPortal>
    );
};

export default ConfirmLogout;
