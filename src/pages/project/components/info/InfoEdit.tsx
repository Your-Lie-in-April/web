import { useProjectContext } from '@hooks/context/projectContext';
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectCoverPicker from './ProjectCoverPicker';

interface InfoEditProps {
    setEditMode: Dispatch<SetStateAction<boolean>>;
    onEditComplete: () => void;
}

const InfoEdit: FC<InfoEditProps> = ({ setEditMode, onEditComplete }) => {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [isTitleClicked, setIsTitleClicked] = useState<boolean>(false);
    const [isContentClicked, setIsContentClicked] = useState<boolean>(false);
    const [isCoverClicked, setIsCoverClicked] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedHex, setSelectedHex] = useState<string | null>(null);
    const [selectedImgId, setSelectedImageId] = useState<string>('');

    const { projectData } = useProjectContext();

    useEffect(() => {
        if (projectData) {
            setTitle(projectData.title);
            setContent(projectData.description);
            setSelectedColor(projectData.color || '');
            setSelectedImageUrl(projectData?.coverInfo?.coverImageUrl || '');
            setSelectedImageId(String(projectData?.coverInfo?.id) || '');
        }
    }, [projectData]);

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
    };

    const handleImageSelect = (id: string, coverImageUrl: string) => {
        setSelectedImageUrl(coverImageUrl);
        setSelectedColor(null);
        setSelectedHex(null);
        setSelectedImageId(id);
    };

    const handleHexSelect = (color: string) => {
        setSelectedColor(null);
        setSelectedImageUrl(null);
        setSelectedHex(color);
    };

    return (
        <Container
            $selectedColor={selectedColor}
            $selectedHex={selectedHex}
            $selectedImageUrl={selectedImageUrl}
        >
            <MakeContainer>
                <TextContainer>
                    <Title>
                        <TitleText
                            type='text'
                            onFocus={(e) => {
                                e.stopPropagation();
                                setIsTitleClicked(true);
                                setIsCoverClicked(false);
                            }}
                            onBlur={() => {
                                setIsTitleClicked(false);
                            }}
                            onChange={handleTitleChange}
                            placeholder={isTitleClicked === true ? '' : `${projectData?.title}`}
                        ></TitleText>
                    </Title>
                    <Content>
                        <ContentText
                            value={isContentClicked ? content : ''}
                            $focused={isContentClicked}
                            onChange={handleTextareaChange}
                            onFocus={(e) => {
                                e.stopPropagation();
                                setIsContentClicked(true);
                                setIsCoverClicked(false);
                                setContent('');
                            }}
                            onBlur={() => setIsContentClicked(false)}
                            placeholder={
                                isContentClicked === true ? '' : `${projectData?.description}`
                            }
                        />
                    </Content>
                </TextContainer>
                <BtnWrapper>
                    <MakeBtn
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleCover();
                        }}
                    >
                        커버 만들기
                    </MakeBtn>
                    {isCoverClicked && (
                        <PickerWrapper>
                            <ProjectCoverPicker
                                setEditMode={setEditMode}
                                projectData={projectData}
                                title={title}
                                content={content}
                                onColorSelect={handleColorSelect}
                                onImageSelect={handleImageSelect}
                                onHexSelect={handleHexSelect}
                                imgId={selectedImgId}
                                onEditComplete={onEditComplete}
                            />
                        </PickerWrapper>
                    )}
                </BtnWrapper>
            </MakeContainer>
        </Container>
    );
};

export default InfoEdit;

interface ContentTextProps {
    $focused: boolean;
}

const Container = styled.div<{
    $selectedColor: string | null;
    $selectedHex: string | null;
    $selectedImageUrl: string | null;
}>`
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
const TextContainer = styled.div`
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
    ::placeholder {
        color: black;
    }
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

const ContentText = styled.textarea<ContentTextProps>`
    color: ${({ $focused }) => ($focused ? '#000000' : '#7d7d7d')};
    color: #7d7d7d;
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

const BtnWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const MakeBtn = styled.div`
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
    align-self: flex-end;

    color: #000000;
    cursor: pointer;

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
    top: 182.5px;
`;
