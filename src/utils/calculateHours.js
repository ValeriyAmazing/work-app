// utils/calculateHours.js
export const calculateHours = (students, lessons) => {
    const currentTime = new Date(); // Текущее время

    return students.map((student) => {
        const studentLessons = lessons.filter((lesson) => {
            // Фильтруем занятия, которые уже завершились
            const lessonEnd = new Date(lesson.end);
            return lesson.studentId === student.id && lessonEnd < currentTime;
        });

        // Считаем общее количество часов для завершенных занятий
        const totalHours = studentLessons.reduce((sum, lesson) => {
            const start = new Date(lesson.start);
            const end = new Date(lesson.end);
            const duration = (end - start) / (1000 * 60 * 60); // Разница в часах
            return sum + duration;
        }, 0);

        return { ...student, hours: totalHours };
    });
};