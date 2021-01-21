// Page loaded
document.addEventListener("DOMContentLoaded", startTestBench);

function loadEventListeners() {
  // Dial01 wheel event
  document.querySelector('.control').addEventListener("wheel", (e)=> {
    controlPanel.events(e)
  });
  // Monitor Select
  logPanel.addEventListener("click", monitors.highlight);
}

// Start test bench
function startTestBench() {
  // instantiate control panel
  controlPanel = new ControlPanel(controlPanelWidgets);
  // load event listeners
  loadEventListeners();

  updateLoop();
}

function updateLoop() {
  // set canvas
  clearCanvas.draw();

  // control panel
  controlPanel.draw();

  // update test obj (if any)
  drawObjects.forEach((obj) => obj.update());

  requestAnimationFrame(updateLoop);
}
