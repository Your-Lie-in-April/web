import styled from 'styled-components';
import StorageProject from './StorageProject';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(auto, auto);
    column-gap: 25px;
    row-gap: 16px;
`;

const NoProject = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    color: #d9d9d9;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
`;

const StorageProjectList = () => {
    const [projects, setProjects] = useState<ProjectEntity[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(9);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastProjectRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore]
    );

    const fetchProjects = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const response = await fetch(`${Http}/v1/projects/stored?page=${page}&size=${size}`, {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    console.log('failed to fetch storage projects');
                }
                const data = await response.json();
                console.log(data);
                if (page === 0) {
                    setProjects(data.data);
                } else {
                    setProjects((prevProjects) => [...prevProjects, ...data.data]);
                }
                setHasMore(data.data.length > 0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [page, size]);

    return projects.length > 0 ? (
        <GridContainer>
            {projects.map((project, index) => {
                if (projects.length === index + 1) {
                    return (
                        <div key={project.projectId} ref={lastProjectRef}>
                            <StorageProject project={project} />
                        </div>
                    );
                } else {
                    return <StorageProject key={project.projectId} project={project} />;
                }
            })}
        </GridContainer>
    ) : (
        <NoProject>No Project</NoProject>
    );
};

export default StorageProjectList;
