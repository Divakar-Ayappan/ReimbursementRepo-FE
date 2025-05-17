import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import style from '../../styles/MainLayout.module.css'
import TopBar from "./TopBar";
import {useState} from "react";

function MainLayout() {

    const [isRFormOpen, setIsRFormOpen] = useState(false)

    return (
        <div className={style.mainlayout}>
            <Sidebar />
            <div className={style.mainlayout_maincontent}>
                <TopBar setIsRFormOpen={setIsRFormOpen} />
                <div className={style.mainloayout_mainpage}>
                    <Outlet context={{ isRFormOpen, setIsRFormOpen }} />
                </div>
            </div>

        </div>
    );
}

export default MainLayout;
