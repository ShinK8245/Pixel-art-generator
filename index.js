let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

const events = {
  down: ["mousedown", "touchstart"],
  move: ["mousemove", "touchmove"],
  up: ["mouseup", "touchend", "mouseleave"],
};

let draw = false;
let erase = false;

const getCoordinates = (e) => {
  if (e.touches) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
};

const drawOnGrid = (col, eraseMode) => {
  col.style.backgroundColor = eraseMode ? "transparent" : colorButton.value;
};

const setupGrid = () => {
  container.innerHTML = "";
  for (let i = 0; i < gridHeight.value; i++) {
    let row = document.createElement("div");
    row.classList.add("gridRow");
    for (let j = 0; j < gridWidth.value; j++) {
      let col = document.createElement("div");
      col.classList.add("gridCol");

      events.down.forEach((event) => {
        col.addEventListener(event, (e) => {
          e.preventDefault();
          draw = true;
          drawOnGrid(col, erase);
        });
      });

      row.appendChild(col);
    }
    container.appendChild(row);
  }
};

events.move.forEach((event) => {
  document.addEventListener(event, (e) => {
    if (!draw) return;
    e.preventDefault();
    const coordinates = getCoordinates(e);
    const element = document.elementFromPoint(coordinates.x, coordinates.y);
    if (element && element.classList.contains("gridCol")) {
      drawOnGrid(element, erase);
    }
  });
});

events.up.forEach((event) => {
  document.addEventListener(event, () => {
    draw = false;
  });
});

gridButton.addEventListener("click", setupGrid);

clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
  erase = true;
});

paintBtn.addEventListener("click", () => {
  erase = false;
});

gridWidth.addEventListener("input", () => {
  widthValue.textContent = gridWidth.value.padStart(2, "0");
});

gridHeight.addEventListener("input", () => {
  heightValue.textContent = gridHeight.value.padStart(2, "0");
});

window.onload = () => {
  gridHeight.value = 10;
  gridWidth.value = 10;
  setupGrid();
};
