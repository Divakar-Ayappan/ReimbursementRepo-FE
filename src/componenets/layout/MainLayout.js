import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import style from '../../styles/MainLayout.module.css'
import TopBar from "./TopBar";

function MainLayout() {
    return (
        <div className={style.mainlayout}>
            <Sidebar />
            <div className={style.mainlayout_maincontent}>
                <TopBar />
                <div className={style.mainloayout_mainpage}>
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default MainLayout;
