import React, {useEffect, useState} from 'react'
import styles from '../styles/RModal.module.css'
import {X} from "lucide-react";

export default function RModal({isOpen, onClose, children}) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen])

    console.log("Modal state is: ", isOpen);
    console.log("Internal Modal state is: ", isModalOpen);
    if (!isModalOpen) return null

    const handleClose = onClose ?? (() => setIsModalOpen(false));

    return (
        <div className={styles.modalOverlay} onClick= {handleClose}>
            <div className={styles.modalContent} onClick={(e)=> e.stopPropagation()}>
                <button className={styles.closeButton} onClick= {handleClose}>
                    <X/>
                </button>
                {children}
            </div>
        </div>
    )
}
