import { FC } from 'react';
import styled from 'styled-components';

const BeforeLoginDiv = styled.div`
    width: 1920px;
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
    font-weight: 500;
    font-size: 22px;
    margin-right: 319.33px;
    margin-top: 55px;
    margin-bottom: 19px;
`;

const BeforeLogin: FC = () => {
    return (
        <BeforeLoginDiv>
            <Logo>TIME PIECE</Logo>
            <LogIn>Log in</LogIn>
        </BeforeLoginDiv>
    );
};
export default BeforeLogin;
