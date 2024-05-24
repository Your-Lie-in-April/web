import { Http } from '#/constants/backendURL';

const useDeleteProject = () => {
    const accessToken = localStorage.getItem('access_token');

    const deleteProject = async (projectId: number) => {
        try {
            const response = await fetch(`${Http}/v1/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    accept: '*/*',
                },
            });

            if (response.ok) {
                console.log('프로젝트 삭제 성공');
                return true;
            } else {
                console.error('프로젝트 삭제 실패');
                return false;
            }
        } catch (error) {
            console.error('프로젝트 삭제 에러 발생 : ', error);
            return false;
        }
    };

    return deleteProject;
};
export default useDeleteProject;
