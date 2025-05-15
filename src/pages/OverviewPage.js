import DisplayCard from "../componenets/common/DisplayCard";
import {useOutletContext} from "react-router-dom";
import styles from "../styles/OverviewPage.module.css";
import {useQuery} from "@tanstack/react-query";
import {createReimbursementRequest, getAllRequestsByEmployee} from "../api/requestApis";
import {toast} from "react-toastify";
import PageWithModal from "../modals/PageWithModal";
import { useQueryClient } from '@tanstack/react-query';

function OverviewPage() {
    const { isOpen, setIsOpen } = useOutletContext()
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['requests', { rulesFilter: "ACTIVE" }],
        queryFn: () => getAllRequestsByEmployee('8eb8f758-d146-4098-9524-a0a7d53b5024'),
        onError: () => toast.error('Failed to load rules'),
    });
    if (isLoading) return <p>Loading requests...</p>;
    if (error) return <p>Error loading requests</p>;
    if (!data || data.length === 0) return <p>No rules available</p>;

    const handleFormSubmit = async (formData) => {
        console.log("submit");
        try {
            console.log(formData)
            await createReimbursementRequest(formData);
            toast.success("Request submitted");
            setIsOpen(false);
            queryClient.invalidateQueries(['requests']);
        } catch (err) {
            toast.error("Failed to submit request");
        }
    };


    return (
        <PageWithModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleFormSubmit}>
            <div className={styles.overViewPage}>
                {data.map(request => (
                    <DisplayCard key={request.requestId} request={request}/>
                ))}
            </div>
        </PageWithModal>
);
}

export default OverviewPage;