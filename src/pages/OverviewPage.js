import DisplayCard from "../componenets/common/DisplayCard";
import Modal from 'react-modal';
import ReimbursementForm from "../componenets/common/ReimbursementForm";
import {useOutletContext} from "react-router-dom";

function OverviewPage() {
    const { isOpen, setIsOpen } = useOutletContext()

    return (
        <div>
            <DisplayCard />
            <Modal isOpen={isOpen} >
                <ReimbursementForm setIsOpen={setIsOpen}  />
            </Modal>
        </div>
    );
}

export default OverviewPage;