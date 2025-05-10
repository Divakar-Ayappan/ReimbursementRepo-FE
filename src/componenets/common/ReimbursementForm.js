import React from 'react';
import styles from '../../styles/ReimbursementForm.module.css';

export default function ReimbursementForm({setIsOpen}) {
    return (
        <form className={styles.form}>
            <h2 className={styles.title}>New Reimbursement Request</h2>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>From Date</label>
                    <input type="date" />
                </div>
                <div className={styles.inputGroup}>
                    <label>To Date</label>
                    <input type="date" />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Rule Category</label>
                <select>
                    <option>Select a category</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Amount ($)</label>
                <input type="number" defaultValue={0} />
            </div>

            <div className={styles.inputGroup}>
                <label>Attachment URL</label>
                <input type="url" placeholder="https://" />
            </div>

            <div className={styles.inputGroup}>
                <label>Claimed Dates</label>
                <input type="date" multiple />
                <small className={styles.helperText}>Select dates one by one if multiple</small>
            </div>

            {/*<div className={styles.inputGroup}>*/}
            {/*    <label>Employees</label>*/}
            {/*    <div className={styles.checkboxGroup}>*/}
            {/*        <label><input type="checkbox" /> John Doe</label>*/}
            {/*        <label><input type="checkbox" /> Jane Smith</label>*/}
            {/*        <label><input type="checkbox" /> Michael Johnson</label>*/}
            {/*        <label><input type="checkbox" /> Emily Williams</label>*/}
            {/*        <label><input type="checkbox" /> Robert Brown</label>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={styles.inputGroup}>
                <label>Comment</label>
                <textarea placeholder="Add any additional details or comments here..." />
            </div>

            <div className={styles.actions}>
                <button type="button" onClick={()=>setIsOpen(false)} className={styles.cancelButton}>Cancel</button>
                <button type="submit" onClick={()=>setIsOpen(false)} className={styles.submitButton}>Create Request</button>
            </div>
        </form>
    );
}
