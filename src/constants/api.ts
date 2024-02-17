type Id = number;
type String = string;

export const API = {
    MEMBER: '/members/all',
    MEMBER_ID: (id?: Id) => `/members/${id ?? ':id'}`,
    MEMBER_STATE: (string?: String) => `/members/${string ?? ':string'}`,
    MEMBER_NICKNAME: '/projects/members/nickname',
    MEMBER_PROJECTID: (id?: Id) => `/members/storage/${id ?? ':id'}`,
} as const;
