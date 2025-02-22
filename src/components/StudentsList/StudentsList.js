// components/StudentsList.js
import React, { useState, useEffect, useContext } from "react";
import StudentForm from "./StudentForm";
import StudentItem from "./StudentItem";
import { calculateHours } from "../../utils/calculateHours";
import LessonsContext from "../../context/LessonsContext";
import styles from "./StudentsList.module.css";

const StudentsList = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { lessons } = useContext(LessonsContext); // Получаем занятия из контекста

  // Загрузка учеников из локального хранилища
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  // Сохранение учеников в локальное хранилище
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Обновление количества часов при изменении занятий
  useEffect(() => {
    const updatedStudents = calculateHours(students, lessons);
    setStudents(updatedStudents);
  }, [lessons]); // Зависимость от lessons

  // Добавление нового ученика
  const handleAddStudent = () => {
    if (!name || !phone) {
      alert("Заполните все поля");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      phone,
      avatar: `https://robohash.org/${phone}?set=set4`, // Аватар из Robohash
      hours: 0, // Изначально 0 часов
    };

    setStudents([...students, newStudent]);
    setName("");
    setPhone("");
  };

  // Удаление ученика
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Список учеников</h2>
      <StudentForm
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        onAddStudent={handleAddStudent}
      />
      <ul className={styles.list}>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onDelete={handleDeleteStudent}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
