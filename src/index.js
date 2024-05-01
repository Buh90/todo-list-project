import "./style.css";
import { showModal } from "./modal.js";
// import html from "./index.html";

const addTaskBtn = document.querySelector(".add-task");

addTaskBtn.addEventListener("click", () => showModal());
