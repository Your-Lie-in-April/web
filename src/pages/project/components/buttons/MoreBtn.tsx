import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TransferAuthModal from '@pages/modal/project/TransferAuth';
import ModalPortal from '@utils/ModalPotal';
import { useLayoutEffect, useRef, useState } from 'react';
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
    const moreRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const onIsMoreClick = () => {
        const newIsMoreClick = !isMoreClick;
        setIsMoreClick(newIsMoreClick);

        if (!newIsMoreClick && showDeleteBtn) {
            toggleDeleteBtn();
        }
    };

    const onIsAuthClick = () => {
        setIsAuthClick((prev) => !prev);
    };

    const updatePosition = () => {
        if (moreRef.current) {
            const { bottom, right } = moreRef.current.getBoundingClientRect();
            setPosition({ top: bottom - 14, left: right - 31 });
        }
    };

    useLayoutEffect(() => {
        updatePosition();

        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, []);

    return (
        <EditMemberBtn ref={moreRef}>
            <MoreHorizIcon sx={{ fontSize: 32 }} onClick={onIsMoreClick} />
            {isMoreClick && (
                <ModalPortal>
                    <MoreDetailDiv style={{ top: position.top, left: position.left }}>
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
    justify-content: center;
    position: relative;
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
    position: absolute;
    top: calc(100% + 8px);
    right: -55px;
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;
