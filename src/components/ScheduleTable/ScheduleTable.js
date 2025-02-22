// components/ScheduleTable.js
import React, { useState, useContext } from "react";
import LessonsContext from "../../context/LessonsContext";
import AddLessonButton from "../AddLessonButton/AddLessonButton";
import { getStudentInfo } from "../../utils/getStudentInfo";
import { formatMonthYear } from "../../utils/formatMonthYear";
import styles from "./ScheduleTable.module.css";

const ScheduleTable = () => {
    const { lessons, deleteLesson } = useContext(LessonsContext);
    const [weekOffset, setWeekOffset] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Получаем даты для текущей недели
    const getWeekDates = () => {
        const dates = [];
        const today = new Date();
        today.setDate(today.getDate() + weekOffset * 7); // Сдвиг на неделю
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setHours(2)
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Форматируем дату
    const formatDate = (date) => {
        return date.toLocaleDateString("ru-RU", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    // Генерация часов
    const generateHours = () => {
        const hours = [];
        for (let i = 8; i <= 22; i++) {
            hours.push(`${i.toString().padStart(2, "0")}:00`);
        }
        return hours;
    };

    // Вычисляем продолжительность занятия в часах
    const getLessonDuration = (lesson) => {
        const start = new Date(lesson.start);
        const end = new Date(lesson.end);
        return (end - start) / (1000 * 60 * 60); // Разница в часах
    };

    // Проверка, попадает ли занятие в текущий час
    const isLessonInHour = (lesson, hour, date) => {
        const lessonStart = new Date(lesson.start);
        const lessonEnd = new Date(lesson.end);
        const currentHour = new Date(date);
        currentHour.setHours(parseInt(hour.split(":")[0]), 0, 0, 0);

        return lessonStart <= currentHour && lessonEnd > currentHour;
    };

    // Получаем занятие для текущего часа и дня
    const getLessonForHour = (hour, date) => {
        return lessons.find((lesson) => {
            const lessonDate = new Date(lesson.start).toDateString();
            return (
                lessonDate === date.toDateString() && isLessonInHour(lesson, hour, date)
            );
        });
    };

    // Удаление занятия
    const handleDeleteLesson = (lessonId) => {
        if (window.confirm("Вы уверены, что хотите удалить занятие?")) {
            deleteLesson(lessonId);
        }
    };

    // Обработчик клика по ячейке
    const handleCellClick = (date, hour) => {
        setSelectedDate(date.toISOString().split("T")[0]); // Форматируем дату
        setSelectedTime(hour); // Устанавливаем время
        setIsPopupOpen(true); // Открываем попап
    };

    const weekDates = getWeekDates();
    const hours = generateHours();

    // Получаем название месяца и год для заголовка
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7); // Сдвиг на неделю
    const monthYear = formatMonthYear(today);

    return (
        <>
            <AddLessonButton
                isPopupOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                initialDate={selectedDate} // Передаем выбранную дату
                initialTime={selectedTime} // Передаем выбранное время
            />
            <div className={styles.tableContainer}>
                <div className={styles.weekNavigation}>
                    <button onClick={() => setWeekOffset(weekOffset - 1)}>
                        Предыдущая неделя
                    </button>
                    <span>{monthYear}</span>
                    <button onClick={() => setWeekOffset(weekOffset + 1)}>
                        Следующая неделя
                    </button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Время</th>
                            {weekDates.map((date, index) => (
                                <th key={index}>{formatDate(date)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour, hourIndex) => (
                            <tr key={hourIndex}>
                                <td className={styles.timeCell}>{hour}</td>
                                {weekDates.map((date, dateIndex) => {
                                    const lesson = getLessonForHour(hour, date);
                                    const student = lesson ? getStudentInfo(lesson.studentId) : null;

                                    // Если это начало занятия, отображаем ячейку с rowSpan
                                    if (lesson && new Date(lesson.start).getHours() === parseInt(hour.split(":")[0])) {
                                        const duration = getLessonDuration(lesson);
                                        return (
                                            <td
                                                key={dateIndex}
                                                className={styles.cell}
                                                rowSpan={duration} // Объединяем ячейки
                                                onClick={() => handleCellClick(date, hour)}
                                                data-tooltip={hour} // Добавляем tooltip
                                            >
                                                {student && (
                                                    <div className={styles.lesson}>
                                                        <img
                                                            src={student.avatar}
                                                            alt={student.name}
                                                            className={styles.avatar}
                                                        />
                                                        <div className={styles.studentInfo}>
                                                            <span>{student.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Останавливаем всплытие
                                                                handleDeleteLesson(lesson.lessonId);
                                                            }}
                                                            className={styles.deleteButton}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    }

                                    // Если это продолжение занятия, пропускаем ячейку
                                    if (lesson) {
                                        return null;
                                    }

                                    // Если занятий нет, отображаем пустую ячейку
                                    return (
                                        <td
                                            key={dateIndex}
                                            className={styles.cell}
                                            onClick={() => handleCellClick(date, hour)}
                                            data-tooltip={hour} // Добавляем tooltip
                                        ></td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ScheduleTable;