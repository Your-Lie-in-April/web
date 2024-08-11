export default function getIsLogin() {
    return (
        !!localStorage.getItem('access_token') &&
        !!localStorage.getItem('refresh_token') &&
        !!localStorage.getItem('member_id')
    );
}
