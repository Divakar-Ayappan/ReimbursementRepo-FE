import React from 'react'
import styles from '../styles/RModal.module.css'
import {X} from "lucide-react";

export default function RModal({isOpen, onClose, children}) {
    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} onClick= {onClose}>
            <div className={styles.modalContent} onClick={(e)=> e.stopPropagation()}>
                <button className={styles.closeButton} onClick= {onClose}>
                    <X/>
                </button>
                {children}
            </div>
        </div>
    )
}
