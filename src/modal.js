import { format, compareAsc } from 'date-fns';

const mainSection = document.querySelector('main');
let task = {};

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
            <button class="submit-btn" type="submit">Add task</button>
          </form>`;

let modalBox = document.createElement('dialog');
mainSection.appendChild(modalBox);

function createModal() {
  modalBox.innerHTML = modalHTML;
  task = {};
  modalBox.showModal();

  const closeModalBtn = document.querySelector('.close-modal-btn');
  const addTaskButton = document.querySelector('.submit-btn');

  const inputElements = {
    taskNameInput: document.querySelector('#task-name'),
    duedateInput: document.querySelector('#due-date'),
    priorityInput: document.querySelectorAll('[type="radio"]'),
    taskNameError: document.querySelector('#task-name + span.error'),
    priorityError: document.querySelector('.radio-block + span.grid-error'),
    duedateError: document.querySelector('#due-date + span.grid-error'),
  };

  closeModalBtn.addEventListener('click', () => {
    modalBox.close();
  });

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
  task = {
    name: el.taskNameInput.textContent,
    duedate: format(el.duedateInput.value, 'dd-MMMM'),
    priority: document.querySelector('[type="radio"]:checked').value,
  };
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

export { createModal, task };
