import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useState } from 'react';
import style from '../../styles/MainLayout.module.css';
import AnimatedOutlet from '../layout/AnimationOutlet';

function MainLayout() {
    const [isRFormOpen, setIsRFormOpen] = useState(false);

    const [rFormOpeningMode, setRFormOpeningMode] = useState('');

    const outletContext = { isRFormOpen, setIsRFormOpen, rFormOpeningMode, setRFormOpeningMode };

    return (
        <div className={style.mainlayout}>
            <Sidebar />
            <div className={style.mainlayout_maincontent}>
                <TopBar setRFormOpeningMode={setRFormOpeningMode} setIsRFormOpen={setIsRFormOpen} />
                <div className={style.mainloayout_mainpage}>
                    <AnimatedOutlet context={outletContext} />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
