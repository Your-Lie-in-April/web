import { useState } from 'react';
import InfoEdit from './InfoEdit';
import ProjectInfoDetail from './ProjectInfoDetail';

const ProjectInfo = () => {
    const [editCover, setEditCover] = useState(false);

    return (
        <>
            {editCover ? (
                <InfoEdit setEditCover={setEditCover} />
            ) : (
                <ProjectInfoDetail onClick={() => setEditCover(true)} />
            )}
        </>
    );
};

export default ProjectInfo;
