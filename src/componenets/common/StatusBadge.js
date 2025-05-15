import styles from '../../styles/StatusBadge.module.css'

function StatusBadge({status}) {
    return (
        <div className={`${styles.statusBadge} ${styles[`status${status}`]}`}>
            {status}
        </div>
    );
}

export default StatusBadge;