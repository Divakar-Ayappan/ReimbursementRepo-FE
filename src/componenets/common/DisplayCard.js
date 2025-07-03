import styles from '../../styles/DisplayCard.module.css'
import StatusBadge from "./StatusBadge";
import {USER_DETAILS_NAME} from "../../commons/Constants";

function DisplayCard({request, onClick}) {

    const userDetails = JSON.parse(sessionStorage.getItem(USER_DETAILS_NAME));
    const role = userDetails?.role;

    return (
        <div onClick={onClick} className={styles.card}>
            <div className={styles.card_topSection}>
                <div className={styles.card_topSection_categoryText}> Category</div>
                <StatusBadge status={request.status}/>
            </div>
            <div className={styles.card_dateSection}>
                <div className={styles.date_labelText}>
                    From: <div className={styles.cardDateText}>{request.fromDate}</div>
                </div>
                <div className={styles.date_labelText}>
                    To: <div className={styles.cardDateText}>{request.toDate}</div>
                </div>
            </div>
            <div className={styles.card_AmtSection}>
                <div className={styles.card_amountText}>
                    ₹{request.amount}
                </div>
                <div className={styles.date_labelText}>
                    Created: <div className={styles.cardDateText}> {request.createdAt}</div>
                </div>
            </div>

            {role === 'EMPLOYEE' &&
                <div className={styles.card_pendingWithSection}>
                    <div className={styles.card_pendingWithSection_text}> Pending with:</div>
                    <div className={styles.card_pendingWithSection_person}>
                        {request.pendingWith}
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayCard;