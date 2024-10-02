import useClickOutside from '@hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setCoverClick } from '@redux/reducers/mode';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { CoverBtn } from '../Button';
import BackBtn from '../Button/BackBtn';
import { CoverPicker } from '../Picker';
import ContentEdit from './ContentEdit';
import TitleEdit from './TitleEdit';

const InfoEdit = () => {
    const { color, img } = useAppSelector((state: RootState) => state.edit);
    const { isCoverClick, isEdit } = useAppSelector((state: RootState) => state.mode);
    const dispatch = useAppDispatch();

    const pickerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = useCallback(() => {
        if (isCoverClick) {
            dispatch(setCoverClick(false));
        }
    }, [dispatch, isCoverClick]);

    useClickOutside(pickerRef, handleOutsideClick, buttonRef);

    return (
        <InfoEditLayout $selectedColor={color} $selectedImageUrl={img}>
            <InfoEditBox>
                {isEdit ? <BackBtn /> : <div style={{ width: '145px' }} />}
                <EditBox>
                    <TitleEdit />
                    <ContentEdit />
                </EditBox>
                <ClickAreaBox>
                    <div ref={buttonRef}>
                        <CoverBtn />
                    </div>
                    {isCoverClick && (
                        <PickerWrapper ref={pickerRef}>
                            <CoverPicker />
                        </PickerWrapper>
                    )}
                </ClickAreaBox>
            </InfoEditBox>
        </InfoEditLayout>
    );
};
export default InfoEdit;

const InfoEditLayout = styled.div<{
    $selectedColor: string | null;
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
    background-color: ${(props) => props.$selectedColor || '#ffffff'};
    background-image: ${(props) =>
        props.$selectedImageUrl ? `url('${props.$selectedImageUrl}')` : 'none'};
    background-size: cover;
    background-position: center;
`;

const InfoEditBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 80px;
`;

const EditBox = styled.div`
    width: 820px;
    height: 136px;
`;

const ClickAreaBox = styled.div`
    position: relative;
`;

const PickerWrapper = styled.div`
    position: absolute;
    right: 0px;
    top: 181.5px;
`;
