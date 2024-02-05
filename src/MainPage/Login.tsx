import { useEffect, useState, FC } from 'react';
import styled from 'styled-components';

const defaultImg = 'src/pics/default.png';
const LoginDiv = styled.div`
    width: 312px;
    height: 218px;
    border-radius: 10px;
`;
const ImageDiv = styled.div`
    width: 112px;
    height: 112px;
    margintop: 16px;
`;
const Text = styled.text`
    font: pretendard;
    font-weight: 500;
    font-size: 14px;
    margintop: 16px;
`;

const Login: FC = () => {
    return (
        <LoginDiv>
            <ImageDiv>
                <img src={defaultImg} alt="Default Image" />
            </ImageDiv>
            <Text></Text>
        </LoginDiv>
    );
};

export default Login;
