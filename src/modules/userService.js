"use strict";

export class UserService {
    constructor(src) {
        this._errorBlock = document.getElementById('errorData');
        this._src = src
    }
    // включение / выключения блока индикации ошибки
    errorBlock(message) {
        this._errorBlock.textContent = message;
    }

    // запрос без init
    async getData(ending = '') {
        try {
            const response = await fetch(`${this._src}${ending}`);
            if (!response.ok) {
                throw new Error('Произошла ошибка, данных нет!');
            }
            this.errorBlock('');
            return await response.json();

        } catch (error) {
            this.errorBlock(error.message);
            return [];
        }
    }

    // запрос с init
    async sendData(method = 'POST', data = {}, ending = '') {
        try {
            const response = await fetch(`${this._src}${ending}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Произошла ошибка, действие отменено!');
            }
            return await response.json();
        } catch (error) {
            // здесь, сообщение, т.к. для всех функций, передающих данные, 
            // повторно вызывается getData()
            alert(error.message);
        }
    }

    getUsers() { return this.getData(); }
    getUser(id) { return this.getData(`/${id}`); }

    // фильтрация
    filterUsers(filterOption) { return this.getData(`?${filterOption}=true`); }
    // сортировка 
    getSortUsers(sortOption) { return this.getData(`?_sort=${sortOption.name}&_order=${sortOption.value}`); }
    // поиск 
    getSearchUsers(str) { return this.getData(`?name_like=${str}`); }



    // добалвение нового (id в ответе сервера)
    addUsers(user) { return this.sendData('POST', user); }
    // удаление по id
    removeUser(id) { return this.sendData('DELETE', {}, `/${id}`); }
    // изменения по id согласно списка свойств
    changeUser(id, data) { return this.sendData('PATCH', data, `/${id}`); }
    // изменения по id согласно всех свойств
    editUser(id, user) { return this.sendData('PUT', user, `/${id}`); }

}