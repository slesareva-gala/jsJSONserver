"use strict";

import { render } from "./render";

export const changePermissions = () => {

    const tbody = document.getElementById('table-body');

    tbody.addEventListener('click', (e) => {

        if (e.target.closest('input[type=checkbox]')) {
            // вся строка - для выкусывания
            const tr = e.target.closest('tr');
            const input = tr.querySelector('input[type=checkbox]');
            const id = tr.dataset.key;

            userService.changeUser(id, { permissions: input.checked }).then(res => {
                // обробатываем ответ сервера после изменения (а нужно ли render?)
                userService.getUsers().then(users => {
                    render(users);
                });
            });

        }

    });
};
