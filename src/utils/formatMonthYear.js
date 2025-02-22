// utils/formatMonthYear.js
export const formatMonthYear = (date) => {
    return date.toLocaleDateString("ru-RU", {
        month: "long", // Полное название месяца
        year: "numeric", // Год
    });
};