"use strict";

// задержка вызова (?? и пустые надцать раз отрабатывает)
export const debounce = (func, ms = 300) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        // запускаем с задержкой
        timer = setTimeout(() => { func.apply(this, args); }, ms);
    };
};