import MakePage from '@pages/makePage';
import { useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import React from 'react';
import ProjectInfoDetail from './ProjectInfoDetail';

const ProjectInfo: React.FC = () => {
    const { isEdit } = useAppSelector((state: RootState) => state.mode);

    return <>{isEdit ? <MakePage /> : <ProjectInfoDetail />}</>;
};

export default ProjectInfo;
