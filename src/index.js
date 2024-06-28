import "./style.css";
import { createModal, createNote, task } from "./modal.js";
import { format, isSameDay, differenceInDays } from "date-fns";
import html from "./index.html";

const showModalBtn = document.querySelector(".add-task");
const modal = document.querySelector("dialog");
const taskContainer = document.querySelector("#task-container");
const asideButtons = document.querySelectorAll(".nav-button");
const inboxAmount = document.querySelector(".inbox-amount");
const todayAmount = document.querySelector(".today-amount");
const weekAmount = document.querySelector(".week-amount");

let dialogMode = {
  mode: undefined,
  taskIndex: undefined,
};

let taskList = [
  {
    name: "Example 1",
    duedate: new Date(),
    priority: "high",
  },
  {
    name: "Example 2",
    duedate: new Date("2024, 07, 12"),
    priority: "medium",
  },
  {
    name: "Example 3",
    duedate: new Date(),
    priority: "low",
  },
  {
    name: "Example 4",
    duedate: new Date("2024, 07, 2"),
    priority: "medium",
  },
];

renderTaskList(taskList);
renderAmount();

for (let i = 0; i < 3; i++) {
  asideButtons[i].addEventListener("click", () => {
    if (i === 0) {
      renderTaskList(taskList);
    } else if (i === 1) {
      renderTaskList(createTodayArray());
    } else if (i === 2) {
      renderTaskList(createWeekArray());
    }
  });
}

showModalBtn.addEventListener("click", () => {
  createModal();
  dialogMode.mode = "Task";
});

modal.addEventListener("close", () => {
  if (dialogMode.mode === "Task") {
    if (Object.keys(task).length !== 0) {
      taskList.push(task);
      renderTaskList(taskList);
      renderAmount();
    }
  } else if (dialogMode.mode === "Note") {
    const noteTextField = document.querySelector(".note-field");
    taskList[dialogMode.taskIndex].note = noteTextField.textContent;
  }
});

function renderTaskList(taskArray) {
  taskContainer.innerHTML = "";
  for (let i = 0; i < taskArray.length; i++) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.setAttribute("task-index", i);
    taskDiv.innerHTML = `
    <p class='task-priority ${taskArray[i].priority}'></p>
    <input class='task-checkbox${i}' type='checkbox'>
    <p class='task-name'>${sanitizeInput(taskArray[i].name)}</p>
    <p class='task-duedate'>${format(taskArray[i].duedate, "dd MMM")}</p>
    <svg class="task-icon note-${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Add note</title><path d="M5 19V5H12V12H19V13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H13.35C13.13 20.37 13 19.7 13 19H5M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" /></svg>
<svg class="task-icon delete del-${i}"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Delete</title>
  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>`;
    taskContainer.appendChild(taskDiv);
    document
      .querySelector(`.task-checkbox${i}`)
      .addEventListener("click", () => {
        taskDiv.classList.toggle("done");
      });

    document.querySelector(`.note-${i}`).addEventListener("click", () => {
      createNote();
      document.activeElement.blur();
      dialogMode.mode = "Note";
      dialogMode.taskIndex = i;
      const noteTextField = document.querySelector(".note-field");
      if (taskList[i].note) {
        noteTextField.textContent = taskList[i].note;
      }
    });

    document.querySelector(`.delete.del-${i}`).addEventListener("click", () => {
      taskList.splice(i, 1);
      renderTaskList(taskArray);
      renderAmount();
    });
  }
}

function renderAmount() {
  inboxAmount.textContent = taskList.length;
  let todayArray = createTodayArray();
  todayAmount.textContent = todayArray.length;
  let weekArray = createWeekArray();
  weekAmount.textContent = weekArray.length;
}

function sanitizeInput(inputValue) {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
}

function createTodayArray() {
  return taskList.filter((task) => isSameDay(task.duedate, new Date()));
}

function createWeekArray() {
  return taskList.filter(
    (task) => differenceInDays(task.duedate, new Date()) <= 7
  );
}

/*
Spostare il rettangolino quando cambio progetto
Salvare nella memoria di internet
Aggiungere il progetto
*/
