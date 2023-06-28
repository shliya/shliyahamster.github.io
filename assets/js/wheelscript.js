/**
* Prize data will space out evenly on the deal wheel based on the amount of items available.
* @param text [string] name of the prize
* @param color [string] background color of the prize
* @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
*/
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
const setWheel = document.querySelector("#setwheel");
const reaper = wheel.querySelector(".grim-reaper");
const spinClass = "is-spinning";
const selectedClass = "selected";
const spinnerStyles = window.getComputedStyle(spinner);

let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;
const createPrizeNodes = (prizesData, prizeSlice, prizeOffset) => {
  prizesData.forEach(({ text, color, reaction }, i) => {
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

const createConicGradient = (prizesData) => {
  console.log(prizesData)
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizesData
      .map(({ color }, i) => `${color} 0 ${(100 / prizesData.length) * (prizesData.length - i)}%`)
      .reverse()
    }
    );`
  );
};

const setNewWheel = () => {
  const test = document.querySelector("#names").value;
  let textArray = test.split("\n");
  let colorArray = ['#B39066', '#6B5343', '#B39066', '#6B5343', '#B39066', '#6B5343', '#B39066', '#6B5343']
  let reaction = "laughing";
  let prizesData = [];
  textArray = textArray.filter(word => word !== "")
  let colorIndex = 0
  console.log(textArray)
  for (let i = 0; i < textArray.length; i++) {
    if (i > colorArray.length - 1) {
      colorIndex = i - colorArray.length
    } else {
      colorIndex = i;
    }
    prizesData.push({
      text: textArray[i],
      color: colorArray[colorIndex],
      reaction: reaction
    })
  }
  spinner.setAttribute("style", '');
  spinner.innerHTML = ""
  localStorage.setItem("prizesData", JSON.stringify(prizesData))
  setupWheel(prizesData);
}

const setupWheel = (prizesData) => {
  let prizeSlice = 360 / prizesData.length;
  let prizeOffset = Math.floor(180 / prizesData.length);
  localStorage.setItem("prizeSlice", prizeSlice)
  localStorage.setItem("prizeOffset", prizeOffset)
  createConicGradient(prizesData);
  createPrizeNodes(prizesData, prizeSlice, prizeOffset);
  prizeNodes = wheel.querySelectorAll(".prize");
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  const prizeSlice = localStorage.getItem("prizeSlice")
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += (2 * Math.PI);

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  if (currentSlice !== slice) {
    ticker.style.animation = "none";
    setTimeout(() => ticker.style.animation = null, 10);
    currentSlice = slice;
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
  const prizeSlice = localStorage.getItem("prizeSlice")
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;
};

setWheel.addEventListener("click", () => {
  setNewWheel();
})

trigger.addEventListener("click", () => {
  if (reaper.dataset.reaction !== "resting") {
    reaper.dataset.reaction = "resting";
  }
  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "none";
  runTickerAnimation();
});

spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty("--rotate", rotation);
});
let checkInit = localStorage.getItem("prizesData")
if (!!checkInit !== false) {
  setupWheel(JSON.parse(checkInit))
}