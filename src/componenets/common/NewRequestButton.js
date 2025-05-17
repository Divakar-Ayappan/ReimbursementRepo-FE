import styles from '../../styles/NewRequestButton.module.css'

function NewRequestButton({setIsRFormOpen}) {
    return (
        <button type="button" className={styles.newRequestButton} onClick={() => setIsRFormOpen(true)}>
            <div className={styles.plusIcon} >+</div>
            <div className={styles.newRequestButtonText}>New Request</div>
        </button>

    );
}

export default NewRequestButton;