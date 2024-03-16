import { FC } from 'react';
import styled from 'styled-components';

const AfterLoginDiv = styled.div`
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
    line-height: 38px;
    margin-top: 49px;
    margin-left: 873.5px;
    margin-bottom: 13px;
`;
const LogIn = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 550;
    font-size: 22px;
    margin-top: 55px;
    margin-bottom: 21px;
`;
const AfterLogin: FC = () => {
    return (
        <AfterLoginDiv>
            <Logo>TIME PIECE</Logo>
            <div style={{ marginLeft: '493.17px' }}>
                <LogIn>Log in</LogIn>
            </div>
        </AfterLoginDiv>
    );
};
export default AfterLogin;
