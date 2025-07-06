import styles from '../../styles/ReimbursementDetailsCard.module.css'
import {IndianRupee} from 'lucide-react';
import StatusBadge from "./StatusBadge";
import {convertISOToLongDate, convertISOToSmallDate} from "../../utils/Utils.js";
import React from "react";
import MultiItemsCard from "./MultiItemsCard";
import {USER_DETAILS_NAME} from "../../commons/Constants";
import {useOutletContext} from "react-router-dom";

function ReimbursementDetailsCard({rDetails, handleCancelRequest, handleRejectRequest, handleEditRequest}) {
    const userDetails = JSON.parse(sessionStorage.getItem(USER_DETAILS_NAME));
    const role = userDetails?.role;

    return (
        <div className={styles.rDetailsCard}>
            <div className={styles.rDetailsCardTopSection}>
                <h3> Reimbursement Request Details </h3>
            </div>

            <div className={styles.rDetailsCardCategoryStatusSection}>
                <div className={styles.rDetailsCardCategoryText}> {rDetails.ruleCategory} Request</div>
                <div className={styles.rDetailsCardStatusBadge}><StatusBadge status={rDetails.status}/></div>
            </div>

            <div className={styles.rDetailsFromToDateSection}>
                <div className={styles.rDetailsFromToDate}>
                    <div className={styles.rDetailsFromToDateText}> From Date:</div>
                    <div>{convertISOToSmallDate(rDetails.fromDate)}</div>
                </div>
                <div className={styles.rDetailsFromToDate}>
                    <div className={styles.rDetailsFromToDateText}> To Date:</div>
                    <div>{convertISOToSmallDate(rDetails.toDate)}</div>
                </div>
            </div>

            <div className={styles.rDetailsCardCardAmtSection}>
                <div className={styles.rDetailsCardCardAmtText}> Amount:</div>
                <IndianRupee className={styles.rDetailsCardCardAmtSymbol}/>
                <div className={styles.rDetailsCardCardAmtValue}> {rDetails.amount} </div>
            </div>

            <div className={styles.rDetailsCardClaimedDatesSection}>
                <div className={styles.rDetailsCardClaimedDatesText}> Claimed Dates:</div>
                <div className={styles.rDetailsCardClaimedDatesContainer}>
                    {rDetails.claimedDates.map(date => (
                        <MultiItemsCard key={date} data={convertISOToLongDate(date)}/>
                    ))}
                </div>
            </div>

            {role !== 'EMPLOYEE' &&
                <div className={styles.rDetailsCardEmployeeSection}>
                    <div> Requested by: </div> <div>{rDetails.employeeId.slice(0, 15)}</div>
                </div>
            }

            {rDetails.employees[0] && <div className={styles.rDetailsCardEmployeesSection}>
                <div className={styles.rDetailsCardEmployeesText}> Claimed for:</div>
                <div className={styles.rDetailsCardEmployeesContainer}>
                    {rDetails.employees.map(employee => (
                        <MultiItemsCard key={employee} data={employee.slice(0, 15)}/>
                    ))}
                </div>
            </div>}

            <div className={styles.rDetailsCardAttachmentSection}>
                <div className={styles.rDetailsCardAttachmentText}> Attachment:</div>
                <div className={styles.rDetailsCardAttachmentLink}>
                    <a href={rDetails.attachment}
                       target="_blank" //Open in new tab
                       rel="noopener noreferrer" //Adds security
                    >
                        View Attachment
                    </a>
                </div>
            </div>

            {rDetails.commentByRequester &&
            <div className={styles.rDetailsCardCommentSection}>
                <div className={styles.rDetailsCardCommentText}> Comment: </div>
                <div className={styles.rDetailsCardComment}> {rDetails.commentByRequester} </div>
            </div>
            }

            <div className={styles.rDetailsCardCreatedAtSection}>
                <div className={styles.rDetailsCardCreatedAtText}> Created at:  </div>
                <div className={styles.rDetailsCardCreatedAtDate}> {convertISOToLongDate(rDetails.createdAt)} </div>
            </div>

            {role === 'EMPLOYEE' &&
                <div className={styles.rDetailsCardBottomSection}>
                    <button onClick={()=> {handleEditRequest()}} type="submit" className={styles.rDetailsCardEditRequestButton}>Edit Request</button>
                    <button onClick={()=> {handleCancelRequest(rDetails.requestId);} } type="submit" className={styles.rDetailsCardCancelRequestButton}>Cancel Request</button>
                </div>
            }

            {role !== 'EMPLOYEE' &&
                <div className={styles.rDetailsCardBottomSection}>
                    <button onClick={()=> {}} type="submit" className={styles.rDetailsCardApproveRequestButton}>Approve Request</button>
                    <button onClick={()=> {handleRejectRequest(rDetails.requestId);} } type="submit" className={styles.rDetailsCardRejectRequestButton}>Reject Request</button>
                </div>
            }
        </div>
    );
}

export default ReimbursementDetailsCard;