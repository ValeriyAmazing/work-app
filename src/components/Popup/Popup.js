// components/Popup.js
import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;