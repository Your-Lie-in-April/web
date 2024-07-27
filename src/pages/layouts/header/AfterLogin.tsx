import ConfirmLogout from '@pages/modal/member/ConfirmLogout';
import MyPageModal from '@pages/modal/member/MyPageModal';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AfterLogin: FC = () => {
    const [isLogout, setLogOut] = useState<boolean>(false);
    const [isMyPageModal, setIsMyPageModal] = useState(false);

    const navigate = useNavigate();

    const onSetIsMyPageModal = () => {
        setIsMyPageModal((prev) => !prev);
    };

    const onSetIsLogout = () => {
        setLogOut(true);
    };

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.location.reload();
        }
    };

    return (
        <>
            <AfterLoginDiv>
                <div style={{ justifyContent: 'flex-start', flexBasis: '20%' }} />
                <Logo onClick={handleLogoClick}>TIME PIECE</Logo>
                <MyPageDiv>
                    <MyPageBtn onClick={onSetIsMyPageModal}>My page</MyPageBtn>
                    {isMyPageModal && (
                        <MyPageModal
                            onSetIsMyPageModal={onSetIsMyPageModal}
                            onSetIsLogout={onSetIsLogout}
                        />
                    )}
                </MyPageDiv>
            </AfterLoginDiv>
            {isLogout && <ConfirmLogout setLogOut={setLogOut} />}
        </>
    );
};
export default AfterLogin;

const AfterLoginDiv = styled.div`
    width: 100%;
    height: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    z-index: 2;
    color: #000000;
    font-style: normal;
`;

const Logo = styled.div`
    position: relative;
    bottom: 14px;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    font-weight: 700;
    font-size: 32px;
    cursor: pointer;
`;

const MyPageDiv = styled.div`
    position: relative;
    bottom: 21px;
    justify-content: flex-end;
    flex-basis: 20%;
    white-space: nowrap;
`;

const MyPageBtn = styled.button`
    box-sizing: border-box;
    color: #000000;
    font-weight: 500;
    font-size: 22px;

    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
`;
