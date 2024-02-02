import { http, HttpResponse } from 'msw';
import { useEffect } from 'react';

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbnUxMjM0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImNsaWVudE51bSI6MSwiaWF0IjoxNzA1OTQ1OTQxLCJleHAiOjE3MDU5NDk1NDF9.Cs95IQ12uo2WGIrv21k-7UF27Rj6g5uKj36_mVrVcXI';
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
                    { startAt: '2024-01-31T17:00:00+09:00', endAt: '2024-01-31T20:30:00+09:00' },
                    { startAt: '2024-01-31T21:30:00+09:00', endAt: '2024-01-31T22:30:00+09:00' },
                ],
            },
            {
                dayOfWeek: 'tue',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'wed',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'thu',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'fri',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
        ],
    },
    {
        nickname: 'gojaeng',
        schedule: [
            {
                dayOfWeek: 'mon',
                schedule: [
                    { startAt: '2024-01-31T17:00:00+09:00', endAt: '2024-01-31T20:30:00+09:00' },
                    { startAt: '2024-01-31T21:30:00+09:00', endAt: '2024-01-31T22:30:00+09:00' },
                ],
            },
            {
                dayOfWeek: 'tue',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'wed',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'thu',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
            {
                dayOfWeek: 'fri',
                schedule: [{ startAt: '2024-02-4T10:30:00+09:00', endAt: '2024-02-4T11:30:00+09:00' }],
            },
        ],
    },
];

export const handlers = [
    //Member//
    //회원 전체 조회
    http.get('/v1/members/all', () => {
        return HttpResponse.json({ List });
    }),
    //회원 정보 조회
    http.get('/v1/members/:memberId', (request) => {
        const MemberId = request.params.memberId;
        const MemberResponse = List.find((member) => member.memberId === parseInt(MemberId));
        if (MemberResponse) {
            return HttpResponse.json(MemberResponse);
        }
    }),
    //상태메시지 설정
    http.put('/v1/members/:status', (request) => {
        const Status = request.params.status;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: '상태메세지 설정 성공',
            data: Status,
        });
    }),
    //닉네임 재설정
    http.put('/v1/projects/members/nickname', async ({ request }) => {
        const newNickname = await request.json();
        const { projectId, nickname } = newNickname;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: '닉네임 재설정 성공',
            data: nickname + '으로 변경 완료',
        });
    }),
    //프로젝트 보관
    http.post('/v1/members/storage/:projectId', (request) => {
        const projectId = request.params.projectId;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: `${projectId}번 프로젝트 보관 성공`,
            data: projectId,
        });
    }),
    //프로젝트 삭제
    http.delete('/v1/members/storage/:projectId', (request) => {
        const projectId = request.params.projectId;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: `${projectId}번 프로젝트 삭제 성공`,
            data: null,
        });
    }),

    //Schedule
    //시간표 전체 조회
    http.get('/v1/schedules/all', () => {
        return HttpResponse.json(ScheduleList);
    }),
    //프로젝트 내 모든 사용자 시간표 조회
    http.get('/v1/projects/:projectId/schedules', () => {
        const { startdata, enddata } = time.params;
        const filteredSchedules = ScheduleList.map((schedule) => ({
            ...schedule,
            schedule: schedule.schedule.filter((item) => item.startAt >= startdata && item.endAt <= enddata),
        }));
        return HttpResponse.json(filteredSchedules);
    }),
    //사용자 시간표 조회
    http.get('/v1/projects/:projectId/members/:memberId/schedules', () => {
        const projectId = request.params.projcetId;
        const memberId = request.params.memberId;
        return HttpResponse.json(ScheduleList);
    }),
    //시간표 생성
    http.post('/v1/projects/:projectId/schedules', async ({ request }) => {
        const newSchedule = await response.json();
        const { projectId, schedule } = newSchedule;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 생성 성공`,
            data: schedule,
        });
    }),
    //시간표 수정
    http.put('/v1/projects/:projectId/schedules', async ({ request }) => {
        const newSchedule = await response.json();
        const { projectId, schedule } = newSchedule;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 수정 성공`,
            data: schedule,
        });
    }),
    //시간표 삭제
    http.delete('/v1/projects/:projectId/schedules', async ({ request }) => {
        const deleteSchedule = await response.json();
        const { projectId, startDate, endDate } = deleteSchedule;
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: `${projectId}번 프로젝트 시간표 삭제 성공`,
            data: null,
        });
    }),
];
