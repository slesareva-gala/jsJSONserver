"use strict";

import { render } from "./render";

export const sortUsers = () => {
    const headerSortIsChildren = document.getElementById('sort-is-children');

    let isSort = false;

    headerSortIsChildren.style.cursor = 'pointer';

    headerSortIsChildren.addEventListener('click', (e) => {
        isSort = !isSort;


        userService.getSortUsers({
            name: 'children',
            value: isSort ? '' : '-'
        }).then(users => {
            console.log('users: ', users);
            console.log('isSort', isSort)
            render(users);
        });

    });

};