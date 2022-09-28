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

function add() {
  const input = document.getElementById("text");
  const text = input.value;
  if (text) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");

    li.innerText = text;
    ul.appendChild(li);

    input.value = "";
    input.focus();
  }
}
