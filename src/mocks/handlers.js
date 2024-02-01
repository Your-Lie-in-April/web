import { http, HttpResponse } from 'msw';

const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbnUxMjM0Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImNsaWVudE51bSI6MSwiaWF0IjoxNzA1OTQ1OTQxLCJleHAiOjE3MDU5NDk1NDF9.Cs95IQ12uo2WGIrv21k-7UF27Rj6g5uKj36_mVrVcXI';

export const handlers = [
    http.get('/api/v1/oauth2/status', () => {
        return HttpResponse.json({
            commonResponse: 'SUCCESS',
            message: '정보 확인',
            data: token,
        });
    }),
    http.post('/api/v1/oauth2/login', () => {
        const body = {
            email: 'use@example.com',
            password: 'password123',
        };
        return HttpResponse.json({
            data: token,
        });
    }),
    http.get('/api/v1/users/all', () => {
        return HttpResponse.json({});
    }),
];
