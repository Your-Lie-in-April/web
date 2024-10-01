import styled from 'styled-components';

export const ModalBlackOut = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
`;

export const ModalBackBlur = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(1px);
`;
