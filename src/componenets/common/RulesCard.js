import styles from '../../styles/RulesCard.module.css'

function RulesCard() {
    return (
        <div className={styles.rulesCard}>
            <div className={styles.rulesCard_topSection}>
                <div className={styles.rulesCard_categoryText}>
                    Category
                </div>
                <div className={styles.rulesCard_amtText}>
                    ₹Amt
                </div>
            </div>

            <div className={styles.rulesCard_description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </div>
        </div>
    );
}

export default RulesCard;