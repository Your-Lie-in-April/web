import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 1920px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #000000;
`;

const Title = styled.div`
    margin-top: 20px;
    width: 820px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000000;
    border-radius: 70px;
    ::placeholder {
        color: black;
    }
`;
const TitleText = styled.input`
    display: flex;
    width: 765px;
    padding: 8px;
    font-weight: bold;
    font-size: 32px;
    font-family: Pretendard;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;
    border: transparent;
    color: black;
    outline: none;
    &:focus {
        outline: none;
    }
`;

const Content = styled.div`
    display: flex;
    width: 828px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const ContentText = styled.input`
    color: #7d7d7d;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: transparent;
    //color: ${(props) => (props.value ? '#000000' : '#7d7d7d')};
    outline: none;

    &:focus {
        outline: none;
    }
`;

const Make = styled.div`
    width: 145px;
    height: 35px;
    border-radius: 40px;
    background-color: #ffffff;
    border: 1px solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 13px;
    margin-left: 1150px;
`;

const Info: FC = () => {
    return (
        <Container>
            <Title>
                <TitleText type="text" placeholder="프로젝트 제목을 작성해주세요"></TitleText>
            </Title>
            <Content>
                <ContentText type="text" placeholder="프로젝트 내용을 작성해주세요"></ContentText>
            </Content>
            <Make>커버만들기</Make>
        </Container>
    );
};

export default Info;
