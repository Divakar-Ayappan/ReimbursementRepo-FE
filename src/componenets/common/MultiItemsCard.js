import styles from '../../styles/MultiItemsCard.module.css'

function MultiItemsCard({data}) {
    return (
        <div className={styles.multiItemCard}>
            {data}
        </div>
    );
}

export default MultiItemsCard;