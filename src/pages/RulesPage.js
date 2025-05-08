import RulesCard from "../componenets/common/RulesCard";
import styles from '../styles/RulesPage.module.css'


function RulesPage() {

    return (
        <div className={styles.rulesPage}>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
            <RulesCard/>
        </div>
    );
}

export default RulesPage;