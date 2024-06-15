import './style.css';
import { createModal, task } from './modal.js';
// import html from "./index.html";

const showModalBtn = document.querySelector('.add-task');
const modal = document.querySelector('dialog');
const taskContainer = document.querySelector('#task-container');

let taskList = [
  {
    name: 'A',
    duedate: '29-June',
    priority: 'high',
  },
  {
    name: 'B',
    duedate: '29-June',
    priority: 'medium',
  },
  {
    name: 'C',
    duedate: '29-June',
    priority: 'medium',
  },
  {
    name: 'D',
    duedate: '29-June',
    priority: 'medium',
  },
];

renderTaskList();

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
  for (let i = 0; i < taskList.length; i++) {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');
    taskDiv.setAttribute('task-index', i);
    taskDiv.innerHTML = `<input type='checkbox'><p class='task-name'>${sanitizeInput(
      taskList[i].name
    )}</p>
    <p class='task-duedate'>${taskList[i].duedate}</p>
    <p class='task-priority'>${taskList[i].priority}</p>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>delete</title>
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`;
    // let taskName = document.createElement('p');
    // let taskDuedate = document.createElement('p');
    // let taskPriority = document.createElement('p');
    // taskName.classList.add('task-name');
    // taskDuedate.classList.add('task-duedate');
    // taskPriority.classList.add('task-priority');
    // taskName.textContent = taskList[i].name;
    // taskDuedate.textContent = taskList[i].duedate;
    // taskPriority.textContent = taskList[i].priority;
    // taskDiv.appendChild(taskName);
    // taskDiv.appendChild(taskDuedate);
    // taskDiv.appendChild(taskPriority);
    taskContainer.appendChild(taskDiv);
    console.log(taskDiv);
  }
}

function sanitizeInput(inputValue) {
  const div = document.createElement('div');
  div.textContent = inputValue;
  return div.innerHTML;
}
