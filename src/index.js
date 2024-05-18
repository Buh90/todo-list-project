import './style.css';
import * as modal from './modal.js';
// import html from "./index.html";

const showModalBtn = document.querySelector('.add-task');
let taskList = [];

showModalBtn.addEventListener('click', () => {
  modal.create();
  const closeModalBtn = document.querySelector('.close-dialog-btn');
  const submitModalBtn = document.querySelector('.submit-btn');
  closeModalBtn.addEventListener('click', () => modal.closeModal());
  submitModalBtn.addEventListener('click', () => {
    const task = modal.saveData();
    if (task) {
      taskList.push(task);
    }
    console.log(taskList);
  });
});
