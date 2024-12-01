"use strict";

import { render } from "./modules/render";
import { addUsers } from "./modules/addUsers";
import { UserService } from "./modules/userService";
import { removeUsers } from "./modules/removeUsers";
import { changePermissions } from "./modules/changePermissions";
import { editUsers } from "./modules/editUsers";
import { filterUsers } from "./modules/filterUsers";
import { sortUsers } from "./modules/sortUsers";
import { searchUsers } from "./modules/searchUsers";

// экземпляр класса - прицепили на окошко
// что бы был доступен во всех модулях
window.userService = new UserService('http://localhost:4545/users');

// получаем данные с сервера
userService.getUsers().then(data => {
    render(data);
});

addUsers();
removeUsers();
changePermissions();
editUsers();
filterUsers();
sortUsers();
searchUsers();

