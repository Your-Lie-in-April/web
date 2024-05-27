import { useEffect } from 'react';

const useScrollLock = (): void => {
    useEffect(() => {
        const originalOverflowY = document.body.style.overflowY;
        const scrollY = window.scrollY;

        document.body.style.cssText = `
            position: fixed;
            top: -${scrollY}px;
            overflow-y: scroll;
            width: 100%;`;

        return () => {
            document.body.style.cssText = '';
            window.scrollTo(0, scrollY);
            document.body.style.overflowY = originalOverflowY;
        };
    }, []);
};

export default useScrollLock;
