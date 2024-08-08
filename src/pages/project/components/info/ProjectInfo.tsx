import useClickOutside from '@hooks/useClickOutside';
import React, { useRef, useState } from 'react';
import InfoEdit from './InfoEdit';
import ProjectInfoDetail from './ProjectInfoDetail';

const ProjectInfo: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const editRef = useRef<HTMLDivElement>(null);

    useClickOutside(editRef, () => {
        if (editMode) {
            setEditMode(false);
        }
    });

    const handleEditComplete = () => {
        setEditMode(false);
    };

    return (
        <div ref={editRef}>
            {editMode ? (
                <InfoEdit setEditMode={setEditMode} onEditComplete={handleEditComplete} />
            ) : (
                <ProjectInfoDetail onClick={() => setEditMode(true)} />
            )}
        </div>
    );
};

export default ProjectInfo;
