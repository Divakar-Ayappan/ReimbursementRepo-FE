import DisplayCard from "../componenets/common/DisplayCard";
import {useOutletContext} from "react-router-dom";
import styles from "../styles/OverviewPage.module.css";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    cancelRequest,
    createReimbursementRequest,
    editReimbursementRequest,
    getAllEmployees,
    getAllRequestsByEmployee,
    getAllRules
} from "../api/requestApis";
import {toast} from "react-toastify";
import {useState} from "react";
import RModal from "../modals/RModal";
import ReimbursementForm from "../componenets/common/ReimbursementForm";
import ReimbursementDetailsCard from "../componenets/common/ReimbursementDetailsCard";

function OverviewPage() {
    const {isRFormOpen, setIsRFormOpen, setRFormOpeningMode,isRDetailsCardOpen, setIsRDetailsCardOpen} = useOutletContext();
    const queryClient = useQueryClient();
    const [selectedRequest, setSelectedRequest] = useState(null);


    const {data: requests, isLoading, error} = useQuery({
        queryKey: ['requests'],
        queryFn: () => getAllRequestsByEmployee(),
        onError: () => toast.error('Failed to load rules'),
    });

    const {data: rules} = useQuery({
        queryKey: ['rules', {rulesFilter: "ACTIVE"}],
        queryFn: () => getAllRules({rulesFilter: "ACTIVE"}),
        onError: () => toast.error('Failed to load rules'),

    });

    const {data: employees} = useQuery({
        queryKey: ['employees'],
        queryFn: () => getAllEmployees(),
        onError: () => toast.error('Failed to load rules'),
    });


    if (isLoading) return <p>Loading requests...</p>;
    if (error) return <p>Error loading requests</p>;
    if (requests) console.log(requests);

    const handleFormSubmit = async (formData, formOpeningMode) => {
        try {
            if (formOpeningMode === 'EDIT') {
                await editReimbursementRequest(selectedRequest.requestId, formData);
            } else {
                await createReimbursementRequest(formData);
            }
            toast.success("Request submitted");
            setIsRFormOpen(false);
            queryClient.invalidateQueries(['requests']);
        } catch (err) {
            toast.error("Failed to submit request");
        }
    };

    const handleEditRequest = () => {
        setIsRDetailsCardOpen(false)
        setRFormOpeningMode('EDIT')
        setIsRFormOpen(true);
    }

    const handleCancelRequest = async (requestId) => {
        await cancelRequest(requestId);
        setSelectedRequest(null);
        toast.success("Request cancelled successfully!")
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
                            onClick={() => {setSelectedRequest(request); setIsRDetailsCardOpen(true)}}
                        />
                    ))
                )}
            </div>
            <RModal isOpen={isRFormOpen} onClose={()=>setIsRFormOpen(false)}>
                <ReimbursementForm onSubmit={handleFormSubmit}
                                   rules={rules}
                                   employees={employees}
                                   formDataProps={selectedRequest}
                />
            </RModal>

            <RModal isOpen={isRDetailsCardOpen} onClose={()=>{setIsRDetailsCardOpen(false)}}>
                <ReimbursementDetailsCard
                    rDetails = {selectedRequest}
                    handleEditRequest={handleEditRequest}
                    handleCancelRequest={handleCancelRequest}
                />
            </RModal>
        </>
    );
}

export default OverviewPage;