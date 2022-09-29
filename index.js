// Model
let notes = [];

// View
function buildLIItem(note) {
  const item = document.createElement("li");
  item.id = note.id;

  const article = document.createElement("article");
  const title = document.createElement("header");
  title.textContent = note.title;
  const text = document.createElement("p");
  text.textContent = note.text;

  const controls = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", handleClickDelete(note.id));
  controls.appendChild(button);

  article.appendChild(title);
  article.appendChild(text);
  article.appendChild(controls);
  item.appendChild(article);
  return item;
}

// Controller
document.addEventListener("DOMContentLoaded", function () {
  init();
});

function handleClick() {
  add();
  save();
}

function handleClickDelete(id) {
  return function () {
    const item = document.getElementById(id);
    const list = document.getElementById("list");
    list.removeChild(item);
    const pos = notes.findIndex((note) => note.id === id);
    notes.splice(pos, 1);
    save();
  };
}

function add() {
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  if (title.value || text.value) {
    const list = document.getElementById("list");
    const note = createNote(title.value, text.value);
    const item = buildLIItem(note);
    list.appendChild(item);
    notes.push(note);
    title.value = "";
    text.value = "";
  }
}

function createNote(title, text) {
  const id = generateId(title, text);
  return { id, title, text };
}

function generateId(title, text, length = 10) {
  return CryptoJS.SHA256(title + text + new Date())
    .toString()
    .substring(0, length);
}

function init() {
  registerEventHandlers();
  load();
  draw();
}

function registerEventHandlers() {
  const button = document.getElementById("add");
  button.addEventListener("click", handleClick);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/notes/sw.js", { scope: "/notes/" })
      .then((registration) =>
        console.log("Service Worker registered!", registration)
      )
      .catch((error) =>
        console.log("Service Worker registration failed!", error)
      );
  }
}

function load() {
  notes = JSON.parse(localStorage.getItem("notes")) || [];
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function draw() {
  const list = document.getElementById("list");
  while (list.firstChild) list.removeChild(list.firstChild);
  notes.forEach((note) => list.appendChild(buildLIItem(note)));
}
