import styles from '../../styles/RulesCard.module.css'

function RulesCard({ rule }) {
    return (
        <div className={styles.rulesCard}>
            <div className={styles.rulesCard_topSection}>
                <div className={styles.rulesCard_categoryText}>
                    {rule.ruleCategory}
                </div>
                <div className={styles.rulesCard_amtText}>
                    ₹{rule.reimbursementLimit}
                </div>
            </div>

            <div className={styles.rulesCard_description}>
                {rule.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </div>
        </div>
    );
}

export default RulesCard;
