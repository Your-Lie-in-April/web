import { Http } from '#/constants/backendURL';
import axios, { AxiosInstance } from 'axios';
import { accessToken } from './token';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: Http,
    timeout: 5000,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    function (config) {
        const token = accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // 요청 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        const responseData = response.data;
        console.log('reponseData : ', responseData);
        return responseData;
    },
    function (error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

export default axiosInstance;
