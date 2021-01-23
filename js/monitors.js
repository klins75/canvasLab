// MONITOR CLASS
class Monitor {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
    this.build = function () {
      let monitorGroup = `
        <div class="panel">
          <div class="screen">
            <div class="screenKey">
              <div class="screenKeyUpper"></div>
              <div class="screenKeyLower"></div>
            </div>
            <div class="screenKeyValue"></div>
          </div>
          <div class="legend"></div>
          <button class="button1"></button>
          <button class="button4"></button>
          <button class="button7"></button>
          <button class="button10"></button>
          <button class="button13"></button>
          <button class="button2"></button>
          <button class="button5"></button>
          <button class="button8"></button>
          <button class="button11"></button>
          <button class="button14"></button>
          <button class="button3"></button>
          <button class="button6"></button>
          <button class="button9"></button>
          <button class="button12"></button>
          <button class="button15"></button>
          <button class="monitorLabel"></button>
        </div>
      `;

      this.monitor = document.createElement("div");
      this.monitor.style.height = "20%";
      this.monitor.style.width = "100%";
      this.monitor.style.display = "flex";
      this.monitor.style.flexDirection = "row";
      this.monitor.style.border = "1px solid black";
      this.monitor.style.backgroundColor = "#338";
      this.monitor.innerHTML = monitorGroup;
      parentDiv.append(this.monitor);
    };
  }
}

let container = document.getElementById("log-panel");
// const log = console.log;

const makeMonitors = (num) => {
  let monitors = [];
  for (let i = 1; i < num + 1; i++) {
    monitors.push([`monitor${[i]}`]);
  }
  log(monitors);
  return monitors;
};

function startThing() {
  console.log("console started...");

  makeMonitors(10).forEach((monitor, index) => {
    monitor = new Monitor(container);
    monitor.build();
    container.lastElementChild.setAttribute("id", `monitor${index + 1}`);
    container.lastElementChild.setAttribute("class", `monitor${index + 1}`);
  });
} // function startThing() 's ending bracket. Leave alone.

function monitorButtons(e) {
  switch (e.target.className) {
    case "button1":
      highlight();
      break;
  }

  // highlight screen
  function highlight() {
    let screen = e.target.parentElement.children[0].children[1];
    log(`screen: ${screen.className}`);
    if (screen.style.backgroundColor === "white" || screen.style.backgroundColor === "") {
      screen.style.backgroundColor = "yellow";
    } else {
      screen.style.backgroundColor = "white";
    }
  }
}

document.addEventListener("DOMContentLoaded", startThing);
document.querySelector("#log-panel").addEventListener("click", monitorButtons);
