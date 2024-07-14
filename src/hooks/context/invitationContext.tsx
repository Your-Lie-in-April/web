import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InvitationProviderProps {
    children: ReactNode;
}

interface InvitationContextType {
    invitationLink: string;
    setInvitationLink: (link: string) => void;
}

const defaultValue: InvitationContextType = {
    invitationLink: '',
    setInvitationLink: () => {},
};

const InvitationContext = createContext(defaultValue);

export const useInvitationContext = () => useContext(InvitationContext);

export const InvitationProvider: React.FC<InvitationProviderProps> = ({ children }) => {
    const [invitationLink, setInvitationLink] = useState<string>('');

    return (
        <InvitationContext.Provider value={{ invitationLink, setInvitationLink }}>
            {children}
        </InvitationContext.Provider>
    );
};
