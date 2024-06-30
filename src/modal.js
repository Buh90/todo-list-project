import { compareAsc } from 'date-fns';

const mainSection = document.querySelector('main');

let taskList = [
  {
    name: 'Example 1',
    duedate: new Date(),
    priority: 'high',
    note: undefined,
    project: 'none',
  },
  {
    name: 'Example 2',
    duedate: new Date('2024, 07, 12'),
    priority: 'medium',
    note: undefined,
    project: 'none',
  },
  {
    name: 'Example 3',
    duedate: new Date(),
    priority: 'low',
    note: undefined,
    project: 'none',
  },
  {
    name: 'Example 4',
    duedate: new Date('2024, 07, 2'),
    priority: 'medium',
    note: undefined,
    project: 'none',
  },
];

const modalHTML = `<form method="dialog" novalidate>
  <p class="close-modal-btn">x</p>
            <p
              id="task-name" 
              class="textarea"
              role="textbox"
              contenteditable
                          ></p>
                           <span class="error" aria-live="polite"></span>
            <div class="input-block">
              <label for="due-date">Due date:</label
              ><input type="date" name="due-date" id="due-date"/>
              <span class="grid-error" aria-live="polite"></span>
              <label for="priority">Priority:</label>
              <div class="radio-block">
                <input
                  type="radio"
                  name="priority"
                  id="low-priority"
                  value="low"
                  required
                />
                <input
                  type="radio"
                  name="priority"
                  id="medium-priority"
                  value="medium"
                />
                <input
                  type="radio"
                  name="priority"
                  id="high-priority"
                  value="high"
                />
                </div>
              <span class="grid-error" aria-live="polite"></span>
            </div>
            <button class="submit-btn task-btn" type="submit">Add task</button>
          </form>`;

const addNoteHTML = `<p class="close-modal-btn">x</p>
<p class="note-title">Notes</p>
            <p class="note-field"
              id="task-name" 
              class="note"
              role="textbox"
              contenteditable
                          ></p>
                          <button class="submit-btn note-btn">OK</button>
                          `;

const addProjectHTML = `<p class="close-modal-btn">x</p>
                          <p class="project-title">Add a project</p>
                          <input class="project-field" type="text" maxlength="30" placeholder="Type here your project"/>
                          <button class="submit-btn project-btn">OK</button>`;

let modalBox = document.createElement('dialog');
mainSection.appendChild(modalBox);

function createModal() {
  modalBox.innerHTML = modalHTML;
  modalBox.showModal();

  const addTaskButton = document.querySelector('.task-btn');
  const inputElements = {
    taskNameInput: document.querySelector('#task-name'),
    duedateInput: document.querySelector('#due-date'),
    priorityInput: document.querySelectorAll('[type="radio"]'),
    taskNameError: document.querySelector('#task-name + span.error'),
    priorityError: document.querySelector('.radio-block + span.grid-error'),
    duedateError: document.querySelector('#due-date + span.grid-error'),
  };

  createCloseModalBtn();

  addTaskButton.addEventListener('click', (e) => {
    let check = verifyFormValidity(inputElements);
    if (check) {
      createTask(inputElements);
    } else {
      e.preventDefault();
    }
  });
}

function createTask(el) {
  let newTask = {
    name: el.taskNameInput.textContent,
    duedate: el.duedateInput.value,
    priority: document.querySelector('[type="radio"]:checked').value,
  };
  taskList.push(newTask);
}

function createNote(taskIndex) {
  modalBox.innerHTML = addNoteHTML;

  const addNoteBtn = document.querySelector('.note-btn');
  const noteTextField = document.querySelector('.note-field');

  if (taskList[taskIndex].note) {
    noteTextField.textContent = taskList[taskIndex].note;
  }

  modalBox.showModal();
  createCloseModalBtn();
  document.activeElement.blur();

  addNoteBtn.addEventListener('click', () => {
    taskList[taskIndex].note = noteTextField.textContent;
    modalBox.close();
  });
}

function createProject() {
  modalBox.innerHTML = addProjectHTML;
  modalBox.showModal();
  document.activeElement.blur();
  createCloseModalBtn();
}

function createCloseModalBtn() {
  const closeModalBtn = document.querySelector('.close-modal-btn');
  closeModalBtn.addEventListener('click', () => {
    modalBox.close();
  });
}

function verifyFormValidity(el) {
  let valididyStatus = true;

  //Task input
  el.taskNameInput.addEventListener('input', () => {
    if (el.taskNameInput.textContent) {
      el.taskNameError.textContent = '';
      el.taskNameError.classList.remove('active');
    } else {
      showTaskError();
      valididyStatus = false;
    }
  });

  if (!el.taskNameInput.textContent) {
    showTaskError();
    valididyStatus = false;
  }

  function showTaskError() {
    el.taskNameError.textContent = 'Enter the name of your task';
    el.taskNameError.className = 'error active';
  }

  //Duedate input

  el.duedateInput.addEventListener('change', () => {
    if (
      el.duedateInput.value &&
      compareAsc(el.duedateInput.value, new Date()) == 1
    ) {
      el.duedateError.textContent = '';
      el.duedateError.classList.remove('active');
    } else {
      showDuedateError();
      valididyStatus = false;
    }
  });

  if (
    !el.duedateInput.value ||
    compareAsc(el.duedateInput.value, new Date()) == -1
  ) {
    showDuedateError();
    valididyStatus = false;
  }

  function showDuedateError() {
    el.duedateInput.value
      ? (el.duedateError.textContent = 'You cannot choose a past date')
      : (el.duedateError.textContent = 'Select a duedate');
    el.duedateError.className = 'grid-error active';
  }

  //Priority input
  let priorityArray = Array.from(el.priorityInput);
  priorityArray.forEach((input) =>
    input.addEventListener('change', () => {
      el.priorityError.textContent = '';
      el.priorityError.classList.remove('active');
    })
  );

  let isPriorityChecked = priorityArray.filter(
    (radio) => radio.checked == true
  );

  if (isPriorityChecked.length !== 0) {
    el.priorityError.textContent = '';
    el.priorityError.classList.remove('active');
  } else {
    showPriorityError();
    valididyStatus = false;
  }

  function showPriorityError() {
    el.priorityError.textContent = 'Select the priority';
    el.priorityError.className = 'grid-error active';
  }

  return valididyStatus;
}

export { createModal, createNote, createProject, taskList };
