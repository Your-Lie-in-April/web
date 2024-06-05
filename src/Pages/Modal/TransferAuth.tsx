import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';
import ModalPortal from '#/utils/ModalPotal';
import useScrollLock from '#/utils/useScrollLock';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from './ModalCommon';

const Box = styled.div`
    width: 406px;
    min-height: 181px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0px 8px 0px;
    box-sizing: border-box;
`;

const InfoCircleIcon = styled(InfoOutlinedIcon)`
    width: 32px;
    height: 32px;
    color: #eb5757;
`;

const MemPickDiv = styled.div`
    width: 208px;
    height: 32px;
    padding: 4px;
    display: flex;
    gap: 12px;
    box-sizing: border-box;
    color: #000000;
    font-size: 20px;
    text-align: center;
    position: relative;
`;

export const MemDropdown = styled.div`
    width: 194px;
    max-height: 124px;
    border-radius: 5px;
    background: #f5f5f5;
    z-index: 3;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: absolute;
    top: 30px;
    right: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar {
        display: none;
    }

    li {
        list-style: none;
        width: 100%;
        height: 30px;
        text-align: center;
        color: #7d7d7d;
    }

    li:hover {
        background: #633ae2;
        color: #ffffff;
    }
`;

const CommonText = styled.text`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const MemberNick = styled(CommonText)`
    font-size: 20px;
`;

const Button = styled.button`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    border: none;

    &:focus {
        outline: none;
    }
`;

const ConfirmBtn = styled(Button)`
    background: #633ae2;
    color: #ffffff;
`;

const CancelBtn = styled(Button)`
    background: #d9d9d9;
    color: #ffffff;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 4px;
`;

interface TransferAuthModalProps {
    isAuthClick: boolean;
    onIsAuthClick: () => void;
}
const TransferAuthModal: React.FC<TransferAuthModalProps> = ({ isAuthClick, onIsAuthClick }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [members, setMembers] = useState<MemberEntity[] | undefined>();
    const [selectMem, setSelectMem] = useState<string>('');
    const [selectId, setSelectId] = useState<number>();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchMember = async () => {
            try {
                const response = await fetch(`${Http}/v1/projects/${projectId}/members`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch members');
                }

                const data = await response.json();
                console.log('멤버', data.data);

                const nonPrivilegedMembers = data.data.filter((member: MemberEntity) => !member.isPrivileged);

                if (nonPrivilegedMembers.length > 0) {
                    setSelectMem(nonPrivilegedMembers[0].nickname);
                    setSelectId(nonPrivilegedMembers[0].memberId);
                }
                setMembers(nonPrivilegedMembers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMember();
    }, [projectId]);

    const handleSetSelectMem = (mem: any) => {
        setSelectMem(mem.nickname);
        setSelectId(mem.memberId);
        setIsOpen(false);
    };

    const handleClose = () => {
        onIsAuthClick();
        setIsOpen(false);
    }

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleConfirm = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const url = `${Http}/v1/projects/${projectId}/transfer-privilege`;

            const body = JSON.stringify({
                toMemberId: selectId,
            });

            console.log('Request Body:', body);

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: body,
            });
            if (!response.ok) throw new Error('뭔가 이상');

            window.alert('권한양도에 성공했습니다.');
            window.location.reload();
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };

    useScrollLock(isAuthClick);

    return (
        <>
            {isAuthClick && (
                <ModalPortal>
                    <ModalBlackOut onClick={handleClose} />
                    <ModalContainer>
                        <Box>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <InfoCircleIcon sx={{ fontSize: '32px' }} />
                                    <MemPickDiv onClick={handleSetIsOpen}>
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '12px',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ul
                                                style={{
                                                    width: '100%',
                                                    listStyle: 'none',
                                                }}
                                                onClick={handleSetIsOpen}
                                            >
                                                <li>{selectMem}</li>
                                            </ul>
                                            {isOpen ? (
                                                <ExpandLessIcon
                                                    style={{
                                                        width: '12px',
                                                        height: '11px',
                                                    }}
                                                />
                                            ) : (
                                                <ExpandMoreIcon
                                                    style={{
                                                        width: '12px',
                                                        height: '11px',
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {isOpen && members && (
                                            <MemDropdown>
                                                {members.map((mem) => (
                                                    <li key={mem.memberId} onClick={() => handleSetSelectMem(mem)}>
                                                        {mem.nickname}
                                                    </li>
                                                ))}
                                            </MemDropdown>
                                        )}
                                    </MemPickDiv>

                                    <CommonText>
                                        <MemberNick>{selectMem}</MemberNick> 에게 권한을 양도하겠습니까?
                                    </CommonText>
                                </div>
                                <ButtonsContainer
                                    style={{
                                        alignSelf: 'flex-end',
                                        padding: '0 20px 0 20px',
                                    }}
                                >
                                    <ConfirmBtn onClick={handleConfirm}>확인</ConfirmBtn>
                                    <CancelBtn onClick={handleClose}>취소</CancelBtn>
                                </ButtonsContainer>
                            </div>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};

export default TransferAuthModal;
