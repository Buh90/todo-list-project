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
              ><input type="date" name="due-date" id="due-date" required/>
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
            </div>
            <button class="submit-btn" type="submit">Add task</button>
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
    taskName: taskName.textContent || 'NO',
    duedate: duedate.value,
    priority: priority.value,
  };
  closeModal();
  return taskData;
}

function reset() {
  if (document.body.contains(dialog)) {
    dialog.remove();
  }
}

export { create, saveData, reset, closeModal };
