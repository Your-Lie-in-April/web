export const QUERY_KEY = {
  MEMBER: ["member"],
  MEMBER_ID: ["member", "memberId"],
  MEMBER_STATE: ["member", "state"],

  PROJECT: ["project"],
  PROJECT_ID: (projcetId: number) => ["project", projcetId],
  PROJECT_THUMBNAIL: (memberId: number) => ["project", "members", memberId],
  PROJECT_PIN: ["project", "pin"],
  PROJECT_KEYWORD: (memberId: number, keyword: string) => [
    "project",
    memberId,
    keyword,
  ],
};
