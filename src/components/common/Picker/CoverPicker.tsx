import useCoverImgQuery from '@hooks/apis/queries/project/useCoverImgQuery';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setColor, setCoverImageId, setImg } from '@redux/slice/edit';
import { useCallback, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import styled from 'styled-components';

const CoverPicker = () => {
    const dispatch = useAppDispatch();
    const color = useAppSelector((state: RootState) => state.edit.color);

    const singleColors = ['#633AE2', '#FFCB3B', '#64AFF5', '#C2D57A', '#EB5757', '#212121'];
    const [openHex, setOpenHex] = useState<boolean>(false);
    const { data: images } = useCoverImgQuery();

    const handleColorClick = (selectedColor: string) => {
        dispatch(setColor(selectedColor));
        dispatch(setCoverImageId(''));
        dispatch(setImg(''));
    };

    const handleImageClick = (coverImageId: string, img: string) => {
        dispatch(setCoverImageId(coverImageId));
        dispatch(setImg(img));
        dispatch(setColor(''));
        setOpenHex(false);
    };

    const handleColorChange = useCallback(
        (color: ColorResult) => {
            let hexCode = color.hex;
            if (color.rgb.a !== 1) {
                hexCode = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            }
            dispatch(setColor(hexCode));
            dispatch(setCoverImageId(''));
            dispatch(setImg(''));
        },
        [dispatch]
    );

    return (
        <CoverContainer>
            <ConverInnerContainer>
                <ColorContainer>
                    단색
                    <ColorChoose>
                        <Color onClick={() => setOpenHex(true)}>
                            <AddCircleRoundedIcon sx={{ fontSize: '36px', color: '#D9D9D9' }} />
                        </Color>
                        {singleColors.map((color, index) => (
                            <Color
                                key={index}
                                style={{ background: color }}
                                onClick={() => {
                                    handleColorClick(color);
                                    setOpenHex(false);
                                }}
                            />
                        ))}
                        <Color
                            onClick={() => {
                                handleColorClick('#ffffff');
                                setOpenHex(false);
                            }}
                            style={{ border: '1px solid #000000' }}
                        />
                    </ColorChoose>
                </ColorContainer>
                <ImageContainer>
                    이미지
                    <ImageChoose>
                        {images?.data.map((item) => (
                            <Image
                                key={item.id}
                                $thumbnailUrl={item.thumbnailUrl}
                                onClick={() => handleImageClick(item.id, item.coverImageUrl)}
                            />
                        ))}
                    </ImageChoose>
                </ImageContainer>
            </ConverInnerContainer>
            {openHex && (
                <PickerWrapper>
                    <ChromePicker
                        color={color}
                        disableAlpha={false}
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
    height: 250px;
    display: flex;
    gap: 8px;
    padding-top: 10px;
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

const Color = styled.button.attrs({ type: 'button' })`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffff;
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

const Image = styled.div<{ $thumbnailUrl: string }>`
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    background-image: ${({ $thumbnailUrl }) => `url(${$thumbnailUrl})`};
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
