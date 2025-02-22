// utils/getStudentInfo.js
export const getStudentInfo = (studentId) => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    return students.find((student) => student.id === studentId);
};