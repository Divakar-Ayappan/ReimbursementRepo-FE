import styles from '../../styles/NewRequestButton.module.css'

function NewRequestButton() {
    return (
        <button type="button" className={styles.newRequestButton}>
            <div className={styles.plusIcon} >+</div>
            <div className={styles.newRequestButtonText}>New Request</div>
        </button>

    );
}

export default NewRequestButton;