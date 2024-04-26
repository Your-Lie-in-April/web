export const memberList = [
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

export const scheduleList = [
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
export const projectList = [
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
        isStored: true,
        coverImageUrl: null,
        color: 'A5CEF2',
    },
    {
        projectId: 2,
        title: 'spring',
        description:
            '앱센터 15.5기 앱센터 15.5기앱센터 15.5기앱센터 봄 프로젝트',

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
        isStored: true,
        coverImageUrl: null,
        color: 'FFCB3C',
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
    {
        projectId: 5,
        title: '프로젝트5',
        description: '프로젝트설명5',
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
        isStored: true,
        coverImageUrl: null,
        color: 'EB5757',
    },
    {
        projectId: 5,
        title: '프로젝트6',
        description: '프로젝트설명6',
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
        isStored: true,
        coverImageUrl: null,
        color: 'EB5757',
    },
    {
        projectId: 7,
        title: '프로젝트7',
        description: '프로젝트설명7',
        startDate: '2024-04-20',
        endDate: '2024-05-27',
        starTime: '10:00:00',
        endTime: '18:00:00',
        mon: false,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false,
        isStored: true,
        coverImageUrl: null,
        color: 'EB5957',
    },
];

// 프로젝트 썸네일 리스트
export const projectThumbnailList = [
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
        description:
            '앱센터 15.5기 앱센터 15.5기앱센터 15.5기앱센터 봄 프로젝트',
        color: 'FFCB3C',
        coverImageUrl: null,
    },
    {
        projectId: 3,
        title: 'summer',
        description: '앱센터 여름 프로젝트',
        color: 'null',
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
export const pinProjectList = [
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
