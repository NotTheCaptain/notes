// Model
const notes = [];

// View
function buildLIItem(text) {
  const note = document.createElement("li");
  note.innerText = text;
  note.addEventListener("click", handleClickLIItem);
  return note;
}

// Controller
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("add");
  button.addEventListener("click", handleClick);
});

function handleClick() {
  add();
}

function handleClickLIItem(event) {
  const list = document.getElementById("list");
  list.removeChild(event.target);
}

function add() {
  const input = document.getElementById("text");
  const text = input.value;
  if (text) {
    let ul = document.getElementById("list");
    const note = buildLIItem(text);
    ul.appendChild(note);
    notes.push(note);
    input.value = "";
    input.focus();
  }
}
