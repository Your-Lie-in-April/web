import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const NewProjectDiv = styled.div`
    width: 149px;
    height: 70px;
    border-radius: 40px;
    background-color: #633ae2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NewProjectText = styled.div`
    color: #ffffff;
    font-size: 22px;
    font-weight: 800;
    font-family: 'Pretendard';
    letter-spacing: 0px;
    line-height: 1;
    &: hover {
        color: #000000;
        cursor: pointer;
    }
`;

const NewProject: FC = () => {
    const navigate = useNavigate();
    const handleNewProject = () => {
        navigate('/projectmake');
    };
    return (
        <NewProjectDiv onClick={handleNewProject}>
            <NewProjectText>
                NEW
                <br />
                PROJECT
            </NewProjectText>
        </NewProjectDiv>
    );
};

export default NewProject;
