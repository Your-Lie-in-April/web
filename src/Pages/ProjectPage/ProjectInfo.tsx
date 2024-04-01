import { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Cover from '../ProjectMakePage/cover';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
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
const Title = styled.div`
    width: 820px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const ContentText = styled.textarea<ContentTextProps>`
    color: ${(props) => (props.focused ? 'black' : 'inherit')}; /* focused 여부에 따라 글자색 변경 */
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
    overflow: hidden;
    background-color: transparent;
    &:: placeholder {
        color: black;
    }
`;

const Make = styled.button`
    width: 145px;
    height: 35px;
    border-radius: 40px;
    background-color: #ffffff;
    border: 1px solid #000000;
    display: flex;
    font-family: Pretendard;
    white-space: nowrap;
    font-size: 22px;
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
    z-index: 5;
`;
const SettingDiv = styled.div`
    position: absolute;
    bottom: 16px;
    right: 319.5px;
    width: 221px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    border-radius: 20px;
    background: #633ae2;
    box-sizing: border-box;
    border: 1px solid black;
`;

const SettingBtn = styled.button`
    color: #ffffff;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    gap: 4px;

    border-radius: 20px;
    padding: 0;
    margin: 0;
    background: transparent;
    box-sizing: border-box;
`;
const ProjectInfo: FC = () => {
    const [content, setContent] = useState<string>('');
    const [isTitleClicked, setIsTitleClicked] = useState<boolean>(false);
    const [isContentClicked, setIsContentClicked] = useState<boolean>(false);
    const [isCoverClicked, setIsCoverClicked] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedHex, setSelectedHex] = useState<string | null>(null);

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        const limitedText = inputText.slice(0, 58);
        const lines = limitedText.split('\n');
        if (lines.length <= 2) {
            setContent(limitedText);
        }
    };

    const toggleCover = () => {
        setIsCoverClicked((prevIsCoverClicked) => !prevIsCoverClicked);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setSelectedImageUrl(null);
        setSelectedHex(null);
    };

    const handleImageSelect = (url: string) => {
        setSelectedImageUrl(url);
        setSelectedColor(null);
        setSelectedHex(null);
    };

    const handleHexSelect = (color: string) => {
        setSelectedColor(null);
        setSelectedImageUrl(null);
        setSelectedHex(color);
    };

    return (
        <Container
            style={{
                backgroundColor: selectedColor || selectedHex || '#d9d9d9',
                backgroundImage: `url('${selectedImageUrl}')`,
            }}
        >
            <MakeContainer>
                <TitleContainer>
                    <Title>
                        <TitleText
                            style={{ backgroundColor: selectedColor || selectedHex || '#d9d9d9' }}
                            type="text"
                            onFocus={() => {
                                setIsTitleClicked(true);

                                setIsCoverClicked(false);
                            }}
                            onBlur={() => {
                                setIsTitleClicked(false);
                            }}
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
                </TitleContainer>
                <SettingDiv>
                    <SettingBtn onClick={toggleCover}>
                        <BorderColorOutlinedIcon style={{ fontSize: '18px' }} />
                        커버 수정
                    </SettingBtn>
                    <SettingBtn>
                        <InboxOutlinedIcon style={{ fontSize: '18px' }} />
                        프로젝트 보관
                    </SettingBtn>
                </SettingDiv>
            </MakeContainer>
            {isCoverClicked && (
                <CoverContainer>
                    <Cover
                        onColorSelect={handleColorSelect}
                        onImageSelect={handleImageSelect}
                        onHexSelect={handleHexSelect}
                    />
                </CoverContainer>
            )}
        </Container>
    );
};

export default ProjectInfo;
