import TransferAuthModal from '@components/modal/projectModal/TransferAuth';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ModalPortal from '@utils/modalPortal';
import { useState } from 'react';
import styled from 'styled-components';

const MoreBtn = ({
    toggleDeleteBtn,
    showDeleteBtn,
}: {
    toggleDeleteBtn: () => void;
    showDeleteBtn: boolean;
}) => {
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
    const [isAuthClick, setIsAuthClick] = useState<boolean>(false);

    const onIsMoreClick = () => {
        const newIsMoreClick = !isMoreClick;
        setIsMoreClick(newIsMoreClick);

        if (!newIsMoreClick && showDeleteBtn) {
            toggleDeleteBtn();
        }
    };

    const onIsAuthClick = () => {
        if (showDeleteBtn) {
            toggleDeleteBtn();
        }
        setIsAuthClick((prev) => !prev);
    };

    return (
        <EditMemberBtn>
            <MoreHorizIcon sx={{ fontSize: 32 }} onClick={onIsMoreClick} />
            {isMoreClick && (
                <ModalPortal targetId='leader-more-btn'>
                    <MoreDetailDiv>
                        <ContentDiv onClick={toggleDeleteBtn}>
                            <PersonRemoveIcon sx={{ fontSize: 18 }} />
                            <CommonText>멤버수정</CommonText>
                        </ContentDiv>
                        <ContentDiv onClick={onIsAuthClick}>
                            <SyncAltIcon sx={{ fontSize: 18 }} />
                            <CommonText>권한양도</CommonText>
                        </ContentDiv>
                    </MoreDetailDiv>
                </ModalPortal>
            )}
            <TransferAuthModal onIsAuthClick={onIsAuthClick} isAuthClick={isAuthClick} />
        </EditMemberBtn>
    );
};
export default MoreBtn;

const EditMemberBtn = styled.button.attrs({ type: 'button' })`
    background: none;
    color: #000000;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    box-sizing: border-box;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`;

const CommonText = styled.div`
    color: #7d7d7d;
    font-family: 'Pretendard';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
`;

const MoreDetailDiv = styled.div`
    width: 88px;
    height: 38px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    box-sizing: border-box;
    border-radius: 6px;
    background: #ffffff;
    color: #7d7d7d;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;
