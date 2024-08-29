import MobileDetect from 'mobile-detect';

export function isMobileSetHeight() {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile() || md.tablet()) {
        document.documentElement.style.height = '100vh';
    }
}
