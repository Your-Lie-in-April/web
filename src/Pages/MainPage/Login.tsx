import { FC } from 'react';
import styled from 'styled-components';

const defaultImg = 'src/pics/default.png';
const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 312px;
    height: 218px;
    border-radius: 10px;
    background-color: #ffffff;
    position: absolute;
    top: 470px;
`;

const ImageDiv = styled.div`
    width: 112px;
    height: 112px;
    margin-top: 16px;
`;

const Text = styled.div`
    font-family: 'pretendard';
    font-weight: 500;
    font-size: 14px;
    color: #a4a4a4;
    margin-top: 12px;
`;

const Login: FC = () => {
    return (
        <LoginDiv>
            <ImageDiv>
                <img src={defaultImg} alt="Default Image" />
            </ImageDiv>
            <Text>로그인 되어 있지 않음</Text>
        </LoginDiv>
    );
};

export default Login;
