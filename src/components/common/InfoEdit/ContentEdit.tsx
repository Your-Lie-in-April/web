import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setContent } from '@redux/slice/edit';
import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';

const ContentEdit = () => {
    const dispatch = useAppDispatch();
    const content = useAppSelector((state: RootState) => state.edit.content);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        const lines = inputText.split('\n');
        if (lines.length > 2) {
            return;
        }

        const textarea = textareaRef.current;
        if (textarea && textarea.scrollHeight > textarea.clientHeight) {
            return;
        }

        dispatch(setContent(inputText));
    };

    return (
        <ContentLayout>
            <ContentInput
                value={content}
                ref={textareaRef}
                $focused={isClicked}
                onChange={handleContentChange}
                onFocus={() => setIsClicked(true)}
                onBlur={() => setIsClicked(false)}
                placeholder={isClicked ? '' : '프로젝트 내용을 작성해주세요'}
            />
        </ContentLayout>
    );
};
export default ContentEdit;

const ContentLayout = styled.div`
    margin-top: 8px;
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const ContentInput = styled.textarea<{ $focused: boolean }>`
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

    width: 100%;
    height: 100%;
    white-space: pre-wrap;
`;
