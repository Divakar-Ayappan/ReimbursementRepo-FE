import RulesCard from "../componenets/common/RulesCard";
import styles from '../styles/RulesPage.module.css';
import {useOutletContext} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {createReimbursementRequest, getAllRules} from "../api/requestApis";
import {toast} from "react-toastify";
import PageWithModal from "../modals/PageWithModal";

function RulesPage() {
    const { isRFormOpen, setIsRFormOpen } = useOutletContext();
    const queryClient = useQueryClient();

    const handleFormSubmit = async (formData) => {
        try {
            await createReimbursementRequest(formData);
            toast.success("Request submitted");
            isRFormOpen(false);
            queryClient.invalidateQueries(['requests']);
        } catch (err) {
            toast.error("Failed to submit request");
        }
    };

    const { data: rules, isLoading, error } = useQuery({
        queryKey: ['rules', { rulesFilter: "ACTIVE" }],
        queryFn: () => getAllRules({ rulesFilter: "ACTIVE" }),
        onError: () => toast.error('Failed to load rules'),
    });
    if (isLoading) return <p>Loading rules...</p>;
    if (error) return <p>Error loading rules</p>;
    if (!rules || rules.length === 0) return <p>No rules available</p>;

    return (
        <PageWithModal isRFormOpen={isRFormOpen} setIsRFormOpen={setIsRFormOpen}
                       onSubmit={handleFormSubmit} rules={rules} setFormOpeningMode={()=> ''}>
            <div className={styles.rulesPage}>
                {rules.map(rule => (
                    <RulesCard key={rule.ruleId} rule={rule} />
                ))}
            </div>
        </PageWithModal>
    );
}

export default RulesPage;
