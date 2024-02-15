import { FC } from 'react';
import styled from 'styled-components';

const AfterLoginDiv = styled.div`
    width: 100%;
    height: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
`;
const Logo = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    width: 173px;
    font-size: 32px;
    margin-top: 49px;
    margin: auto;
    margin-bottom: 13px;
`;
const LogIn = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 800;
    font-size: 22px;
    margin-right: 319.41px;
    margin-top: 55px;
    margin-bottom: 19px;
`;

const AfterLogin: FC = () => {
    return (
        <AfterLoginDiv>
            <Logo>TIME PIECE</Logo>
            <LogIn>My page</LogIn>
        </AfterLoginDiv>
    );
};
export default AfterLogin;
