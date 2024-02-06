import { FC } from 'react';
import styled from 'styled-components';

const NewProjectDiv = styled.div`
    width: 149px;
    height: 70px;
    border-radius: 40px;
    background-color: #633ae2;
    text-align: center;
`;
const NewProjectText = styled.text`
    color: #ffffff;
    font-size: 22px;
    font-weight: 800;
    font-family: 'Pretendard';
    margin: auto 0;
`;
const NewProject: FC = () => {
    return (
        <NewProjectDiv>
            <NewProjectText>NEW PROJECT</NewProjectText>
        </NewProjectDiv>
    );
};

export default NewProject;
