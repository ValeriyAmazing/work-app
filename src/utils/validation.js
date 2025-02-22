// utils/validation.js
export const validateTime = (startTime, endTime) => {
    return startTime < endTime;
};

export const checkForOverlap = (newLesson, lessons) => {
    return lessons.some((lesson) => {
        return newLesson.start < lesson.end && newLesson.end > lesson.start;
    });
};