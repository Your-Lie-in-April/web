import useClickOutside from '@hooks/useClickOutside';
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';
import CoverPicker from './CoverPicker';

interface InfoProps {
    setContent: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setColor: Dispatch<SetStateAction<string>>;
    setImg: Dispatch<SetStateAction<string>>;
    setImgId: Dispatch<SetStateAction<string>>;
}

const Info: FC<InfoProps> = ({ setContent, setTitle, setColor, setImg, setImgId }) => {
    const [isTitleClicked, setIsTitleClicked] = useState<boolean>(false);
    const [isContentClicked, setIsContentClicked] = useState<boolean>(false);
    const [isCoverClicked, setIsCoverClicked] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedHex, setSelectedHex] = useState<string | null>(null);

    const coverPickerRef = useRef<HTMLDivElement>(null);

    useClickOutside(coverPickerRef, () => {
        if (isCoverClicked) {
            setIsCoverClicked(false);
        }
    });

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        const limitedText = inputText.slice(0, 58);
        const lines = limitedText.split('\n');
        if (lines.length <= 2) {
            setContent(limitedText);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const toggleCover = () => {
        setIsCoverClicked((prevIsCoverClicked) => !prevIsCoverClicked);
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setSelectedImageUrl(null);
        setSelectedHex(null);
        setColor(color);
        setImg('');
        setImgId('');
    };

    const handleImageSelect = (id: string, coverImageUrl: string) => {
        setSelectedImageUrl(coverImageUrl);
        setSelectedColor(null);
        setSelectedHex(null);
        setImg(coverImageUrl);
        setImgId(id);
        setColor('');
    };

    const handleHexSelect = (color: string) => {
        setSelectedColor(null);
        setSelectedImageUrl(null);
        setSelectedHex(color);
        setColor(color);
        setImg('');
        setImgId('');
    };

    return (
        <Container
            $selectedColor={selectedColor}
            $selectedHex={selectedHex}
            $selectedImageUrl={selectedImageUrl}
        >
            <MakeContainer>
                <TitleContainer>
                    <Title>
                        <TitleText
                            type='text'
                            onFocus={() => {
                                setIsTitleClicked(true);
                                setIsCoverClicked(false);
                            }}
                            onBlur={() => {
                                setIsTitleClicked(false);
                            }}
                            onChange={handleTitleChange}
                            placeholder={isTitleClicked ? '' : '프로젝트 제목을 작성해주세요'}
                        />
                    </Title>
                    <Content>
                        <ContentText
                            $focused={isContentClicked}
                            onChange={handleTextareaChange}
                            onFocus={() => setIsContentClicked(true)}
                            onBlur={() => setIsContentClicked(false)}
                            placeholder={isContentClicked ? '' : '프로젝트 내용을 작성해주세요'}
                        />
                    </Content>
                </TitleContainer>
                <div style={{ position: 'relative' }}>
                    <Make onClick={toggleCover}>커버 만들기</Make>
                    {isCoverClicked && (
                        <PickerWrapper ref={coverPickerRef}>
                            <CoverPicker
                                onColorSelect={handleColorSelect}
                                onImageSelect={handleImageSelect}
                                onHexSelect={handleHexSelect}
                                toggleCover={toggleCover}
                            />
                        </PickerWrapper>
                    )}
                </div>
            </MakeContainer>
        </Container>
    );
};

export default Info;

interface ContainerProps {
    $selectedColor: string | null;
    $selectedHex: string | null;
    $selectedImageUrl: string | null;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-bottom: 1px solid #000000;
    position: relative;
    z-index: 5;
    background-color: ${(props) => props.$selectedColor || props.$selectedHex || 'white'};
    background-image: url('${(props) => props.$selectedImageUrl}');
    background-size: cover;
    background-position: center;
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
    height: 136px;
`;

const Title = styled.div`
    width: 820px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000000;
    border-radius: 70px;
    background-color: white;
`;

const TitleText = styled.input`
    display: flex;
    width: 730px;
    padding: 8px;
    font-weight: bold;
    font-size: 32px;
    font-family: 'Pretendard';
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;
    border: transparent;
    color: black;
    outline: none;
    background-color: white;
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

const ContentText = styled.textarea<{ $focused: boolean }>`
    color: ${({ $focused }) => ($focused ? '#000000' : '#7d7d7d')};
    text-align: center;
    font-family: 'Pretendard';
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
    position: relative;
`;

const Make = styled.button.attrs({ type: 'button' })`
    width: 145px;
    height: 35px;
    border-radius: 40px;
    background-color: #ffffff;
    border: 1px solid #000000;
    display: flex;
    font-family: 'Pretendard';
    white-space: nowrap;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
    color: #000000;

    &:hover {
        border-color: black;
    }

    &:focus {
        border: 1px solid #000000;
    }

    &:active {
        border: 1px solid #000000;
    }
`;

const PickerWrapper = styled.div`
    position: absolute;
    right: 0px;
    top: 182px;
`;
