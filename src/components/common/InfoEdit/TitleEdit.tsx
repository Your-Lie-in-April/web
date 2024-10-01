import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setTitle } from '@redux/reducers/edit';
import { useState } from 'react';
import styled from 'styled-components';

const TitleEdit = () => {
    const dispatch = useAppDispatch();
    const title = useAppSelector((state: RootState) => state.edit.title);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(e.target.value));
    };

    return (
        <TitleLayout>
            <TitleInput
                type='text'
                value={title}
                maxLength={40}
                onFocus={() => setIsClicked(true)}
                onBlur={() => setIsClicked(false)}
                onChange={handleTitleChange}
                placeholder={isClicked ? '' : '프로젝트 제목을 작성해주세요'}
            />
        </TitleLayout>
    );
};
export default TitleEdit;

const TitleLayout = styled.div`
    width: 820px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000000;
    border-radius: 70px;
    background-color: #ffffff;
`;

const TitleInput = styled.input`
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
    background-color: #ffffff;

    &:focus {
        outline: none;
    }
`;
