import React, {useEffect, useState} from 'react';
import styles from '../../styles/ReimbursementForm.module.css';
import {convertISOToSmallDate} from "../../utils/Utils.js";

const initialFormData = {
    employeeId: '8eb8f758-d146-4098-9524-a0a7d53b5024',
    fromDate: '',
    toDate: '',
    ruleCategory: '',
    amount: 0,
    attachment: '',
    claimedDates: [],
    commentByRequester: '',
    employees: []
};

export default function ReimbursementForm({onSubmit, setIsRFormOpen, rules, employees, formDataProps, formOpeningMode}) {

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formOpeningMode === 'EDIT' && formDataProps) {
            setFormData({
                employeeId: formData.employeeId || '',
                fromDate: formDataProps.fromDate || '',
                toDate: formDataProps.toDate || '',
                ruleCategory: formDataProps.ruleCategory || '',
                amount: formDataProps.amount || 0,
                attachment: formDataProps.attachment || '',
                claimedDates: formDataProps.claimedDates || [],
                commentByRequester: formDataProps.commentByRequester || '',
                employees: formDataProps.employees || []
            });
        } else {
            setFormData(initialFormData);
        }
    }, [formData.employeeId, formDataProps, formOpeningMode]);

    // Handle change for normal inputs
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    // Special handler for claimedDates (add one date at a time)
    const handleAddClaimedDate = (e) => {
        const newDate = e.target.value;
        if (newDate && !formData.claimedDates.includes(newDate)) {
            setFormData(prev => ({
                ...prev,
                claimedDates: [...prev.claimedDates, newDate],
            }));
        }
        e.target.value = ''; // clear input after adding
    };

    // Remove a claimed date from the list
    const handleRemoveClaimedDate = (dateToRemove) => {
        setFormData(prev => ({
            ...prev,
            claimedDates: prev.claimedDates.filter(d => d !== dateToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit( formData, formOpeningMode);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            {formOpeningMode === 'EDIT'
                ? <h2 className={styles.title}>Edit Reimbursement Request</h2>
                : <h2 className={styles.title}>New Reimbursement Request</h2>}

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>From Date</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>To Date</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Rule Category</label>
                <select
                    name="ruleCategory"
                    value={formData.ruleCategory}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    {rules && rules.map(rules => (
                        <option key={rules.ruleCategory} value={rules.ruleCategory}>{rules.ruleCategory}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Beneficiaries</label>
                <select
                    name="employees"
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) return;
                        setFormData(prev => {
                            if (prev.employees?.includes(selectedId)) return prev;
                            return {
                                ...prev,
                                employees: [...(prev.employees || []), selectedId]
                            };
                        });
                        e.target.value = '';
                    }}
                    defaultValue=""
                >
                    <option value="">Select employee</option>
                    {employees?.map(emp => (
                        <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.firstName} {emp.lastName}
                        </option>
                    ))}
                </select>

                <ul className={styles.multiSelectList}>
                    {formData.employees?.map(id => {
                        const emp = employees.find(e => e.employeeId === id);
                        if (!emp) return null;
                        return (
                            <li key={id} className={styles.multiSelectItem}>
                                {emp.firstName} {emp.lastName}
                                <button className={styles.removeMultiSelectedItemX}
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                employees: prev.employees.filter(eid => eid !== id)
                                            }));
                                        }}
                                >
                                    &times;
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>


            <div className={styles.inputGroup}>
                <label>Amount ($)</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Attachment URL</label>
                <input
                    type="url"
                    name="attachment"
                    placeholder="https://"
                    value={formData.attachment}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Claimed Dates</label>
                <input
                    type="date"
                    onChange={handleAddClaimedDate}
                />
                <small className={styles.helperText}>Select dates one by one if multiple</small>

                <ul className={styles.multiSelectList}>
                    {formData.claimedDates.map(date => {
                        return (
                            <li key={date} className={styles.multiSelectItem}>
                                {convertISOToSmallDate(date)}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveClaimedDate(date)}
                                    className={styles.removeMultiSelectedItemX}
                                >
                                    &times;
                                </button>
                            </li>
                        );
                    })}
                </ul>

            </div>

            <div className={styles.inputGroup}>
                <label>Comment</label>
                <textarea
                    name="commentByRequester"
                    placeholder="Add any additional details or comments here..."
                    value={formData.commentByRequester}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={() => setIsRFormOpen(false)}
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
                {
                    formOpeningMode === 'EDIT'
                        ? <button type="submit" className={styles.submitButton}>
                            Edit Request
                        </button>
                        : <button type="submit" className={styles.submitButton}>
                            Create Request
                        </button>
                }
            </div>
        </form>
    );
}
