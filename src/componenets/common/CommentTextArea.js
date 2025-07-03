import React from 'react';
import styles from "../../styles/CommentTextArea.module.css";

function CommentTextArea({value, handleChange, name}) {
    return (
        <div className={styles.inputGroup}>
            <label>Comment</label>
            <textarea
                name={name}
                placeholder="Add any additional details or comments here..."
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default CommentTextArea;