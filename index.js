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

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

const getEventCoordinates = (e) => {
  if (!isTouchDevice()) {
    return { x: e.clientX, y: e.clientY };
  } else {
    if (e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }
  return null;
};

const handleDraw = (col) => {
  if (erase) {
    col.style.backgroundColor = "transparent";
  } else {
    col.style.backgroundColor = colorButton.value;
  }
};

gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count++;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);

      col.addEventListener(events[deviceType].down, (e) => {
        e.preventDefault();
        handleDraw(col);
      });

      div.appendChild(col);
    }

    container.appendChild(div);
  }

  document.addEventListener(events[deviceType].move, (e) => {
    if (!draw) return;
    e.preventDefault();
    let coordinates = getEventCoordinates(e);
    if (coordinates) {
      let element = document.elementFromPoint(coordinates.x, coordinates.y);
      if (element && element.classList.contains("gridCol")) {
        handleDraw(element);
      }
    }
  });

  document.addEventListener(events[deviceType].up, () => {
    draw = false;
  });
});

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
  widthValue.innerHTML =
    gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridHeight.value = 10;
  gridWidth.value = 10;
};
