import './style.css';
import * as modal from './modal.js';
// import html from "./index.html";

const showModalBtn = document.querySelector('.add-task');
let taskList = [];

showModalBtn.addEventListener('click', () => {
  modal.create();
});
document
  .querySelector('dialog')
  .addEventListener('close', () => console.log('CHIUSO'));
