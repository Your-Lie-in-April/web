import { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

interface ContentTextProps {
    focused: boolean;
}

const Container = styled.div`
    width: 1920px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #000000;
    margin-top: 16px;
    margin-bottom: 16px;
`;

const Title = styled.div`
    margin-top: 32px;
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
    width: 730px;
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
    margin-top: 8px;
    display: flex;
    width: 828px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const ContentText = styled.textarea<ContentTextProps>`
    color: ${({ focused }) => (focused ? '#000000' : '#7d7d7d')};
    color: #7d7d7d;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    width: 1500px;
    font-weight: 400;
    line-height: normal;
    border: transparent;
    outline: none;
    resize: none;
    max-height: 68px;
    &:focus {
        outline: none;
        color: #000000;
    }
    overflow: hidden;
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
    const [content, setContent] = useState<string>('');
    const [isTitleClicked, setIsTitleClicked] = useState<boolean>(false);
    const [isContentClicked, setIsContentClicked] = useState<boolean>(false);
    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        const limitedText = inputText.slice(0, 58);
        const lines = limitedText.split('\n');
        if (lines.length <= 2) {
            setContent(limitedText);
        }
    };

    return (
        <Container>
            <Title style={{ marginTop: '16px;' }}>
                <TitleText
                    type="text"
                    onFocus={() => setIsTitleClicked(true)}
                    onBlur={() => setIsTitleClicked(false)}
                    placeholder={isTitleClicked === true ? '' : '프로젝트 제목을 작성해주세요'}
                ></TitleText>
            </Title>
            <Content>
                <ContentText
                    value={content}
                    focused
                    onChange={handleTextareaChange}
                    onFocus={() => setIsContentClicked(true)}
                    onBlur={() => setIsContentClicked(false)}
                    placeholder={isContentClicked === true ? '' : '프로젝트 내용을 작성해주세요'}
                />
            </Content>
            <Make>커버만들기</Make>
        </Container>
    );
};

export default Info;
