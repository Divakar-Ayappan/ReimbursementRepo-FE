import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import style from '../../styles/MainLayout.module.css'
import TopBar from "./TopBar";
import {useState} from "react";

function MainLayout() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={style.mainlayout}>
            <Sidebar />
            <div className={style.mainlayout_maincontent}>
                <TopBar setIsOpen={setIsOpen} />
                <div className={style.mainloayout_mainpage}>
                    <Outlet context={{ isOpen, setIsOpen }} />
                </div>
            </div>

        </div>
    );
}

export default MainLayout;
