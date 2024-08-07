import InvitationLinkModal from '@pages/modal/project/InvitationLinkModal';
import { useState } from 'react';
import styled from 'styled-components';

const InviteBtn = () => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const toggleBtn = () => {
        setIsClick(!isClick);
    };

    return (
        <>
            <BtnContainer onClick={toggleBtn}>+초대하기</BtnContainer>
            {isClick && <InvitationLinkModal toggleBtn={toggleBtn} />}
        </>
    );
};
export default InviteBtn;

const BtnContainer = styled.div`
    width: 52px;
    height: 22px;
    display: flex;
    padding: 5px 4px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    background: #633ae2;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
`;
