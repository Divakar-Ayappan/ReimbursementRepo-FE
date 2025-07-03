import React from 'react';
import styles from "../../styles/RejectRequestModal.module.css";

function DenserButton({buttonText, handleButtonClick}) {
    return (
        <button onClick={() => {
            handleButtonClick();
            // handleCancelRequest(rDetails.requestId);
            // rejectRequestModalClose();
        }} type="submit" className={styles.rejectRequestModalRejectRequestButton}> {buttonText}
        </button>
    );
}

export default DenserButton;