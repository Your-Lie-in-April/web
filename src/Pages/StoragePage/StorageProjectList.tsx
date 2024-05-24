import styled from 'styled-components';
import StorageProject from './StorageProject';
import { useEffect, useState } from 'react';
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

    const accessToken = localStorage.getItem('access_token');

    const fetchProjects = async () => {
        const response = await fetch(
            `${Http}/v1/projects/stored?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);
        setProjects((prevProjects) => [...prevProjects, ...data.data]);
        setHasMore(data.data.length > 0);
    };

    useEffect(() => {
        if (accessToken !== '' && hasMore) {
            fetchProjects();
        }
    }, [accessToken, page, hasMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 프로젝트 목록 다시 가져오기
    const refreshProjects = async () => {
        setPage(0);
        setProjects([]);
        setHasMore(true);
        await fetchProjects();
    };

    return projects.length > 0 ? (
        <GridContainer>
            {projects.map((project) => (
                <StorageProject
                    key={project.projectId}
                    project={project}
                    refreshProjects={refreshProjects}
                />
            ))}
        </GridContainer>
    ) : (
        <NoProject>No Project</NoProject>
    );
};

export default StorageProjectList;
