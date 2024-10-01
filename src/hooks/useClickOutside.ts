import { RefObject, useEffect } from 'react';

function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: () => void,
    exceptRef?: RefObject<HTMLElement>
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node) &&
                (!exceptRef ||
                    (exceptRef.current && !exceptRef.current.contains(event.target as Node)))
            ) {
                handler();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler, exceptRef]);
}

export default useClickOutside;
