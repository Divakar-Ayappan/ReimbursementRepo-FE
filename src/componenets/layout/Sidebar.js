import { NavLink } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';
import Logo from '../../assets/Divum logo.svg'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_header}>
                <img src={Logo} alt={"logo"}/>
                <h2 className={styles.sidebar_title}>Reimbursement Platform</h2>
            </div>
            <nav className={styles.sidebar_nav}>
            <NavLink
                    to="/overview"
                    className={({ isActive }) =>
                        `${styles.sidebar_link} ${isActive ? styles.sidebar_link_active : ''}`
                    }
                >
                    Overview
                </NavLink>

                <NavLink
                    to="/rules"
                    className={({ isActive }) =>
                        `${styles.sidebar_link} ${isActive ? styles.sidebar_link_active : ''}`
                    }
                >
                    Rules
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;
