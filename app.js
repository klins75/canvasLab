// Page loaded
document.addEventListener("DOMContentLoaded", startTestBench);

function loadEventListeners() {
  // Dial01 wheel event
  document.querySelector('.control').addEventListener("wheel", (e)=> {
    controlPanel.events(e);
    // remove this later (for now it's out of the animation loop)
    clearCanvas.draw()
  });
  // Monitor Select
  document.querySelector('#log-panel').addEventListener("click", (e) => {
    monitors.highlight(e);
    e.preventDefault();
  });
}

// Start test bench
function startTestBench() {
  // build monitors
  buildMonitors();
  // build controls
  buildControls();
  // instantiate control panel
  controlPanel = new ControlPanel(controlPanelWidgets);
  // initial canvas draw
  clearCanvas.draw();
  // initial draw of control panel
  controlPanel.draw();
  // load event listeners
  loadEventListeners();
  // start the update loop
  updateLoop();
}

function updateLoop() {
  // set canvas
  // clearCanvas.draw();

  // control panel
  // controlPanel.draw();

  // update test obj (if any)
  drawObjects.forEach((obj) => obj.update());

  requestAnimationFrame(updateLoop);
}
