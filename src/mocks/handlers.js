import { http } from 'msw';

const todos = ['먹기', '자기', '놀기'];

export const handlers = [
    // 테스트 용
    http.get('/ping', (req, res, ctx) => {
        console.log('Request:', req);
        return res(ctx.json('pong'));
    }),

    // 할일 목록
    http.get('/todos', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(todos));
    }),

    // 할일 추가
    http.post('/todos', (req, res, ctx) => {
        todos.push(req.body);
        return res(ctx.status(201));
    }),
];
