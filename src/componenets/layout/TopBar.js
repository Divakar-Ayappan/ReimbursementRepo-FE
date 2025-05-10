import styles from '../../styles/TopBar.module.css'
import NewRequestButton from "../common/NewRequestButton";

function TopBar({setIsOpen}) {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbar_pageTitle} > Reimbursement Requests </div>
            <NewRequestButton setIsOpen={setIsOpen} />
        </div>
    );
}

export default TopBar;