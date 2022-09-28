const input = document.getElementById("text");
input.addEventListener("keydown", handleKeyDown);

function handleClick() {
  add();
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    add();
  }
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
    let note = document.createElement("li");

    note.innerText = text;
    note.addEventListener("click", handleClickLIItem);
    ul.appendChild(note);

    input.value = "";
    input.focus();
  }
}
