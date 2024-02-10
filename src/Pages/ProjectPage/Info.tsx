import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 1920px;
    height: 200px;
    background-color: #ffffff;
    border: 1px solid #000000;
`;

const Title = styled.div`
    width: 820px;
    height: 70px;
    border: 1px solid #000000;
    border-radius: 70px;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    font-family: Pretendard;
`;

const Content = styled.div`
    width: 820px;
    height: 34px;
    color: #7d7d7d;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Make = styled.div`
    width: 145px;
    height: 35px;
    border-radius: 40px;
    background-color: #ffffff;
    border: 1px solid #000000;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    font-family: Pretendard;
`;

const Info: FC = () => {
    return (
        <Container>
            <Title>프로젝트 제목을 작성해주세요</Title>
            <Content>프로젝트 내용을 작성해주세요</Content>
            <Make>커버만들기</Make>
        </Container>
    );
};

export default Info;
