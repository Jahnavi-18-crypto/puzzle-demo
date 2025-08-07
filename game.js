function startGame() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("arcade").classList.remove("hidden");

  const music = document.getElementById("bg-music");
  music.volume = 0.3;
  music.play();

  initPuzzle();
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  music.paused ? music.play() : music.pause();
}

function initPuzzle() {
  const container = document.getElementById("puzzle-container");
  container.innerHTML = "";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(numbers);

  numbers.forEach(num => {
    const div = document.createElement("div");
    div.className = "puzzle-piece";
    div.textContent = num;
    div.setAttribute("draggable", "true");

    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("drop", drop);

    container.appendChild(div);
  });
}

let draggedItem = null;

function dragStart(e) {
  draggedItem = this;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  if (draggedItem !== this) {
    const temp = this.textContent;
    this.textContent = draggedItem.textContent;
    draggedItem.textContent = temp;

    checkPuzzle();
  }
}

function checkPuzzle() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const current = Array.from(pieces).map(p => p.textContent);
  const correct = ['1','2','3','4','5','6','7','8','9'];

  const msg = document.getElementById("status-msg");
  if (JSON.stringify(current) === JSON.stringify(correct)) {
    msg.textContent = "Yay! 🌸 You completed the garden puzzle!";
  } else {
    msg.textContent = "";
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}