import Modal from "react-modal";
import styles from "../styles/PageModal.module.css";
import ReimbursementForm from "../componenets/common/ReimbursementForm";

function PageWithModal({ isOpen, setIsOpen, children , onSubmit, rules , employees}) {
    return (
        <div className={styles.pageWrapper}>
            {children}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                closeTimeoutMS={300}
                ariaHideApp={false}
            >
                <ReimbursementForm setIsOpen={setIsOpen} onSubmit={onSubmit} rules={rules} employees={employees} />
            </Modal>
        </div>
    );
}

export default PageWithModal;
