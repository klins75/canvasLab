const clearCanvas = {
  vertical: function () {
    // Vertical grid lines
    for (let i = 0; i < canvas.width / RETICULE; i++) {
      vline((i + 1) * RETICULE, GRID_LINE_COLOR);
      // Vertical grid highlights
      if (i % 5 === 0 && i !== 0 && i * RETICULE !== canvas.width / 2) {
        vline(i * RETICULE, rgbaTranslator(controlPanel.GRID_HL_COLOR));
      }
      if (i % 5 === 0 && i !== 0) {
        text(
          `${i * RETICULE}`,
          i * 20,
          15,
          rgbaTranslator(controlPanel.GRID_HL_COLOR)
        );
      }
    }
  },

  horizontal: function () {
    // Horizontal grid lines
    for (let i = 0; i < canvas.height / RETICULE; i++) {
      hline((i + 1) * RETICULE, GRID_LINE_COLOR);
      // grid highlights (usually blue)
      if (i % 5 === 0 && i !== 0 && i * RETICULE !== canvas.height / 2) {
        hline(i * RETICULE, rgbaTranslator(controlPanel.GRID_HL_COLOR));
      }
      if (i % 5 === 0 && i !== 0) {
        text(
          `${i * RETICULE}`,
          canvas.width - 36,
          i * 20 + 5,
          rgbaTranslator(controlPanel.GRID_HL_COLOR)
        );
      }
    }
  },

  centerlines: function () {
    // Centerlines
    hline(canvas.height / 2, GRID_CL_COLOR);
    vline(canvas.width / 2, GRID_CL_COLOR);
  },

  mask: function () {
    drawRect(
      0,
      0,
      canvas.width,
      canvas.height,
      `rgba(255,255,255,${controlPanel.GRID_INTENSITY})`
    );
  },

  draw: function () {
    // Background
    drawRect(0, 0, canvas.width, canvas.height, GRID_BG_COLOR);
    this.vertical();
    this.horizontal();
    this.centerlines();
    this.mask();
  },
};

// Drawing Functions --------------------
function text(text, x, y, color) {
  ctx.font = `${(4 * RETICULE) / 5}px monospace`;
  ctx.fillStyle = color || "black";
  ctx.fillText(text, x, y);
}

function hline(y, color, lw, optional) {
  context = optional || ctx;
  context.beginPath();
  context.lineWidth = lw || 1;
  context.strokeStyle = color;
  context.moveTo(0, y);
  context.lineTo(canvas.width, y);
  context.stroke();
}

function vline(x, color, lw, optional) {
  context = optional || ctx;
  context.beginPath();
  context.lineWidth = lw || 1;
  context.strokeStyle = color;
  context.moveTo(x, 0);
  context.lineTo(x, canvas.height);
  context.stroke();
}

