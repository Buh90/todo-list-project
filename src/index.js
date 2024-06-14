import "./style.css";
import { createModal } from "./modal.js";
// import html from "./index.html";

const showModalBtn = document.querySelector(".add-task");
const modal = document.querySelector("dialog");

let taskList = [];

showModalBtn.addEventListener("click", () => {
  createModal();
});

modal.addEventListener("close", () => {
  console.log(modal.childNodes.children);
  console.dir(modal.childNodes.children);
});
