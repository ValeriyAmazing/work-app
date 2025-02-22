// components/StudentItem.js
import React from 'react';
import styles from './StudentsList.module.css';

const StudentItem = ({ student, onDelete }) => {
    return (
        <li className={styles.item}>
            <img src={student.avatar} alt={student.name} className={styles.avatar} />
            <div className={styles.details}>
                <span>{student.name}</span>
                <span>{student.phone}</span>
                <span>Проведено часов: {student.hours}</span>
            </div>
            <button onClick={() => onDelete(student.id)} className={styles.deleteButton}>🗑️</button>
        </li>
    );
};

export default StudentItem;