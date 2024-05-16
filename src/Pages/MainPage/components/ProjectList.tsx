import React, { useEffect, useState } from 'react';
import Project from './Project';
import styled from 'styled-components';
import { Http } from '#/constants/backendURL';
import { ProjectEntity } from '#/Types/projecttype';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 24px;
    cursor: pointer;
`;

const ProjectList = () => {
    const [projects, setProjects] = useState<ProjectEntity[]>([]);
    const accessToken = localStorage.getItem('access_token');
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchProjects = async () => {
            const response = await fetch(`${Http}/v1/projects/all`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setProjects(data.data);
        };

        if (accessToken != '') fetchProjects();
    }, [accessToken]);

    return accessToken == '' ? (
        <div>빈칸</div>
    ) : (
        <GridContainer>
            {projects.map((project) => (
                <Project key={project.projectId} project={project} />
            ))}
        </GridContainer>
    );
};

export default ProjectList;
