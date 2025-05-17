import Modal from "react-modal";
import styles from "../styles/PageModal.module.css";
import ReimbursementForm from "../componenets/common/ReimbursementForm";

function PageWithModal({
                           isRFormOpen,
                           setIsRFormOpen,
                           children,
                           onSubmit,
                           rules,
                           employees,
                           formDataProps,
                           formOpeningMode,
                           setFormOpeningMode,
                       }) {
    return (
        <div className={styles.pageWrapper}>
            {children}
            <Modal
                isOpen={isRFormOpen}
                onRequestClose={() => {
                    setIsRFormOpen(false);
                    setFormOpeningMode('');
                }
                }
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                closeTimeoutMS={300}
                ariaHideApp={false}
            >
                <ReimbursementForm
                    formDataProps={formDataProps}
                    setIsRFormOpen={setIsRFormOpen}
                    onSubmit={onSubmit}
                    rules={rules}
                    employees={employees}
                    formOpeningMode={formOpeningMode}
                />

            </Modal>
        </div>
    );
}

export default PageWithModal;
