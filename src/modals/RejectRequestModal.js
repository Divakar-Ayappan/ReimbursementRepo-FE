import React, {useState} from 'react';
import styles from '../styles/RejectRequestModal.module.css'
import {X} from "lucide-react";
import CommentTextArea from "../componenets/common/CommentTextArea";
import {REJECTION_REASONS} from "../commons/Constants";
import DenserButton from "../componenets/common/DenserButton";
import {rejectRequest} from "../api/requestApis";

const initialRejectionData = {
    rejectionReason: '',
    rejectionComment: '',
    status: 'REJECTED'
}

function RejectRequestModal({isOpen, rejectRequestModalClose, rDetails}) {
    const [rejectionData, setRejectionData] = useState(initialRejectionData);

    if(!isOpen) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRejectionData(prev => ({...prev, [name]: value}));
    };

    const handleRejectRequest = () => {
        console.log("Rejecting request: ", rDetails.requestId);
        rejectRequest(rDetails.requestId, rejectionData);
        rejectRequestModalClose();
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.modalOverlay} onClick={rejectRequestModalClose}>
            <div className={styles.modalContent} onClick={handleContentClick}>
                <button className={styles.closeButton} onClick={rejectRequestModalClose}>
                    <X/>
                </button>
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
                        <DenserButton buttonText = {'Reject'} handleButtonClick = {handleRejectRequest}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RejectRequestModal;