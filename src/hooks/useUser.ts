import { useAppDispatch } from '@redux/config/hook';
import { setIsLoadingUserData, setUserData } from '@redux/slice/user';
import { useEffect } from 'react';
import useMemberInfoQuery from './apis/queries/member/useMemberInfoQuery';

const useUser = () => {
    const dispatch = useAppDispatch();

    const MEMBERID = localStorage.getItem('member_id')
        ? Number(localStorage.getItem('member_id'))
        : null;

    const { data: userInfoQuery, isLoading: isUserInfoLoading } = useMemberInfoQuery(MEMBERID);

    useEffect(() => {
        if (MEMBERID === null) {
            dispatch(setIsLoadingUserData(false));
            return;
        }
        if (userInfoQuery) {
            dispatch(setUserData(userInfoQuery));
        }
        dispatch(setIsLoadingUserData(isUserInfoLoading));
    }, [MEMBERID, userInfoQuery, isUserInfoLoading, dispatch]);
};
export default useUser;
