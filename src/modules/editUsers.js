"use strict";

import { render } from "./render";

export const editUsers = () => {
    const tbody = document.getElementById('table-body');
    // форма редактирования (ввода нового) пользователя
    const form = document.querySelector('form');
    const nameInput = form.querySelector('#form-name');
    const emailInput = form.querySelector('#form-email');
    const childrenInput = form.querySelector('#form-children');

    tbody.addEventListener('click', (e) => {
        if (e.target.closest('.btn-edit')) {
            // вся строка - для выкусывания
            const tr = e.target.closest('tr');
            const id = tr.dataset.key;

            userService.getUser(id).then(user => {
                nameInput.value = user.name;
                emailInput.value = user.email;
                childrenInput.value = user.children;

                // устанавливаем флажок редактирования (для отличия от добавления)
                form.dataset.method = id;
            });

        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // если есть флажок "редактирование"
        if (form.dataset.method) {
            const id = form.dataset.method;
            const user = {
                name: nameInput.value,
                email: emailInput.value,
                children: childrenInput.checked,
                permissions: false
            };

            userService.editUser(id, user).then(() => {
                // обробатываем ответ сервера после добавления
                userService.getUsers().then(users => {
                    render(users);
                    // для очистки формы 
                    form.reset();
                    // удаляем флажок редактирования
                    form.removeAttribute('data-method');
                });
            });

        }
    });
};
