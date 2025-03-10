// components/LessonForm.js
import React, { useEffect } from "react";
import styles from "./LessonForm.module.css";

const LessonForm = ({
    date,
    setDate,
    studentId,
    setStudentId,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    students,
    onSubmit,
    onCancel,
    initialDate, // Начальная дата
    initialTime, // Начальное время
}) => {
    // Устанавливаем начальные значения при открытии формы
    useEffect(() => {
        if (initialDate) setDate(initialDate);
        if (initialTime) setStartTime(initialTime);
    }, [initialDate, initialTime, setDate, setStartTime]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Дата:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Ученик:
                <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">Выберите ученика</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </label>
            <label className={styles.label}>
                Начало занятия:
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Конец занятия:
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className={styles.input}
                />
            </label>
            <div className={styles.buttons}>
                <button type="submit" className={styles.button}>
                    Добавить
                </button>
                <button type="button" onClick={onCancel} className={styles.buttonCancel}>
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default LessonForm;