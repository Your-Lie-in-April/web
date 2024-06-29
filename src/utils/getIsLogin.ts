export default function getIsLogin() {
    return !!localStorage.getItem('access_token');
}