function drawCircle(x, y, r, color, optional) {
  context = optional || ctx;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

function drawRect(x, y, w, h, color, optional) {
  context = optional || ctx;
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function rgbaTranslator(color) {
  let result = `rgba(${color.r.toString()},${color.g.toString()},${color.b.toString()},${color.a.toString()})`;
  return result;
}

// General Functions --------------------

function toDeg(n) {
  let result = (n * 180) / Math.PI;
  return result;
}
function toRad(n) {
  let result = (n * Math.PI) / 180;
  return result;
}

// const controls = {
//   GRID_HL_COLOR: {
//     r: 0,
//     g: 0,
//     b: 255,
//     a: 1,
//   },

//   GRID_INDICATOR_COLOR: {
//     r: 0,
//     g: 128,
//     b: 255,
//     a: 1,
//   },

//   GRID_INTENSITY: 0,

//   controlsArray: function () {
//     let x = [
//       {
//         dial: dial01GridIntensity,
//         context: dial01ctx,
//         controllant: 1 - controls.GRID_INTENSITY,
//       },
//       {
//         dial: dial02GridHighlightIntenstiy,
//         context: dial02ctx,
//         controllant: controls.GRID_HL_COLOR.a,
//       },
//     ];
//     return x;
//   },

//   gridIntensity: function (e) {
//     if (controls.GRID_INTENSITY <= 1 && controls.GRID_INTENSITY >= 0) {
//       let setting = e.deltaY / 1000;
//       controls.GRID_INTENSITY += setting;
//       // truncate zeroes and prevent over-adjust
//       if (controls.GRID_INTENSITY < 0) {
//         controls.GRID_INTENSITY = 0;
//       }
//       if (controls.GRID_INTENSITY > 1) {
//         controls.GRID_INTENSITY = 1;
//       }
//     }
//   },

//   gridHighlightIntensity: function (e) {
//     if (controls.GRID_HL_COLOR.a <= 1 && controls.GRID_HL_COLOR.a >= 0) {
//       let setting = e.deltaY / 1000;
//       controls.GRID_HL_COLOR.a -= setting;
//       // truncate zeroes and prevent over-adjust
//       if (controls.GRID_HL_COLOR.a < 0) {
//         controls.GRID_HL_COLOR.a = 0;
//       }
//       if (controls.GRID_HL_COLOR.a > 1) {
//         controls.GRID_HL_COLOR.a = 1;
//       }
//     }
//   },

//   draw: function () {
//     let array = this.controlsArray();
//     array.forEach((control) => {
//       drawRect(
//         0,
//         0,
//         control.dial.width,
//         control.dial.height,
//         "black",
//         control.context
//       );
//       for (i = 0; i < 10; i++) {
//         control.context.beginPath();
//         control.context.moveTo(
//           control.dial.width / 3,
//           ((i + 1) * control.dial.height) / 10
//         );
//         control.context.lineTo(
//           (2 * control.dial.width) / 3,
//           ((i + 1) * control.dial.height) / 10
//         );
//         control.context.strokeStyle = "white";
//         control.context.lineWidth = 2;
//         control.context.stroke();
//       }
//       let color = this.GRID_INDICATOR_COLOR;
//       // dial brightens as it goes to top
//       color.g = 255 - (1 - control.controllant) * 255;

//       hline(
//         -control.controllant * control.dial.height + control.dial.height,
//         rgbaTranslator(color),
//         6,
//         control.context
//       );
//     });
//   },
// };

const monitors = {
  highlight: function (e) {
    let div = e.target;

    switch (div.className) {
      case "stat-tag-btn":
        let parent = div.parentElement.parentElement.parentElement;

        if (parent.style.border === "") {
          parent.style.border = "2px solid yellow";
          parent.children[1].childNodes[0].className = "info-value-highlighted"
        } else {
          parent.style.border = "";
          parent.children[1].childNodes[0].className = "info-value"
        }
        break;
    }
  },
};

// CONTROL PANEL  ------------------------------------------
class ControlPanel {
  constructor(widgets) {
    this.widgets = widgets;

    this.GRID_HL_COLOR = {
      r: 0,
      g: 0,
      b: 255,
      a: 1,
    };

    this.GRID_INDICATOR_COLOR = {
      r: 0,
      g: 128,
      b: 255,
      a: 1,
    };
    this.GRID_INTENSITY = 0;
    // dial levels (animation only)
    this.dials = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0];

    this.controlsArray = [
      {
        dial: this.widgets.dial01().elem,
        context: this.widgets.dial01().ctx,
        controllant: this.widgets.dial01().ctrl,
      },
      {
        dial: this.widgets.dial02().elem,
        context: this.widgets.dial02().ctx,
        controllant: this.widgets.dial02().ctrl,
      },
      {
        dial: this.widgets.dial03().elem,
        context: this.widgets.dial03().ctx,
        controllant: this.widgets.dial03().ctrl,
      },
      {
        dial: this.widgets.dial04().elem,
        context: this.widgets.dial04().ctx,
        controllant: this.widgets.dial04().ctrl,
      },
      {
        dial: this.widgets.dial05().elem,
        context: this.widgets.dial05().ctx,
        controllant: this.widgets.dial05().ctrl,
      },
      {
        dial: this.widgets.dial06().elem,
        context: this.widgets.dial06().ctx,
        controllant: this.widgets.dial06().ctrl,
      },
      {
        dial: this.widgets.dial07().elem,
        context: this.widgets.dial07().ctx,
        controllant: this.widgets.dial07().ctrl,
      },
      {
        dial: this.widgets.dial08().elem,
        context: this.widgets.dial08().ctx,
        controllant: this.widgets.dial08().ctrl,
      },
      {
        dial: this.widgets.dial09().elem,
        context: this.widgets.dial09().ctx,
        controllant: this.widgets.dial09().ctrl,
      },
      {
        dial: this.widgets.dial010().elem,
        context: this.widgets.dial010().ctx,
        controllant: this.widgets.dial010().ctrl,
      },
    ];
  }

  events = (e) => {
    // find the element data tag
    let dial = Number(e.target.getAttribute("data-ctrl")) - 1;
    // adjust the level (animation only)
    if (e.target.className === "control-unit-canvas") {
      this.dials[dial] = this.dialLevel([dial], e.deltaY);
      this.draw();
    }
    // perform the task associated with dial
    switch (e.target.id) {
      case "dial01":
        this.widgets.dial01().gridIntensity(e);
        break;
      case "dial02":
        this.widgets.dial02().gridHighlightIntensity(e);
        break;
      case "dial03":
        break;
    }
  };

  dialLevel = (n, deltaY) => {
    let dial = this.dials[n];
    if (dial <= 1 && dial >= 0) {
      let setting = -deltaY / 1000;
      dial += setting;
      // truncate zeroes and prevent over-adjust
      if (dial < 0) {
        dial = 0;
      }
      if (dial > 1) {
        dial = 1;
      }
    }
    return dial;
  };

  draw = () => {
    // let array = this.controlsArray;
    this.controlsArray.forEach((control) => {
      drawRect(
        0,
        0,
        control.dial.width,
        control.dial.height,
        "black",
        control.context
      );
      for (let i = 0; i < 10; i++) {
        control.context.beginPath();
        control.context.moveTo(
          control.dial.width / 3,
          ((i + 1) * control.dial.height) / 10
        );
        control.context.lineTo(
          (2 * control.dial.width) / 3,
          ((i + 1) * control.dial.height) / 10
        );
        control.context.strokeStyle = "white";
        control.context.lineWidth = 2;
        control.context.stroke();
      }
      let color = this.GRID_INDICATOR_COLOR;
      // dial brightens as it goes to top
      color.g = 255 - (1 - control.controllant()) * 255;

      hline(
        -control.controllant() * control.dial.height + control.dial.height,
        rgbaTranslator(color),
        6,
        control.context
      );
    });
  };
}

function buildMonitors() {
  function monitor(a) {
    return `
  <div class="stat-display">
  <div class="stat-display-key" id="stat-display-key${Number(a) + 1}">
    <div class="stat-display-tag" id="stat-display-tag"><button class="stat-tag-btn">${
      Number(a) + 1
    }</button></div>
    <div class="stat-display-legend">target bearing</div>
  </div>
  <div class="stat-display-info" id="stat-display-info${
    Number(a) + 1
  }"><span class="info-value">1.556</span><span class="info-units">radians</span></div>
</div>
  `;
  }
  for (let i = 0; i < 20; i++) {
    logPanel.innerHTML += monitor([i]);
  }
}



function buildControls() {
  function controlUnit(a) {
    return `
    <div class="control-unit">
      <div class="control-legend">${controlPanelWidgetsNames[Number(a)]}</div>
      <canvas
        height="126"
        width="38"
        class="control-unit-canvas"
        id="dial0${Number(a) + 1}"
        data-ctrl="${Number(a) + 1}"
      ></canvas>
    </div>
  `
  } 
  for(let i = 0; i < 10; i ++ ) {
    controls.innerHTML += controlUnit([i])
  }
}