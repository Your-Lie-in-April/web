import { http, HttpResponse } from 'msw';
import { useEffect } from 'react';

const List = [
    {
        memberId: 1,
        email: 'example@example.com',
        nickname: 'namu',
        state: '완벽한 하루',
        profileImageURL: 'https://xxx.kakao.co.kr/.../aaa.jpg',
    },
    {
        memberId: 2,
        email: 'example2@example.com',
        nickname: 'gojaeng',
        state: '화이팅',
        profileImageURL: 'https://xxx.kakao.co.kr/.../aaa.jpg',
    },
    {
        memberId: 3,
        email: 'example3@example.com',
        nickname: 'milk',
        state: '우유',
        profileImageURL: 'https://xxx.kakao.co.kr/.../aaa.jpg',
    },
];

const ScheduleList = [
    {
        nickname: 'namu',
        schedule: [
            {
                dayOfWeek: 'mon',
                schedule: [
                    {
                        startAt: '2024-01-31T17:00:00+09:00',
                        endAt: '2024-01-31T20:30:00+09:00',
                    },
                    {
                        startAt: '2024-01-31T21:30:00+09:00',
                        endAt: '2024-01-31T22:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'tue',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'wed',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'thu',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'fri',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
        ],
    },
    {
        nickname: 'gojaeng',
        schedule: [
            {
                dayOfWeek: 'mon',
                schedule: [
                    {
                        startAt: '2024-01-31T17:00:00+09:00',
                        endAt: '2024-01-31T20:30:00+09:00',
                    },
                    {
                        startAt: '2024-01-31T21:30:00+09:00',
                        endAt: '2024-01-31T22:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'tue',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'wed',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'thu',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
            {
                dayOfWeek: 'fri',
                schedule: [
                    {
                        startAt: '2024-02-4T10:30:00+09:00',
                        endAt: '2024-02-4T11:30:00+09:00',
                    },
                ],
            },
        ],
    },
];
const projectList = [
    {
        projectId: 1,
        title: 'timepiece',
        description: '앱센터 15.5기 겨울방학 프로젝트',
        startDate: '2024-01-31',
        endDate: '2024-02-27',
        starTime: '09:00:00',
        endTime: '21:00:00',
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: false,
        coverImageUrl: null,
        color: 'FFFFFF',
    },
    {
        projectId: 2,
        title: 'spring',
        description: '앱센터 봄 프로젝트',
        startDate: '2024-03-01',
        endDate: '2024-04-27',
        starTime: '10:00:00',
        endTime: '22:00:00',
        mon: false,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: false,
        coverImageUrl: null,
        color: 'FFFFFF',
    },
    {
        projectId: 3,
        title: 'summer',
        description: '앱센터 여름 프로젝트',
        startDate: '2024-06-31',
        endDate: '2024-08-27',
        starTime: '09:00:00',
        endTime: '23:00:00',
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: false,
        coverImageUrl: null,
        color: 'FFFFFF',
    },
    {
        projectId: 4,
        title: 'fall',
        description: '앱센터 가을 프로젝트',
        startDate: '2024-09-31',
        endDate: '2024-12-27',
        starTime: '12:30:00',
        endTime: '22:00:00',
        mon: false,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: false,
        coverImageUrl: null,
        color: 'FFFFFF',
    },
];

// 프로젝트 썸네일 리스트
const ProjectThumbnailList = [
    {
        projectId: 1,
        title: 'timepiece',
        description: '앱센터 15.5기 겨울방학 프로젝트',
        color: 'FFFFFF',
        coverImageUrl: null,
    },
    {
        projectId: 2,
        title: 'spring',
        description: '앱센터 봄 프로젝트',
        color: 'FFFFFF',
        coverImageUrl: null,
    },
    {
        projectId: 3,
        title: 'summer',
        description: '앱센터 여름 프로젝트',
        color: 'FFFFFF',
        coverImageUrl: null,
    },
    {
        projectId: 4,
        title: 'fall',
        description: '앱센터 가을 프로젝트',
        color: 'FFFFFF',
        coverImageUrl: null,
    },
];

// 핀 프로젝트
const PinProjectList = [
    {
        projectId: 1,
        title: 'timepiece',
        description: '앱센터 15.5기 겨울방학 프로젝트',
        startDate: '2024-01-31',
        endDate: '2024-02-27',
        starTime: '09:00:00',
        endTime: '21:00:00',
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: false,
        coverImageUrl: null,
        color: 'FFFFFF',
        memberCount: 2,
        schedule: [
            {
                nickname: 'namu',
                schedule: [
                    {
                        dayOfWeek: 'mon',
                        schedule: [
                            {
                                startAt: '2024-01-31T17:00:00+09:00',
                                endAt: '2024-01-31T20:30:00+09:00',
                            },
                            {
                                startAt: '2024-01-31T21:30:00+09:00',
                                endAt: '2024-01-31T22:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'tue',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'wed',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'thu',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'fri',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                ],
            },
            {
                nickname: 'flog',
                schedule: [
                    {
                        dayOfWeek: 'mon',
                        schedule: [
                            {
                                startAt: '2024-01-31T17:00:00+09:00',
                                endAt: '2024-01-31T20:30:00+09:00',
                            },
                            {
                                startAt: '2024-01-31T21:30:00+09:00',
                                endAt: '2024-01-31T22:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'tue',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'wed',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'thu',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                    {
                        dayOfWeek: 'fri',
                        schedule: [
                            {
                                startAt: '2024-02-4T10:30:00+09:00',
                                endAt: '2024-02-4T11:30:00+09:00',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const invitationLinks = {};

export const handlers = [
    //Member//
    //회원 전체 조회
    http.get('/v1/members/all', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '회원 전체 조회 성공',
            data: List,
        });
    }),
    //회원 정보 조회
    http.get('/v1/members/:memberId', (request) => {
        const MemberId = request.params.memberId;
        const MemberResponse = List.find(
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

    // 2. 소속 프로젝트 전체 조회(썸네일)
    http.get('/v1/projects/members/:memberId', ({ params }) => {
        const { memberId } = params;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '소속 프로젝트 전체 조회(썸네일) 성공',
            data: ProjectThumbnailList,
        });
    }),

    // 3. 핀 설정된 프로젝트 조회
    http.get('/v1/projects/members/:memberId/pin', ({ params }) => {
        const { memberId } = params;
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '핀 설정된 프로젝트 조회 성공',
            data: PinProjectList,
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
            data: projectList,
        });
    }),

    //Schedule
    //시간표 전체 조회
    http.get('/v1/schedules/all', () => {
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '시간표 전체 조회 성공',
            data: ScheduleList,
        });
    }),
    //프로젝트 내 모든 사용자 시간표 조회
    http.get('/v1/projects/:projectId/schedules', () => {
        const { startdata, enddata } = time.params;
        const filteredSchedules = ScheduleList.map((schedule) => ({
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
    http.get('/v1/projects/:projectId/members/:memberId/schedules', () => {
        const projectId = request.params.projcetId;
        const memberId = request.params.memberId;
        const filteredSchedules = ScheduleList.filter(
            (schedule) =>
                (schedule.projcetId === schedule.memberId) === memberId
        );
        return HttpResponse.json({
            status: 'SUCCESS',
            message: '사용자 시간표 조회 성공',
            data: filteredSchedules,
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
