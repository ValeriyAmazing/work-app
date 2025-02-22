// context/LessonsContext.js
import React, { createContext, useState, useEffect } from "react";

const LessonsContext = createContext();

export const LessonsProvider = ({ children }) => {
  // Загружаем данные из localStorage при инициализации
  const [lessons, setLessons] = useState(() => {
    const savedLessons = localStorage.getItem("lessons");
    return savedLessons ? JSON.parse(savedLessons) : [];
  });

  // Сохраняем данные в localStorage при каждом изменении lessons
  useEffect(() => {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }, [lessons]);

  const addLesson = (newLesson) => {
    setLessons((prevLessons) => [...prevLessons, newLesson]);
  };

  const deleteLesson = (lessonId) => {
    console.log(lessons);

    setLessons((prevLessons) =>
        prevLessons.filter((lesson) => {
          console.log(lesson.lessonId);
          
        return lesson.lessonId !== lessonId;
      })
    );
  };

  return (
    <LessonsContext.Provider value={{ lessons, addLesson, deleteLesson }}>
      {children}
    </LessonsContext.Provider>
  );
};

export default LessonsContext;
