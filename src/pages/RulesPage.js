import RulesCard from "../componenets/common/RulesCard";
import styles from '../styles/RulesPage.module.css'
import {useOutletContext} from "react-router-dom";
import ReimbursementForm from "../componenets/common/ReimbursementForm";
import Modal from "react-modal";


function RulesPage() {
    const { isOpen, setIsOpen } = useOutletContext()

    return (
        <div className={styles.rulesPage}>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={`${styles.modalContent}`}
                overlayClassName={`${styles.modalOverlay}`}
                closeTimeoutMS={300}
                ariaHideApp={false}
            >
                <ReimbursementForm setIsOpen={setIsOpen} />
            </Modal>
        </div>
    );
}

export default RulesPage;