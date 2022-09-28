console.log("Hello World");

function addNote() {
  const input = document.getElementById("text");
  const text = input.value;
  if (text) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");

    li.innerText = text;
    ul.appendChild(li);

    input.value = "";
  }
}
