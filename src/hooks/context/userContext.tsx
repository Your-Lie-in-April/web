import { MemberEntity } from '@/types/memberType';
import useMemberInfoQuery from '@hooks/apis/queries/member/useMemberInfoQuery';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserContextType = {
    userData: MemberEntity | null;
    setUserData: (userData: MemberEntity | null) => void;
    isLoading : boolean
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<MemberEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const memberId = localStorage.getItem('member_id')
        ? Number(localStorage.getItem('member_id'))
        : null;
    const { data: userInfoQuery, isLoading: isUserInfoLoading } = useMemberInfoQuery(memberId);

    useEffect(() => {
        if (memberId === null) {
            setIsLoading(false);
            return;
        }

        if (userInfoQuery) {
            setUserData(userInfoQuery);
        }
        setIsLoading(isUserInfoLoading);
    }, [memberId, userInfoQuery, isUserInfoLoading]);

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};
