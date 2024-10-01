import { useUserContext } from '@hooks/context/userContext';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChangeStatus from './ChangeStatus';

interface MyPageModalProps {
    onSetIsMyPageModal: () => void;
    onSetIsLogout: () => void;
}

const MyPageModal: React.FC<MyPageModalProps> = ({ onSetIsMyPageModal, onSetIsLogout }) => {
    const [editStatusModal, setEditStatusModal] = useState(false);
    const { userData } = useUserContext();

    const onSetEditStatusModal = () => {
        setEditStatusModal((prev) => !prev);
    };

    const navigate = useNavigate();
    const handlemyproject = () => {
        navigate('/myproject');
    };

    return (
        <>
            <Box>
                <CloseButton onClick={onSetIsMyPageModal}>
                    <StyleCloseIconBtn sx={{ fontSize: '24px' }} />
                </CloseButton>
                <CenteredColumn>
                    <MyImg>
                        <StyledImage src={userData?.profileImageUrl} />
                    </MyImg>
                    <MyEmailText>{userData?.email}</MyEmailText>
                </CenteredColumn>
                <StatusBox>
                    {userData?.state ? (
                        <>
                            <FlexStartDivTen />
                            <StatusText>{userData.state}</StatusText>
                        </>
                    ) : (
                        <>
                            <FlexStartDivZero />
                            <NoStatusText>상태 메시지 등록이 되어있지 않습니다</NoStatusText>
                        </>
                    )}
                    <EditButton onClick={onSetEditStatusModal}>
                        <EditIcon />
                    </EditButton>
                </StatusBox>
                <StorageBtn onClick={handlemyproject}>프로젝트 보관함</StorageBtn>
                <LogoutBtn onClick={onSetIsLogout}>
                    <LogoutOutlinedIcon
                        sx={{
                            color: '#A4A4A4',
                            fontSize: '10px',
                            width: '10px',
                            height: '10px',
                            padding: '1px',
                            boxSizing: 'border-box',
                        }}
                    />
                    로그아웃
                </LogoutBtn>
            </Box>
            <ChangeStatus
                onSetEditStatusModal={onSetEditStatusModal}
                editStatusModal={editStatusModal}
            />
        </>
    );
};
export default MyPageModal;

const Box = styled.div`
    width: 300px;
    height: 244px;
    border-radius: 20px;
    background: #212121;
    position: absolute;
    top: 100%;
    left: -205px;
    display: inline-flex;
    padding: 12px 8px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 22px;
    box-sizing: border-box;
    z-index: 80;
    margin-top: 1.3rem;
`;

const CenteredColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const CloseButton = styled.button.attrs({ type: 'button' })`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const StyleCloseIconBtn = styled(CancelOutlinedIcon)`
    position: absolute;
    top: 12px;
    right: 8px;
    color: #a4a4a4;
`;

const MyImg = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const MyEmailText = styled.div`
    color: #ffffff;
    font-family: 'Pretendard';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 260px;
    text-align: center;
`;

const StatusBox = styled.div`
    width: 268px;
    height: 30px;
    border-radius: 20px;
    background: #ffffff;
    padding: 4px 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const FlexStartDivZero = styled.div`
    justify-content: flex-start;
    flex-basis: 0%;
`;

const FlexStartDivTen = styled.div`
    justify-content: flex-start;
    flex-basis: 10%;
`;

const StatusText = styled.div`
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    flex-grow: 1;

    overflow: hidden;
    text-overflow: ellipsis;
`;

const NoStatusText = styled.div`
    color: #7d7d7d;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EditButton = styled.button.attrs({ type: 'button' })`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    flex-basis: 10%;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;

    &:focus {
        border: none;
        outline: none;
    }
`;

const EditIcon: React.FC = () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
        >
            <path
                d='M4.75617 16.8906C4.80527 16.8906 4.85438 16.8856 4.90349 16.8783L9.0334 16.1539C9.08251 16.1441 9.12916 16.122 9.16353 16.0852L19.5718 5.67694C19.5946 5.65422 19.6126 5.62724 19.6249 5.59754C19.6373 5.56784 19.6436 5.53599 19.6436 5.50384C19.6436 5.47168 19.6373 5.43984 19.6249 5.41013C19.6126 5.38043 19.5946 5.35345 19.5718 5.33073L15.491 1.24747C15.4443 1.20082 15.383 1.17627 15.3167 1.17627C15.2504 1.17627 15.189 1.20082 15.1423 1.24747L4.73407 11.6557C4.69724 11.6926 4.67514 11.7368 4.66532 11.7859L3.94099 15.9158C3.9171 16.0473 3.92564 16.1827 3.96585 16.3102C4.00607 16.4377 4.07676 16.5535 4.17179 16.6475C4.33385 16.8046 4.53764 16.8906 4.75617 16.8906ZM6.41108 12.6084L15.3167 3.70529L17.1164 5.50506L8.21085 14.4082L6.02804 14.7937L6.41108 12.6084ZM20.0359 18.9531H1.96443C1.52983 18.9531 1.17871 19.3042 1.17871 19.7388V20.6227C1.17871 20.7307 1.2671 20.8191 1.37514 20.8191H20.6251C20.7332 20.8191 20.8216 20.7307 20.8216 20.6227V19.7388C20.8216 19.3042 20.4705 18.9531 20.0359 18.9531Z'
                fill='#7D7D7D'
            />
        </svg>
    </svg>
);

const StorageBtn = styled.button.attrs({ type: 'button' })`
    display: flex;
    width: 120px;
    height: 30px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: #633ae2;
    color: #ffffff;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:focus {
        outline: none;
    }
`;

const LogoutBtn = styled.div`
    width: 47px;
    height: 12px;
    display: flex;
    gap: 2px;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 16px;
    bottom: 12px;
    color: #a4a4a4;
    font-family: 'Pretendard';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
`;
