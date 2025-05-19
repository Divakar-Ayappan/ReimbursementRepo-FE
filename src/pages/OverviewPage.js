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
import PageWithModal from "../modals/PageWithModal";
import {useState} from "react";
import RDetailsModal from "../modals/RDetailsModal";

function OverviewPage() {
    const {isRFormOpen, setIsRFormOpen} = useOutletContext();
    const queryClient = useQueryClient();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [formDataProps, setFormDataProps] = useState(null);
    const [formOpeningMode, setFormOpeningMode] = useState('');


    const {data: requests, isLoading, error} = useQuery({
        queryKey: ['requests'],
        queryFn: () => getAllRequestsByEmployee('8eb8f758-d146-4098-9524-a0a7d53b5024'),
        onError: () => toast.error('Failed to load rules'),
    });

    const {data: rules} = useQuery({
        queryKey: ['rules', {rulesFilter: "ACTIVE"}],
        queryFn: () => getAllRules({rulesFilter: "ACTIVE"}),
        onError: () => toast.error('Failed to load rules'),

    });

    const {data: employees} = useQuery({
        queryKey: ['employees',],
        queryFn: () => getAllEmployees(),
        onError: () => toast.error('Failed to load rules'),
    });


    if (isLoading) return <p>Loading requests...</p>;
    if (error) return <p>Error loading requests</p>;
    if (!requests || requests.length === 0) return <p>No requests available</p>;

    const handleFormSubmit = async (formData, formOpeningMode) => {
        try {
            if(formOpeningMode === 'EDIT') {
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

    const handleCancelRequest = async (requestId) => {
        await cancelRequest(requestId);
        setSelectedRequest(null);
        toast.success("Request cancelled successfully!")
    }


    return (
        <PageWithModal isRFormOpen={isRFormOpen} setIsRFormOpen={setIsRFormOpen}
                       onSubmit={handleFormSubmit} rules={rules} employees={employees}
                       formDataProps={formDataProps} formOpeningMode={formOpeningMode}
                       setFormOpeningMode={setFormOpeningMode}>
            <div className={styles.overViewPage}>
                {requests.map(request => (
                    <DisplayCard key={request.requestId} request={request} onClick={()=>setSelectedRequest(request)}/>
                ))}
            </div>
            <RDetailsModal
                isOpen={selectedRequest}
                rDetailsCardClose={() => setSelectedRequest(null)}
                request={selectedRequest}
                setIsRFormOpen={setIsRFormOpen}
                setFormDataProps={setFormDataProps}
                setFormOpeningMode={setFormOpeningMode}
                handleCancelRequest={handleCancelRequest}
            />
        </PageWithModal>
    );
}

export default OverviewPage;