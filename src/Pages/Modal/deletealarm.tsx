import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ opacity: number }>`
    position: relative;
    top: -150px;
    left: 100px;
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
    pointer-events: none;
`;

const DeleteAlarm = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(0);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (opacity === 0) {
            const hideTimer = setTimeout(() => {
                setOpacity(0);
            }, 1500);
            return () => clearTimeout(hideTimer);
        }
    }, [opacity]);

    return <Container opacity={opacity}>알림이 삭제되었습니다.</Container>;
};

export default DeleteAlarm;
