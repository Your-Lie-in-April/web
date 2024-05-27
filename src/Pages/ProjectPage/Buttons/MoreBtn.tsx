import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {  useRef, useState, useLayoutEffect } from 'react';
import TransferAuthModal from '#/Pages/Modal/TransferAuth';
import ModalPortal from '#/utils/ModalPotal';

const EditMemberBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:focus {
        outline: none;
    }
`;

const CommonText = styled.div`
    color: #7d7d7d;
    font-family: Pretendard;
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
    z-index: 10;
    position: absolute;
    top: calc(100% + 8px);
    right: -55px;
`;

const MoreBtn = () => {
    const [isMoreClick, setIsMoreClick] = useState<boolean>(false);
    const [isAuthClick, setIsAuthClick] = useState<boolean>(false);
    const moreRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const onIsMoreClick = () => {
        setIsMoreClick(!isMoreClick);
    };

    const onIsAuthClick = () => {
        setIsAuthClick((prev) => !prev);
    };

    const updatePosition = () => {
        if (moreRef.current) {
            const { bottom, right } = moreRef.current.getBoundingClientRect();
            setPosition({ top: bottom - 10, left: right - 31 });
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
                    <MoreDetailDiv
                        style={{ top: position.top, left: position.left }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <PersonRemoveIcon sx={{ fontSize: 18 }} />
                            <CommonText>멤버수정</CommonText>
                        </div>
                        <div
                            onClick={onIsAuthClick}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <SyncAltIcon sx={{ fontSize: 18 }} />
                            <CommonText>권한양도</CommonText>
                        </div>
                    </MoreDetailDiv>
                </ModalPortal>
            )}
            {isAuthClick && <TransferAuthModal onIsAuthClick={onIsAuthClick} />}
        </EditMemberBtn>
    );
};

export default MoreBtn;
