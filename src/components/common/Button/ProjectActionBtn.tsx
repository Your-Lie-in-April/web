import { useProjectPostOrPut } from '@hooks/useProjectPostOrPut';
import { useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import styled from 'styled-components';

const MakeBtn = () => {
    const { isEdit } = useAppSelector((state: RootState) => state.mode);
    const { actionProject } = useProjectPostOrPut();

    return (
        <BtnLayout onClick={actionProject}>
            <BtnText>{isEdit ? '수정 완료' : '프로젝트 만들기'}</BtnText>
        </BtnLayout>
    );
};

export default MakeBtn;

const BtnLayout = styled.button.attrs({ type: 'button' })`
    max-width: 289px;
    height: 62px;
    padding: 12px 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    background: #633ae2;
    white-space: nowrap;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background: #5229d2;
    }
`;

const BtnText = styled.span`
    color: #ffffff;
    text-align: center;
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
