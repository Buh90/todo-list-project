import './style.css';
import {
  createModal,
  createNote,
  createProject,
  renderProject,
  taskList,
} from './modal.js';
import { format, isSameDay, differenceInDays, compareAsc } from 'date-fns';
import html from './index.html';

const showModalBtn = document.querySelector('.add-task');
const addProjectBtn = document.querySelector('.add-project');
const modal = document.querySelector('dialog');
const taskContainer = document.querySelector('#task-container');
const inboxAmount = document.querySelector('.inbox-amount');
const todayAmount = document.querySelector('.today-amount');
const weekAmount = document.querySelector('.week-amount');

let projectList = ['Learn code', 'Learn to draw'];

if (localStorage.getItem('projectList')) {
  projectList = JSON.parse(localStorage.getItem('projectList'));
}

for (let proj of projectList) {
  console.log(projectList);
  renderProject(proj);
}

createTaskArrayForRender(taskList);
renderAmount();
updateAsideButtons();

showModalBtn.addEventListener('click', () => {
  let projectName = document.querySelector('.active').innerText.trim();
  createModal(projectName);
  console.log(taskList);
});

addProjectBtn.addEventListener('click', () => {
  createProject();
  updateAsideButtons();
});

modal.addEventListener('close', () => {
  renderTasklist();
  renderAmount();
  setLocalStorage();
});

function createTaskArrayForRender(taskArray) {
  taskContainer.innerHTML = '';
  for (let i = 0; i < taskArray.length; i++) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');
    taskDiv.setAttribute('task-index', i);
    taskDiv.innerHTML = `
    <p class='task-priority ${taskArray[i].priority}'></p>
    <input class='task-checkbox${i}' type='checkbox'>
    <p class='task-name'>${sanitizeInput(taskArray[i].name)}</p>
    <p class='task-duedate'>${format(taskArray[i].duedate, 'dd MMM')}</p>
    <svg class="task-icon note-${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add note</title><path d="M5 19V5H12V12H19V13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H13.35C13.13 20.37 13 19.7 13 19H5M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" /></svg>
<svg class="task-icon delete del-${i}"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Delete</title>
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`;
    taskContainer.appendChild(taskDiv);
    document
      .querySelector(`.task-checkbox${i}`)
      .addEventListener('click', () => {
        taskDiv.classList.toggle('done');
      });

    createNoteButtons(i);

    document.querySelector(`.delete.del-${i}`).addEventListener('click', () => {
      taskList.splice(i, 1);
      renderTasklist();
      renderAmount();
      setLocalStorage();
    });
  }
}

function createNoteButtons(i) {
  document.querySelector(`.note-${i}`).addEventListener('click', () => {
    createNote(i);
  });
}

function renderAmount() {
  inboxAmount.textContent = taskList.length;
  let todayArray = createTodayArray();
  todayAmount.textContent = todayArray.length;
  let weekArray = createWeekArray();
  weekAmount.textContent = weekArray.length;
}

function sanitizeInput(inputValue) {
  const div = document.createElement('div');
  div.textContent = inputValue;
  return div.innerHTML;
}

function createTodayArray() {
  return taskList.filter((task) => isSameDay(task.duedate, new Date()));
}

function createWeekArray() {
  return taskList.filter(
    (task) =>
      differenceInDays(task.duedate, new Date()) <= 7 &&
      (compareAsc(task.duedate, new Date()) == 1 ||
        isSameDay(task.duedate, new Date()))
  );
}

function createProjectArray(project) {
  return taskList.filter((task) => task.project == project);
}

function renderTasklist() {
  let projectName = document.querySelector('.active').innerText.trim();
  projectName === 'Inbox'
    ? createTaskArrayForRender(taskList)
    : projectName === 'Today'
    ? createTaskArrayForRender(createTodayArray())
    : projectName === 'This week'
    ? createTaskArrayForRender(createWeekArray())
    : createTaskArrayForRender(createProjectArray(projectName));
}

function updateAsideButtons() {
  let asideButtons = Array.from(document.querySelectorAll('.nav-button'));
  for (let i = 0; i < asideButtons.length; i++) {
    asideButtons[i].addEventListener('click', () => {
      if (i === 0) {
        createTaskArrayForRender(taskList);
        showModalBtn.textContent = `Add task +`;
      } else if (i === 1) {
        createTaskArrayForRender(createTodayArray());
        showModalBtn.textContent = `Add task +`;
      } else if (i === 2) {
        createTaskArrayForRender(createWeekArray());
        showModalBtn.textContent = `Add task +`;
      } else {
        createTaskArrayForRender(createProjectArray(asideButtons[i].innerText));
        showModalBtn.textContent = `Add task in "${asideButtons[i].innerText}" +`;
      }
      asideButtons.forEach((button) => button.classList.remove('active'));
      asideButtons[i].classList.add('active');
    });
  }
}

function setLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
  localStorage.setItem('projectList', JSON.stringify(projectList));
}

export { sanitizeInput, updateAsideButtons, projectList };
