const dock = document.getElementById("dock");
const operations = document.querySelectorAll(".operation");
const equals = [document.querySelector("#execute")];
const perform = {
  "+": add,
  "-": subtract,
  x: multiply,
  "÷": divide,
  "*": multiply
};
// document.addEventListener("keydown", ev => {
//   if (ev.key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
//     input(ev.key);
//   }
//   console.log(ev.keyCode);
//   if (Number(ev.keyCode) in [107, 109, 88, 106, 111]) {
//     console.log("operate");
//     operate(ev.key);
//   }
//   if (ev.key === "Enter") {
//     executeBinary();
//   }
//   // event.returnValue = false;
//   // ev.preventDefault();
// });
let operation = "";
let aboutToEnable = false;
const addToHist = s => {
  const maxLen = 21;
  const newHist = document.createElement("p");
  newHist.innerHTML = s.substring(0, Math.min(maxLen, s.length));
  document.getElementById("history").prepend(newHist);
  reset();
};
const executeBinary = () => {
  const [a, b] = this.dock.innerHTML.split(operation);
  const result = perform[operation](a, b);
  addToHist(`${a}${operation}${b} = ${result}`);
};
const operate = op => {
  if (!operation && dock.innerHTML) {
    const myOp = op;
    this.dock.innerHTML += myOp;
    operation = myOp;
    disableButtons(operations);
    aboutToEnable = true;
  }
};
const reset = () => {
  this.dock.innerHTML = "";
  operation = "";
  disableButtons(operations);
  disableButtons(equals);
};
const input = number => {
  if (!operation) {
    enableButtons(operations);
  }
  if (aboutToEnable) {
    enableButtons(equals);
    aboutToEnable = false;
  }
  this.dock.innerHTML += number;
};
const executeUnary = unary => {
  const result = unary(this.dock.innerHTML);
  addToHist(`${unary.name}(${this.dock.innerHTML}) = ${result}`);
};
const disableButtons = buttons => {
  buttons.forEach(b => (b.disabled = true));
};
const enableButtons = buttons => {
  buttons.forEach(b => (b.disabled = false));
};
disableButtons(operations);
