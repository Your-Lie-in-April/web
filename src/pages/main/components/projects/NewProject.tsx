import { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const NewProjectDiv = styled.button.attrs({
    type: 'button',
})`
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
    &:hover {
        color: #000000;
        cursor: pointer;
    }
`;

const NewProject: FC = () => {
    const navigate = useNavigate();
    const handleNewProject = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) navigate('/login');
        else navigate('/projectmake');
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
