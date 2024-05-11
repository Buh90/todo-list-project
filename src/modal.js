const mainSection = document.querySelector('main');

let dialog;
let taskList;

function create() {
  reset();
  dialog = document.createElement('dialog');
  dialog.innerHTML = `<form>
  <p class="close-dialog-btn">x</p>
            <p
              id="task-name"
              class="textarea"
              role="textbox"
              contenteditable
            ></p>
            <div class="input-block">
              <label for="due-date">Due date:</label
              ><input type="date" name="due-date" id="due-date" />
              <label for="priority">Priority:</label>
              <div class="radio-block">
                <input
                  type="radio"
                  name="priority"
                  id="low-priority"
                  value="low"
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
            </div>
            <button class="submit-btn" type="button">Add task</button>
          </form>`;
  mainSection.appendChild(dialog);
  dialog.showModal();
}

function closeModal() {
  dialog.close();
  reset();
}

function saveData() {
  const taskName = document.querySelector('#task-name');
  const duedate = document.querySelector('#due-date');
  const priority = document.querySelector('[name="priority"]:checked');
  const taskData = {
    taskName: taskName.textContent,
    duedate: duedate.value,
    priority: priority.value,
  };
  closeModal();
  return taskData;
}

// modal.dialogForm.addEventListener('submit', (e) => {
//   const modal = document.querySelector('dialog');
//   e.preventDefault();
//   let newTask = {
//     taskName: modal.taskName.textContent,
//     duedate: modal.duedate.value,
//     priority: document.querySelector('[name="priority"]:checked').value,
//   };
//   taskList.push(newTask);
//   modal.dialog.close();
//   resetModal();
//   console.log(taskList);
// });

function reset() {
  if (document.body.contains(dialog)) {
    dialog.remove();
  }
}

export { create, saveData, reset, closeModal };
