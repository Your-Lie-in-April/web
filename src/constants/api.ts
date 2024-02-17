type Id = number;
type String = string;

export const API = {
  MEMBER: "/members/all",
  MEMBER_ID: (id?: Id) => `/members/${id ?? ":id"}`,
  MEMBER_STATE: (string?: String) => `/members/${string ?? ":string"}`,
  MEMBER_NICKNAME: "/projects/members/nickname",
  MEMBER_STORAGE_PROJECT: (id?: Id) => `/members/storage/${id ?? ":id"}`,

  PROJECT: "/projects",
  PROJECT_ALL: "/projects/all",
  PROJECT_THUMBNAIL: (id?: Id) => `/projects/members/${id ?? ":id"}`,
  PROJECT_PIN: (id?: Id) => `/projects/members/${id ?? ":id"}/pin`,
  PROJECT_SEARCH: (id?: Id, keyword?: String) =>
    `projects/members/${id}/${keyword}`,
  PROJECT_MEMBERS: (id?: Id) => `/projects/${id ?? ":id"}/members`,
  PROJECT_ID: (id?: Id) => `/projects/${id ?? ":id"}`,
  PROJECT_INVITATION: (id?: Id) => `/projects/${id ?? `:id`}/invitation`,
  PROJECT_REMOVE_MEMBER: (projectId?: Id, memberId?: Id) =>
    `/v1/projects/${projectId ?? ":projectId"}/members/${
      memberId ?? ":memberId"
    }`,
} as const;
