import Login from './Pages/MainPage/Login';
import Alarm from './Pages/MainPage/Alarm';
import Search from './Pages/MainPage/Search';
import NewProject from './Pages/MainPage/NewProject';
import BeforeLogin from './Layouts/BeforeLogin';
function App() {
    return (
        <>
            <Login />
            <Alarm />
            <Search />
            <NewProject />
            <BeforeLogin />
        </>
    );
}

export default App;
