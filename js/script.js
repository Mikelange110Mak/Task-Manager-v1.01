"use strict";

window.addEventListener('DOMContentLoaded', function () {

   const addForm = document.querySelector('.set-element__form'),
      addInput = addForm.querySelector('.set-element__taskname'),
      viewList = document.querySelector('.task-list__list'),
      deleteForm = document.querySelector('.task-list__button');


   let taskList = []; //Главный массив с тасками

   const taskManager = () => {
      addForm.addEventListener('submit', (event) => {
         event.preventDefault();
         let newTask = addInput.value; //объявить переменной значение введенего поля

         if (newTask.length > 37) { //ограничение строки в 54 символа
            newTask = `${newTask.substring(0, 37)}...`
         }
         taskList.push(newTask); //запушить в массив введеную задачу

         addInput.value = ""; //очистить поле после ввода
         createAndDeleteTask(taskList, viewList);
      })
   }

   const createAndDeleteTask = (task, parent) => {
      //добавить задачу:
      parent.innerHTML = '';
      task.forEach((elem, i) => {
         parent.innerHTML += `
            <li class="task-list__item"><button class="task-list__close"><img src="img/close-mp3-music-svgrepo-com.svg" alt=""></button><span>${i + 1}:</span> ${elem} </li> 
            `

      });

      //удалить задачу:
      document.querySelectorAll('.task-list__close').forEach((btn, i) => {

         btn.addEventListener('click', () => {
            btn.parentElement.remove(); //удалить родителя кнопки
            taskList.splice(i, 1) //удалить элемент из массива
            console.log(taskList); //просмотр массива
            createAndDeleteTask(taskList, viewList); //рекурсия этой же функции чтоб пересоздать список (нужен чтоб после удаления выстраивался новый порядок)
         })
      })
   }

   const clearAll = () => {
      deleteForm.addEventListener('submit', (e) => {
         setTimeout(function () {
            location.reload();
         }, 10)
      })
   }

   //console.log(deleteItem);

   //Вызовы функций:
   taskManager();
   clearAll();

})



