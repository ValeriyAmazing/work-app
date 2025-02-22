// hooks/useLessons.js
import { useState } from 'react';

const useLessons = () => {
    const [lessons, setLessons] = useState([]);

    const addLesson = (newLesson) => {
        setLessons((prevLessons) => [...prevLessons, newLesson]);
    };

    const checkForOverlap = (newLesson) => {
        return lessons.some((lesson) => {
            return newLesson.start < lesson.end && newLesson.end > lesson.start;
        });
    };

    return { lessons, addLesson, checkForOverlap };
};

export default useLessons;