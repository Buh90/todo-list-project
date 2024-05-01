const mainSection = document.querySelector("main");

function showModal() {
  const dialog = document.createElement("dialog");
  mainSection.appendChild(dialog);
  dialog.innerHTML = "<h1>New task</h1>";
  dialog.showModal();
}

export { showModal };
