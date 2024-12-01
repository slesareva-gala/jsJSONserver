"use strict";

import { render } from "./render";

export const addUsers = () => {
    // форма ввода нового (редактирования) пользователя
    const form = document.querySelector('form');
    const nameInput = form.querySelector('#form-name');
    const emailInput = form.querySelector('#form-email');
    const childrenInput = form.querySelector('#form-children');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // если нет флажка "редактирование"
        if (!form.dataset.method) {
            const user = {
                // "id": 0,  // можем проигнорировать - присваивается сервером
                name: nameInput.value,
                email: emailInput.value,
                children: childrenInput.checked,
                permissions: false
            };

            userService.addUsers(user).then(() => {
                // обробатываем ответ сервера после добавления
                userService.getUsers().then(users => {
                    render(users);
                    // для очистки формы
                    form.reset();
                });
            });
        }
    });
};