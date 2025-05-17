import React, {useEffect, useState} from 'react';
import styles from '../../styles/ReimbursementForm.module.css';
import {convertISOToSmallDate} from "../../utils/Utils.js";

export default function ReimbursementForm({onSubmit, setIsRFormOpen, rules, employees, formDataProps, formOpeningMode}) {

    const initialFormData = {
        employeeId: '8eb8f758-d146-4098-9524-a0a7d53b5024',
        fromDate: '',
        toDate: '',
        ruleCategory: '',
        amount: 0,
        attachmentUrl: '',
        claimedDates: [],
        comment: '',
        beneficiaryEmployeeIds: []
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (formOpeningMode === 'EDIT' && formDataProps) {
            setFormData({
                employeeId: formDataProps.employeeId || '',
                fromDate: formDataProps.fromDate || '',
                toDate: formDataProps.toDate || '',
                ruleCategory: formDataProps.ruleCategory || '',
                amount: formDataProps.amount || 0,
                attachmentUrl: formDataProps.attachmentUrl || '',
                claimedDates: formDataProps.claimedDates || [],
                comment: formDataProps.comment || '',
                beneficiaryEmployeeIds: formDataProps.beneficiaryEmployeeIds || []
            });
        } else {
            setFormData(initialFormData);
            console.log(formData.amount)
        }
    }, [formDataProps, formOpeningMode, initialFormData]);

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
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            {formDataProps
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
                            if (prev.beneficiaryEmployeeIds?.includes(selectedId)) return prev;
                            return {
                                ...prev,
                                beneficiaryEmployeeIds: [...(prev.beneficiaryEmployeeIds || []), selectedId]
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
                    {formData.beneficiaryEmployeeIds?.map(id => {
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
                                                beneficiaryEmployeeIds: prev.beneficiaryEmployeeIds.filter(eid => eid !== id)
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
                    step="0.01"
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Attachment URL</label>
                <input
                    type="url"
                    name="attachmentUrl"
                    placeholder="https://"
                    value={formData.attachmentUrl}
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
                    name="comment"
                    placeholder="Add any additional details or comments here..."
                    value={formData.comment}
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
                    formDataProps
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
