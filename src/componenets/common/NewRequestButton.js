import styles from '../../styles/NewRequestButton.module.css'

function NewRequestButton({setIsOpen}) {
    return (
        <button type="button" className={styles.newRequestButton} onClick={() => setIsOpen(true)}>
            <div className={styles.plusIcon} >+</div>
            <div className={styles.newRequestButtonText}>New Request</div>
        </button>

    );
}

export default NewRequestButton;