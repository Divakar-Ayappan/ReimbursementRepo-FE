import React from "react";
import styles from "../styles/DetailsModal.module.css";
import {X} from "lucide-react";
import ReimbursementDetailsCard from "../componenets/common/ReimbursementDetailsCard";

function RDetailsModal({isOpen, rDetailsCardClose, request, setIsRFormOpen, setFormDataProps, setFormOpeningMode, handleCancelRequest}) {
    if (!isOpen) return null;

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.modalOverlay} onClick={rDetailsCardClose}>
            <div className={styles.modalContent} onClick={handleContentClick}>
                <button className={styles.closeButton} onClick={rDetailsCardClose}>
                    <X/>
                </button>
                <ReimbursementDetailsCard
                    rDetailsCardClose={rDetailsCardClose}
                    rDetails={request}
                    setIsRFormOpen={setIsRFormOpen}
                    setFormDataProps={setFormDataProps}
                    setFormOpeningMode={setFormOpeningMode}
                    handleCancelRequest={handleCancelRequest}
                />
            </div>
        </div>
    );
}

export default RDetailsModal;
