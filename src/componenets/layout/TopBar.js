import styles from '../../styles/TopBar.module.css'
import NewRequestButton from "../common/NewRequestButton";

function TopBar({setIsRFormOpen, setRFormOpeningMode}) {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_pageTitle} > Reimbursement Requests </div>
            <NewRequestButton setIsRFormOpen={setIsRFormOpen} setRFormOpeningMode={setRFormOpeningMode}/>
        </div>
    );
}

export default TopBar;