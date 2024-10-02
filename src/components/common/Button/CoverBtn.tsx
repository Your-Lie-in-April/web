import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setCoverClick } from '@redux/slice/mode';
import styled from 'styled-components';

const CoverBtn = () => {
    const dispatch = useAppDispatch();
    const isCoverClick = useAppSelector((state: RootState) => state.mode.isCoverClick);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setCoverClick(!isCoverClick));
    };

    return <CoverButton onClick={handleClick}>커버 만들기</CoverButton>;
};
export default CoverBtn;

const CoverButton = styled.button.attrs({ type: 'button' })`
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
