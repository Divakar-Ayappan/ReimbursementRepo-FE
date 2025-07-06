import React, {useState} from 'react';
import styles from "../../styles/OverviewPage.module.css";
import {REJECTION_REASONS} from "../../commons/Constants";
import CommentTextArea from "./CommentTextArea";
import DenserButton from "./DenserButton";

function RejectForm({handleRejectRequest}) {

    const initialRejectionData = {
        rejectionReason: '',
        rejectionComment: '',
        status: 'REJECTED'
    }
    const [rejectionData, setRejectionData] = useState(initialRejectionData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRejectionData(prev => ({...prev, [name]: value}));
    };

    return (
        <div className={styles.inputGroup}>
            <select
                name="rejectionReason"
                value={rejectionData.rejectionReason}
                onChange={handleChange}
                required
            >
                <option value="">Select a reason</option>
                {Object.entries(REJECTION_REASONS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
            <CommentTextArea
                name={'rejectionComment'}
                value={rejectionData.rejectionComment}
                handleChange={handleChange}
            />

            <div className={styles.rejectRequestModalBottomSection}>
                <DenserButton buttonText={'Reject'} handleButtonClick={()=>handleRejectRequest(rejectionData)}/>
            </div>
        </div>
)
    ;
}

export default RejectForm;