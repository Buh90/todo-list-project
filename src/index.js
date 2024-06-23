import './style.css';
import { createModal, task } from './modal.js';
import { format } from 'date-fns';
import html from './index.html';

const showModalBtn = document.querySelector('.add-task');
const modal = document.querySelector('dialog');
const taskContainer = document.querySelector('#task-container');
const inboxAmount = document.querySelector('.inbox-amount');
const todayAmount = document.querySelector('.today-amount');
const weekAmount = document.querySelector('.week-amount');

let taskList = [
  {
    name: 'Learn to code',
    duedate: '23 Jun',
    priority: 'high',
  },
  {
    name: 'Example 2',
    duedate: '27 Jun',
    priority: 'medium',
  },
  {
    name: 'Example 3',
    duedate: '30 Jun',
    priority: 'low',
  },
  {
    name: 'Example 4',
    duedate: '4 Jul',
    priority: 'medium',
  },
];

renderTaskList();
renderAmount();

showModalBtn.addEventListener('click', () => {
  createModal();
});

modal.addEventListener('close', () => {
  if (Object.keys(task).length !== 0) {
    taskList.push(task);
    renderTaskList();
  }
});

function renderTaskList() {
  taskContainer.innerHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');
    taskDiv.setAttribute('task-index', i);
    taskDiv.innerHTML = `
    <p class='task-priority ${taskList[i].priority}'></p>
    <input class='task-checkbox${i}' type='checkbox'>
    <p class='task-name'>${sanitizeInput(taskList[i].name)}</p>
    <p class='task-duedate'>${format(taskList[i].duedate, 'dd MMM')}</p>
<svg class="delete del-${i}"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Delete</title>
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`;
    taskContainer.appendChild(taskDiv);
    document
      .querySelector(`.task-checkbox${i}`)
      .addEventListener('click', () => {
        taskDiv.classList.toggle('done');
      });
    document.querySelector(`.delete.del-${i}`).addEventListener('click', () => {
      taskList.splice(i, 1);
      renderTaskList();
    });
  }
}

function renderAmount() {
  inboxAmount.textContent = taskList.length;
}

function sanitizeInput(inputValue) {
  const div = document.createElement('div');
  div.textContent = inputValue;
  return div.innerHTML;
}
