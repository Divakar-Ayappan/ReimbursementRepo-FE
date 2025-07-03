import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllRequestsByEmployee, getRequestsForActioner, rejectRequest} from "../api/requestApis";
import {toast} from "react-toastify";
import styles from "../styles/OverviewPage.module.css";
import DisplayCard from "../componenets/common/DisplayCard";
import RDetailsModal from "../modals/RDetailsModal";
import RejectRequestModal from "../modals/RejectRequestModal";

function ManagePage() {

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const {data: requests, isLoading, error} = useQuery({
        queryKey: ['requestsForActioner'],
        queryFn: () => getRequestsForActioner(),
        onError: () => toast.error('Failed to load equests'),
    });


    const handleApproveRequest = async (requestId)=> {
        // await
    }



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
                            onClick={() => {setSelectedRequest(request); setIsDetailsModalOpen(true);}}
                        />
                    ))
                )}
            </div>

            <RDetailsModal
                isOpen={isDetailsModalOpen}
                rDetailsCardClose={() => {setIsDetailsModalOpen(false); setSelectedRequest(null);}}
                request={selectedRequest}
                handleRejectRequest={()=> setIsRejectModalOpen(true)}
            />

            <RejectRequestModal
                isOpen={isRejectModalOpen}
                rejectRequestModalClose = {() =>{setIsRejectModalOpen(false);}}
                rDetails={selectedRequest}
            />
        </>
    );
}

export default ManagePage;