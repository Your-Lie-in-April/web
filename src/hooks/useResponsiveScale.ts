import MobileDetect from 'mobile-detect';
import { useEffect } from 'react';

function useResponsiveScale() {
    const md = new MobileDetect(window.navigator.userAgent);

    useEffect(() => {
        function adjustLayout() {
            const designWidth = 1366;
            const screenWidth =
                md.mobile() || md.tablet() ? window.innerWidth : window.screen.width;

            if (screenWidth < designWidth) {
                const scale = screenWidth / designWidth;
                document.body.style.transform = `scale(${scale})`;
                document.body.style.transformOrigin = '0 0';
            } else {
                document.body.style.transform = 'none';
            }
        }

        adjustLayout();

        window.addEventListener('resize', adjustLayout);
        window.addEventListener('orientationchange', adjustLayout);

        return () => {
            window.removeEventListener('resize', adjustLayout);
            window.removeEventListener('orientationchange', adjustLayout);
        };
    }, [md]);
}

export default useResponsiveScale;
