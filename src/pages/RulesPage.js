import RulesCard from "../componenets/common/RulesCard";
import styles from '../styles/RulesPage.module.css';
import {useOutletContext} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {createReimbursementRequest, getAllRules} from "../api/requestApis";
import {toast} from "react-toastify";
import PageWithModal from "../modals/PageWithModal";

function RulesPage() {
    const { isOpen, setIsOpen } = useOutletContext();
    const queryClient = useQueryClient();

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

    const { data, isLoading, error } = useQuery({
        queryKey: ['rules', { rulesFilter: "ACTIVE" }],
        queryFn: () => getAllRules({ rulesFilter: "ACTIVE" }),
        onError: () => toast.error('Failed to load rules'),
    });
    if (isLoading) return <p>Loading rules...</p>;
    if (error) return <p>Error loading rules</p>;
    if (!data || data.length === 0) return <p>No rules available</p>;

    return (
        <PageWithModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleFormSubmit}>
            <div className={styles.rulesPage}>
                {data.map(rule => (
                    <RulesCard key={rule.ruleId} rule={rule} />
                ))}
            </div>
        </PageWithModal>
    );
}

export default RulesPage;
