import styles from '../../styles/DisplayCard.module.css'
import StatusBadge from "./StatusBadge";

function DisplayCard() {
    return (
        <div className={styles.card}>
            <div className={styles.card_topSection}>
                <div className={styles.card_topSection_categoryText}> Category</div>
                <StatusBadge/>
            </div>
            <div className={styles.card_dateSection}>
                <div className={styles.date_labelText}>
                    From: <div className={styles.cardDateText}>Mar 05, 2023</div>
                </div>
                <div className={styles.date_labelText}>
                    To: <div className={styles.cardDateText}> Mar 07, 2023</div>
                </div>
            </div>
            <div className={styles.card_AmtSection}>
                <div className={styles.card_amountText}>
                    ₹AMT
                </div>
                <div className={styles.date_labelText}>
                    Created: <div className={styles.cardDateText}> Mar 10, 2023</div>
                </div>
            </div>
            <div className={styles.card_pendingWithSection}>
                <div className={styles.card_pendingWithSection_text}> Pending with: </div>
                <div className={styles.card_pendingWithSection_person}>
                   ACTIONER
                </div>
            </div>
        </div>
    );
}

export default DisplayCard;