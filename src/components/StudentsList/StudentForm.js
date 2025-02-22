// components/StudentForm.js
import React from 'react';
import styles from './StudentsList.module.css';

const StudentForm = ({ name, setName, phone, setPhone, onAddStudent }) => {
    return (
        <div className={styles.form}>
            <input
                type="text"
                placeholder="Имя ученика"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
            />
            <button onClick={onAddStudent} className={styles.button}>Добавить ученика</button>
        </div>
    );
};

export default StudentForm;