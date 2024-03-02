import { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Cover from './cover';

interface ContentTextProps {
    isTitleKeyPress: boolean;
    focused: boolean;
}
interface TitleProps {
    keypress: boolean;
}
interface MakeProps {
    isTitleKeyPress: boolean;
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
    position: relative;
`;
const MakeContainer = styled.div`
    width: 1043px;
    height: 164px;
    display: flex;
    justify-content: space-between;
    margin-left: 200px;
`;
const TitleContainer = styled.div`
    width: 820px;
    heigth: 136px;
`;
const Title = styled.div<TitleProps>`
    width: 820px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${({ keypress }) => (keypress ? '1px solid transparent' : '1px solid #000000')};
    border-radius: 70px;
    background-color: ${({ keypress }) => (keypress ? '#ffffff' : 'transparent')};
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
    background-color: transparent;
`;

const Content = styled.div`
    margin-top: 8px;
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const ContentText = styled.textarea<ContentTextProps>`
    color: ${({ isTitleKeyPress, focused }) => (isTitleKeyPress || focused ? '#000000' : '#7d7d7d')};
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
    &:focus {
        outline: none;
        color: #000000;
    }
    &::placeholder {
        color: ${({ isTitleKeyPress }) => (isTitleKeyPress ? '#000000' : '#your_default_color')};
    }
    overflow: hidden;
`;

const Make = styled.button<MakeProps>`
    width: 145px;
    height: 35px;
    border-radius: 40px;
    color: ${({ isTitleKeyPress }) => (isTitleKeyPress ? 'white' : 'black')};
    background-color: ${({ isTitleKeyPress }) => (isTitleKeyPress ? '#633ae2' : '#ffffff')};
    border: 1px solid #000000;
    display: flex;
    font-family: Pretendard;
    white-space: nowrap;
    font-size: ${({ isTitleKeyPress }) => (isTitleKeyPress ? '14px' : '22px')};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
    &: hover {
        border-color: black;
    }
`;
const CoverContainer = styled.div`
    position: absolute;
    top: calc(100%);
    left: 75%;
    transform: translateX(-50%);
    z-index: ;
`;
const Info: FC = () => {
    const [content, setContent] = useState<string>('');
    const [keypress, setIsKeypress] = useState<boolean>(false);
    const [isTitleClicked, setIsTitleClicked] = useState<boolean>(false);
    const [isContentClicked, setIsContentClicked] = useState<boolean>(false);
    const [isTitleKeyPress, setIsTitleKeyPress] = useState<boolean>(false);
    const [isCoverClicked, setIsCoverClicked] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        const limitedText = inputText.slice(0, 58);
        const lines = limitedText.split('\n');
        if (lines.length <= 2) {
            setContent(limitedText);
        }
    };
    const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsKeypress(true);
            setIsTitleKeyPress(true);
        }
    };

    const handleTitleFocus = () => {
        setIsTitleKeyPress(false);
    };

    const toggleCover = () => {
        setIsCoverClicked((prevIsCoverClicked) => !prevIsCoverClicked);
    };

    return (
        <Container>
            <MakeContainer>
                <TitleContainer>
                    <Title keypress={keypress}>
                        <TitleText
                            type="text"
                            onFocus={() => {
                                setIsTitleClicked(true);
                                setIsKeypress(false);
                                handleTitleFocus();
                                setIsCoverClicked(false);
                            }}
                            onBlur={() => {
                                setIsTitleClicked(false);
                                setIsKeypress(true);
                            }}
                            placeholder={isTitleClicked === true ? '' : '프로젝트 제목을 작성해주세요'}
                            onKeyDown={handleTitleKeyPress}
                        ></TitleText>
                    </Title>
                    <Content>
                        <ContentText
                            isTitleKeyPress={isTitleKeyPress}
                            value={content}
                            focused
                            onChange={handleTextareaChange}
                            onFocus={() => setIsContentClicked(true)}
                            onBlur={() => setIsContentClicked(false)}
                            placeholder={isContentClicked === true ? '' : '프로젝트 내용을 작성해주세요'}
                        />
                    </Content>
                </TitleContainer>
                {isTitleKeyPress ? (
                    <Make isTitleKeyPress={isTitleKeyPress}>프로젝트 보관하기</Make>
                ) : (
                    <Make isTitleKeyPress={isTitleKeyPress} onClick={toggleCover}>
                        커버 만들기
                    </Make>
                )}
            </MakeContainer>
            {isCoverClicked && (
                <CoverContainer>
                    <Cover />
                </CoverContainer>
            )}
        </Container>
    );
};

export default Info;
