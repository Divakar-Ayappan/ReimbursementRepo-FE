import styles from '../../styles/TopBar.module.css'
import NewRequestButton from "../common/NewRequestButton";

function TopBar() {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_pageTitle} > Reimbursement Requests </div>
            <NewRequestButton />
        </div>
    );
}

export default TopBar;