import useCoverImgQuery from '@hooks/apis/queries/project/useCoverImgQuery';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { FC, useCallback, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import styled from 'styled-components';

const colors = ['#633AE2', '#FFCB3B', '#64AFF5', '#C2D57A', '#EB5757', '#212121'];

interface CoverPickerProps {
    onColorSelect: (color: string) => void;
    onImageSelect: (id: string, coverImageUrl: string) => void;
    onHexSelect: (color: string) => void;
    toggleCover: () => void;
}

const CoverPicker: FC<CoverPickerProps> = ({
    onColorSelect,
    onImageSelect,
    onHexSelect,
    toggleCover,
}) => {
    const [color, setColor] = useState('#ffffff');
    const [openHex, setOpenHex] = useState<boolean>(false);
    const { data: images } = useCoverImgQuery();

    const handleColorClick = (color: string) => {
        setColor(color);
        onColorSelect(color);
    };

    const handleImageClick = (id: string, coverImageUrl: string) => {
        onImageSelect(id, coverImageUrl);
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

    return (
        <CoverContainer>
            <ConverInnerContainer>
                <Register onClick={toggleCover}>커버등록</Register>
                <ColorContainer>
                    단색
                    <ColorChoose>
                        <Color onClick={toggleHex}>
                            <AddCircleRoundedIcon sx={{ fontSize: '36px', color: '#D9D9D9' }} />
                        </Color>
                        {colors.map((color, index) => (
                            <Color
                                key={index}
                                style={{ background: color }}
                                onClick={() => handleColorClick(color)}
                            />
                        ))}
                        <Color
                            style={{
                                background: '#ffffff',
                                border: '1px solid black',
                            }}
                            onClick={() => handleColorClick('#ffffff')}
                        />
                    </ColorChoose>
                </ColorContainer>
                <ImageContainer>
                    이미지
                    <ImageChoose>
                        {images ? (
                            images.data.map((item) => (
                                <Image
                                    key={item.id}
                                    style={{
                                        backgroundImage: `url('${item.thumbnailUrl}')`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                    onClick={() => handleImageClick(item.id, item.coverImageUrl)}
                                />
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </ImageChoose>
                </ImageContainer>
            </ConverInnerContainer>
            {openHex && (
                <PickerWrapper>
                    <ChromePicker
                        disableAlpha={false}
                        color={color}
                        onChange={(selectedColor) => handleColorChange(selectedColor)}
                        styles={{
                            default: {
                                picker: {
                                    borderRadius: '6px',
                                },
                            },
                        }}
                    />
                </PickerWrapper>
            )}
        </CoverContainer>
    );
};

export default CoverPicker;

const CoverContainer = styled.div`
    width: 300px;
    height: 292px;
    gap: 8px;
    border-radius: 8px;
    background: var(--gray00, #fbfbfb);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
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

const Register = styled.div`
    display: flex;
    width: 82px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    gap: 8px;
    border-radius: 40px;
    background: #633ae2;
    white-space: nowrap;
    color: white;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 18px;

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
    display: flex;
    justify-content: center;
    align-items: center;
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
    row-gap: 8px;
`;

const Image = styled.div`
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
`;

const PickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 252px;
    position: absolute;
    right: calc(100% + 8px);
    bottom: 0;
`;
