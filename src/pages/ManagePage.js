import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {approveRequest, getRequestsForActioner, rejectRequest} from "../api/requestApis";
import {toast} from "react-toastify";
import styles from "../styles/OverviewPage.module.css";
import DisplayCard from "../componenets/common/DisplayCard";
import ReimbursementDetailsCard from "../componenets/common/ReimbursementDetailsCard";
import RModal from "../modals/RModal";
import {useOutletContext} from "react-router-dom";
import RejectForm from "../componenets/common/RejectForm";

function ManagePage() {


    const {isRDetailsCardOpen, setIsRDetailsCardOpen} = useOutletContext();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const {data: requests, isLoading, error} = useQuery({
        queryKey: ['requestsForActioner'],
        queryFn: () => getRequestsForActioner({filter: 'PENDING'}),
        onError: () => toast.error('Failed to load requests'),
    });

    const handleAcceptRequest = async () => {
        await approveRequest(selectedRequest.requestId, {status: "APPROVED"})
        toast.success("Request approved successfully!")
        setIsRDetailsCardOpen(false);
    }

    const handleRejectRequest = async (rejectionData) => {
        await rejectRequest(selectedRequest.requestId, rejectionData);
        toast.success('Request rejected successfully!')
        setIsRDetailsCardOpen(false);
        setIsRejectModalOpen(false);
    }

    if(isLoading) return <div>Loading request please wait...</div>
    if(error) return <div> Something went wrong!</div>

    return (
        <>
            <div className={styles.overViewPage}>
                {(!requests || requests.length === 0) ? (
                    <p>No requests available</p>
                ) : (
                    requests.map(request => (
                        <DisplayCard
                            key={request.requestId}
                            request={request}
                            onClick={() => {setSelectedRequest(request); setIsRDetailsCardOpen(true);}}
                        />
                    ))
                )}
            </div>

            <RModal isOpen={isRDetailsCardOpen} onClose={()=>{setIsRDetailsCardOpen(false)}}>
                <ReimbursementDetailsCard
                    rDetails = {selectedRequest}
                    handleAcceptRequest = {handleAcceptRequest}
                    handleRejectButtonClick = {()=> setIsRejectModalOpen(true)}
                />
            </RModal>

            <RModal isOpen={isRejectModalOpen} onClose={()=> setIsRejectModalOpen(false)}>
                <RejectForm handleRejectRequest={handleRejectRequest}/>
            </RModal>
        </>
    );
}

export default ManagePage;