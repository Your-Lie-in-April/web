import { useState } from 'react';
import styled from 'styled-components';
import InvitationModal from '../../Modal/InvitationModal';
import { Http } from '#/constants/backendURL';
import { ProjectEntity } from '#/Types/projecttype';

const BtnContainer = styled.button`
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
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &: focus {
        border: none;
        outline: none;
    }
`;
interface InviteBtnProps {
    projectId: string | undefined;
    projectData: ProjectEntity | null;
}

const InviteBtn: React.FC<InviteBtnProps> = ({ projectId, projectData }) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const toggleBtn = () => {
        setIsClick(!isClick);
    };

    const accessToken = localStorage.getItem('access_token');

    return (
        <>
            <BtnContainer onClick={toggleBtn}>+초대하기</BtnContainer>
            {isClick && (
                <InvitationModal
                    projectId={projectId}
                    projectData={projectData}
                    toggleBtn = {toggleBtn}
                />
            )}
        </>
    );
};
export default InviteBtn;
