import { useProjectContext } from '@hooks/context/projectContext';
import useDispatchProjectData from '@hooks/useDispatchProject';
import BackBtnSvg from '@pics/back-btn.svg';
import { useCallback } from 'react';
import styled from 'styled-components';

const BackBtn = () => {
    const { projectData } = useProjectContext();
    const dispatchProjectData = useDispatchProjectData();

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            dispatchProjectData(projectData);
        },
        [projectData, dispatchProjectData]
    );

    return (
        <BackButton onClick={handleClick}>
            <img src={BackBtnSvg} /> 되돌리기
        </BackButton>
    );
};
export default BackBtn;

const BackButton = styled.button.attrs({ type: 'button' })`
    width: 145px;
    height: 34px;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid #000000;
    display: flex;
    gap: 9px;
    font-family: 'Pretendard';
    white-space: nowrap;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #000000;

    &:hover {
        border-color: black;
    }

    &:focus {
        border: 1px solid #000000;
    }

    &:active {
        border: 1px solid #000000;
    }
`;
