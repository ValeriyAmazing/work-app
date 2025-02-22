// components/AddLessonButton.js
import React, { useState, useContext, useEffect } from "react";
import Popup from "../Popup/Popup";
import LessonForm from "../LessonForm/LessonForm";
import LessonsContext from "../../context/LessonsContext";
import { validateTime, checkForOverlap } from "../../utils/validation";

const AddLessonButton = ({ isPopupOpen, onClose, initialDate, initialTime }) => {
    const [date, setDate] = useState(initialDate || new Date().toISOString().split("T")[0]);
    const [studentId, setStudentId] = useState("");
    const [startTime, setStartTime] = useState(initialTime || "");
    const [endTime, setEndTime] = useState("");

    const { addLesson, lessons } = useContext(LessonsContext);

    // Получаем список учеников из локального хранилища
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Устанавливаем endTime на час позже, чем initialTime
    useEffect(() => {
        if (initialTime) {
            const startHour = parseInt(initialTime.split(":")[0]);
            const endHour = startHour + 1;
            const endTimeValue = `${endHour.toString().padStart(2, "0")}:00`;
            setEndTime(endTimeValue);
        }
    }, [initialTime]);

    const handleAddLesson = (repeatCount) => {
        if (!validateTime(startTime, endTime)) {
            alert('Время окончания должно быть позже времени начала');
            return;
        }

        for (let i = 0; i < repeatCount; i++) {
            const lessonDate = new Date(date);
            lessonDate.setDate(lessonDate.getDate() + i * 7); // Добавляем неделю для каждого повторения

            const newLesson = {
                start: `${lessonDate.toISOString().split("T")[0]}T${startTime}`,
                end: `${lessonDate.toISOString().split("T")[0]}T${endTime}`,
                studentId: parseInt(studentId),
                lessonId: Date.now() + i, // Уникальный ID для каждого занятия
            };

            if (checkForOverlap(newLesson, lessons)) {
                alert(`Занятие ${i + 1} пересекается с другим занятием`);
                return;
            }

            addLesson(newLesson);
            console.log('Добавленное занятие:', newLesson);
        }

        onClose(); // Закрываем попап
        resetForm();
    };

    const resetForm = () => {
        setDate(new Date().toISOString().split("T")[0]);
        setStudentId("");
        setStartTime("");
        setEndTime("");
    };

    return (
        <Popup isOpen={isPopupOpen} onClose={onClose}>
            <LessonForm
                date={date}
                setDate={setDate}
                studentId={studentId}
                setStudentId={setStudentId}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                students={students}
                onSubmit={handleAddLesson}
                onCancel={onClose}
                initialDate={initialDate} // Передаем начальную дату
                initialTime={initialTime} // Передаем начальное время
            />
        </Popup>
    );
};

export default AddLessonButton;