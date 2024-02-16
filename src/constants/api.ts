type Id = number;
type String = string;

export const API = {
    MEMBER: '/members/all',
    MEMBER_ID: (id?: Id) => `/members/${id ?? ':id'}`,
    MEMBER_STATUS: (string?: String) => `/members/${string ?? ':string'}`,
} as const;
