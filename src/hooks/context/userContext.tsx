import { MemberEntity } from '@/types/memberType';
import useMemberInfoQuery from '@hooks/apis/queries/member/useMemberInfoQuery';
import { memberId } from '@utils/token';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserContextType = {
    userData: MemberEntity | null;
    setUserData: (userData: MemberEntity | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<MemberEntity | null>(null);
    const { data } = useMemberInfoQuery(memberId);
    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data, setUserData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === null) throw new Error('useUserContext must be used within a UserProvider');
    return context;
};
