import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import styled from 'styled-components';

const plus = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 2C11 0.895431 10.1046 0 9 0C7.89543 0 7 0.89543 7 2V7H2C0.895431 7 0 7.89543 0 9C0 10.1046 0.89543 11 2 11H7V16C7 17.1046 7.89543 18 9 18C10.1046 18 11 17.1046 11 16V11H16C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7H11V2Z"
            fill="white"
        />
    </svg>
);
const CoverContainer = styled.div`
    width: 300px;
    height: 292px;
    display: flex;
    border-radius: 8px;
    background: var(--gray00, #fbfbfb);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ConverInnerContainer = styled.div`
    width: 272px;
    height: 276px;
    padding: 8px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 13px;
`;

const Register = styled.button`
    display: flex;
    width: 82px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 40px;
    background: #633ae2;
    white-space: nowrap;
    color: white;

    &:focus {
        outline: none;
    }
`;

const ColorContainer = styled.div`
    width: 268px;
    height: 62px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 20px;
`;
const ColorChoose = styled.div`
    width: 268px;
    height: 30px;
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;
const Color = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    &:hover {
        cursor: pointer;
    }
`;

const ImageContainer = styled.div`
    width: 272px;
    height: 148px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 20px;
`;
const ImageChoose = styled.div`
    width: 272px;
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;
const Image = styled.button`
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;
const HEXContainer = styled.div`
    width: 300px;
    height: 478px;
    gap: 8px;
    border-radius: 6px;
    background: white;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-top: 8px;
`;
const colors = ['#633AE2', '#FFCB3B', '#64AFF5', '#C2D57A', '#EB5757', '#212121'];

interface CoverProps {
    onColorSelect: (color: string) => void;
    onImageSelect: (url: string, id: string) => void;
    onHexSelect: (color: string) => void;
    title?: string;
    content?: string;
    projectData?: ProjectEntity | null;
    setEditCover?: Dispatch<SetStateAction<boolean>>;
    imgId?: string;
}
interface ApiResponseItem {
    id: string;
    url: string;
}

const CoverEdit: FC<CoverProps> = ({
    onColorSelect,
    onImageSelect,
    onHexSelect,
    title,
    content,
    projectData,
    imgId,
}) => {
    const [color, setColor] = useState(projectData?.color || '');
    const [openHex, setOpenHex] = useState<boolean>(false);
    const [images, setImages] = useState<ApiResponseItem[]>([]);
    const accessToken = localStorage.getItem('access_token');
    const coverImg = async () => {
        const response = await fetch(`${Http}/v1/covers?page=0&size=10`, {
            method: 'GET',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setImages(data.data);

        console.log('배경사진', data.data);
    };

    useEffect(() => {
        coverImg();
        coverImg().catch((error) => console.error('Fetching URLs failed:', error));
    }, []);

    const handleColorClick = (color: string) => {
        setColor(color);
        onColorSelect(color);
    };
    const handleImageClick = (url: string, id: string) => {
        onImageSelect(url, id);
    };

    const handleColorChange = useCallback(
        (color: ColorResult) => {
            let hexCode = color.hex;
            if (color.rgb.a !== 1) {
                hexCode = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            }
            setColor(hexCode);
            onHexSelect(hexCode);
        },
        [onHexSelect]
    );

    const toggleHex = () => {
        setOpenHex((prev) => !prev);
    };
    const updateProject = async () => {
        const accessToken = localStorage.getItem('access_token');
        const effectiveTitle = title || projectData?.title;
        const effectiveDescription = content || projectData?.description;
        const effectiveColor = color || projectData?.color;
        const effectiveCoverImageId = imgId || projectData?.coverImageId;

        const payload = {
            title: effectiveTitle,
            description: effectiveDescription,
            color: effectiveColor,
            coverImageId: effectiveCoverImageId,
            startDate: projectData?.startDate,
            endDate: projectData?.endDate,
            daysOfWeek: projectData?.daysOfWeek,
            isStored: projectData?.isStored,
        };
        console.log(payload);
        try {
            const response = await fetch(Http + `/v1/projects/${projectData?.projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update the project');
            }

            const jsonResponse = await response.json();
            console.log('Project updated:', jsonResponse);
            window.location.reload();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    return (
        <CoverContainer>
            <ConverInnerContainer>
                <Register style={{ fontSize: '18px' }} onClick={updateProject}>
                    커버등록
                </Register>
                <ColorContainer>
                    단색
                    <ColorChoose>
                        {colors.map((color, index) => (
                            <Color
                                key={index}
                                style={{ background: color }}
                                onClick={() => handleColorClick(color)}
                            ></Color>
                        ))}
                        <Color
                            style={{
                                background: '#ffffff',
                                border: '1px solid black',
                            }}
                            onClick={() => handleColorClick('#ffffff')}
                        />
                        <Color style={{ background: '#D9D9D9' }} onClick={toggleHex}>
                            {plus}
                        </Color>
                    </ColorChoose>
                </ColorContainer>
                <ImageContainer>
                    이미지
                    <ImageChoose>
                        {images.length > 0 ? (
                            images.map((item) => (
                                <Image
                                    key={item.id}
                                    style={{
                                        backgroundImage: `url('${item.url}')`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                    onClick={() => handleImageClick(item.url, item.id)}
                                ></Image>
                            ))
                        ) : (
                            <p>이미지를 불러오는 중입니다...</p>
                        )}
                    </ImageChoose>
                </ImageContainer>
            </ConverInnerContainer>
            {openHex ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '252px',
                        marginLeft: '8px',
                        marginTop: '37px',
                    }}
                >
                    <ChromePicker
                        disableAlpha={false}
                        color={color}
                        onChange={(selectedColor) => handleColorChange(selectedColor)}
                    />
                </div>
            ) : null}
        </CoverContainer>
    );
};
export default CoverEdit;
