import { http, HttpResponse } from 'msw';
import {
    memberList,
    scheduleList,
    projectList,
    pinProjectList,
    projectThumbnailList,
    projectInfo,
    mySchedules,
} from './mockData';

export const handlers = [
    //Member//
    //회원 전체 조회
    http.get('/v1/members/all', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '회원 전체 조회 성공',
            data: memberList,
        });
    }),
    //회원 정보 조회
    http.get('/v1/members/:memberId', (request) => {
        const MemberId = request.params.memberId;
        const MemberResponse = memberList.find(
            (member) => member.memberId === parseInt(MemberId)
        );
        if (MemberResponse) {
            return HttpResponse.json({
                status: 'SUCCESS',
                message: '회원 정보 조회 성공',
                data: MemberResponse,
            });
        }
    }),
    //상태메시지 설정
    http.put('/v1/members/:status', (request) => {
        const Status = request.params.status;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '상태메세지 설정 성공',
            data: null,
        });
    }),
    //닉네임 재설정
    http.put('/v1/projects/members/nickname', async ({ request }) => {
        const newNickname = await request.json();
        const { projectId, nickname } = newNickname;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '닉네임 재설정 성공',
            data: null,
        });
    }),
    //프로젝트 보관
    http.post('/v1/members/storage/:projectId', (request) => {
        const projectId = request.params.projectId;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: `${projectId}번 프로젝트 보관 성공`,
            data: null,
        });
    }),
    //프로젝트 삭제
    http.delete('/v1/members/storage/:projectId', (request) => {
        const projectId = request.params.projectId;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: `${projectId}번 프로젝트 삭제 성공`,
            data: null,
        });
    }),

    // Project //
    // 1. 프로젝트 전체 조회
    http.get('/v1/projects/all', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '프로젝트 전체 조회 성공',
            data: projectList,
        });
    }),

    // 특정 아이디 프로젝트 정보 조회
    http.get('/v1/projects/1', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '프로젝트 전체 조회 성공',
            data: projectInfo,
        });
    }),

    // 2. 소속 프로젝트 전체 조회(썸네일)
    http.get('/v1/projects/members/:memberId', ({ params }) => {
        const { memberId } = params;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '소속 프로젝트 전체 조회(썸네일) 성공',
            data: projectThumbnailList,
        });
    }),

    // 3. 핀 설정된 프로젝트 조회
    http.get('/v1/projects/members/:memberId/pin', ({ params }) => {
        const { memberId } = params;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '핀 설정된 프로젝트 조회 성공',
            data: pinProjectList,
        });
    }),

    // 4. 유저가 가지고 있는 프로젝트 중 검색
    http.get('/v1/projects/members/:memberId/:keyword', (request) => {
        const MemberId = request.params.memberId;
        const keyword = request.params.keyword.toLocaleLowerCase();
        const ProjectResponse = projectList.filter((project) => {
            return project.title.toLowerCase().includes(keyword);
        });
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '유저가 가지고 있는 프로젝트 중 검색 성공',
            data: ProjectResponse,
        });
    }),

    // 5. 프로젝트에 속해있는 유저 전체 조회
    http.get('/v1/projects/:projectId/members', ({ params }) => {
        const { projectId } = params;
        const project = projectList.find(
            (project) => project.projectId === parseInt(projectId)
        );

        if (!project) {
            return HttpResponse.json({
                status: 'ERROR',
                message: '프로젝트를 찾을 수 없습니다.',
                data: null,
            });
        }

        const MemberResponse = project.schedule.map((member) => ({
            nickname: member.nickname,
            memberId: member.memberId,
        }));
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '프로젝트에 속해있는 유저 전체 조회',
            data: MemberResponse,
        });
    }),

    // 7. 프로젝트 생성
    http.post('/v1/projects', async ({ request }) => {
        const newProject = await request.json();
        const {
            title,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
            mon,
            tue,
            wed,
            thu,
            fri,
            sat,
            sun,
            coverImageUrl,
            color,
        } = newProject;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '프로젝트 생성 성공',
            data: newProject,
        });
    }),

    // 8. 프로젝트 삭제
    http.delete('/v1/projects/:projectId', ({ params }) => {
        const { projectId } = params;
        return HttpResponse.json({
            state: 'SUCCESS',
            message: '프로젝트 삭제 성공',
            data: null,
        });
    }),

    // 9. 프로젝트 수정
    http.put('/v1/projects/:projectId', async ({ params, request }) => {
        const { projectId } = params;
        const projectUpdateData = await request.json();
        return HttpResponse.json({
            state: 'SUCCESS',
            message: '프로젝트 수정 성공',
            data: null,
        });
    }),

    // 10. 회원 초대 링크 생성
    http.post('/v1/projects/:projectId/invitation', async (request) => {
        const { projectId } = request.params;
        const hash = Math.random().toString(36).substring(7);
        invitationLinks[projectId] = hash;
        return HttpResponse.json({
            statusbar: 'SUCCESS',
            message: '회원 초대 링크 생성 성공',
            data: {
                url: `https://timepiece.com/invitation/${hash}`,
            },
        });
    }),

    // 11. 회원 강퇴
    http.delete('/v1/projects/:projectId/members/:memberId', ({ params }) => {
        const { projectId, memberId } = params;
        return HttpResponse.json({
            state: 'SUCCESS',
            message: '회원 강퇴 성공',
            data: null,
        });
    }),

    // 12. 회원 초대
    http.post('/v1/projects/:projectId/invitation', async (request) => {
        const { projectId } = request.params;
        const { memberId, url } = request.body;

        const project = projectList.find(
            (project) => project.projectId === parseInt(projectId)
        );

        if (!project) {
            return HttpResponse.json({
                status: 'ERROR',
                message: '프로젝트를 찾을 수 없음.',
                data: null,
            });
        }

        const invitedUser = projectInvitations[projectId]?.find(
            (invitedUser) => invitedUser.url === url
        );

        if (!invitedUser || invitedUser.memberId !== memberId) {
            return HttpResponse.json({
                status: 'ERROR',
                message: '초대 정보가 일치X',
                data: null,
            });
        }
        invitedUser.accepted = true;

        return HttpResponse.json({
            status: 'SUCCESS',
            message: '회원 초대 수락 성공',
            data: invitedUser,
        });
    }),

    // 보관함페이지 프로젝트보기
    http.get('/v1/projects/stored', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '보관함프로젝트 조회 성공',
            data: projectThumbnailList,
        });
    }),

    //Schedule
    //시간표 전체 조회
    http.get('/v1/schedules/all', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '시간표 전체 조회 성공',
            data: scheduleList,
        });
    }),

    //프로젝트 내 모든 사용자 시간표 조회
    http.get('/v1/projects/:projectId/schedules', () => {
        const { startdata, enddata } = time.params;
        const filteredSchedules = scheduleList.map((schedule) => ({
            ...schedule,
            schedule: schedule.schedule.filter(
                (item) => item.startAt >= startdata && item.endAt <= enddata
            ),
        }));
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '프로젝트 내 모든 사용자 시간표 조회 성공',
            data: filteredSchedules,
        });
    }),
    //사용자 시간표 조회
    http.get('/v1/projects/1/members/1/schedules', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '사용자 시간표 조회 성공',
            data: mySchedules,
        });
    }),
    //시간표 생성
    http.post('/v1/projects/:projectId/schedules', async ({ request }) => {
        const newSchedule = await response.json();
        const { projectId, schedule } = newSchedule;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 생성 성공`,
            data: null,
        });
    }),
    //시간표 수정
    http.put('/v1/projects/:projectId/schedules', async ({ request }) => {
        const newSchedule = await response.json();
        const { projectId, schedule } = newSchedule;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 수정 성공`,
            data: null,
        });
    }),
    //시간표 삭제
    http.delete('/v1/projects/:projectId/schedules', async ({ request }) => {
        const deleteSchedule = await response.json();
        const { projectId, startDate, endDate } = deleteSchedule;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 삭제 성공`,
            data: null,
        });
    }),
];
