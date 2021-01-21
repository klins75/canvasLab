const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Metrics
const sdKey1 = document.getElementById("stat-display-key1");
const sdInfo1 = document.getElementById("stat-display-info1");

const sdKey2 = document.getElementById("stat-display-key2");
const sdInfo2 = document.getElementById("stat-display-info2");

const sdKey3 = document.getElementById("stat-display-key3");
const sdInfo3 = document.getElementById("stat-display-info3");

const sdKey4 = document.getElementById("stat-display-key4");
const sdInfo4 = document.getElementById("stat-display-info4");

const sdKey5 = document.getElementById("stat-display-key5");
const sdInfo5 = document.getElementById("stat-display-info5");

const sdKey6 = document.getElementById("stat-display-key6");
const sdInfo6 = document.getElementById("stat-display-info6");

const sdKey7 = document.getElementById("stat-display-key7");
const sdInfo7 = document.getElementById("stat-display-info7");

const sdKey8 = document.getElementById("stat-display-key8");
const sdInfo8 = document.getElementById("stat-display-info8");

const sdKey9 = document.getElementById("stat-display-key9");
const sdInfo9 = document.getElementById("stat-display-info9");

const sdKey10 = document.getElementById("stat-display-key10");
const sdInfo10 = document.getElementById("stat-display-info10");

const sdKey11 = document.getElementById("stat-display-key11");
const sdInfo11 = document.getElementById("stat-display-info11");

const sdKey12 = document.getElementById("stat-display-key12");
const sdInfo12 = document.getElementById("stat-display-info12");

const sdKey13 = document.getElementById("stat-display-key13");
const sdInfo13 = document.getElementById("stat-display-info13");

const logPanel = document.querySelector("#log-panel");

const log = console.log;

// time
let requestID;
let dt;
let previousTime;

let RETICULE = 20;
let GRID_LINE_COLOR = "lightgray";
let GRID_BG_COLOR = "white";
let GRID_CL_COLOR = "#f00";
let GRID_LEGEND_COLOR = "#00f";

// control panel
// const dial01GridIntensity = document.querySelector("#dial01");
// const dial02GridHighlightIntenstiy = document.querySelector("#dial02");
// const dial03 = document.querySelector("#dial03");

let controlPanel;

let controlPanelWidgets = {
  dial01: () => {
    return {
      elem: document.querySelector("#dial01"),
      ctrl: () => {
        return controlPanel.dials[0];
      },
      ctx: document.querySelector("#dial01").getContext("2d"),
      name: () => {
        elem.innerHTML = "foo";
        return "GRID";
      },
      gridIntensity: (e) => {
        if (controlPanel.GRID_INTENSITY <= 1 && controlPanel.GRID_INTENSITY >= 0) {
          let setting = e.deltaY / 1000;
          controlPanel.GRID_INTENSITY += setting;
          // truncate zeroes and prevent over-adjust
          if (controlPanel.GRID_INTENSITY < 0) {
            controlPanel.GRID_INTENSITY = 0;
          }
          if (controlPanel.GRID_INTENSITY > 1) {
            controlPanel.GRID_INTENSITY = 1;
          }
        }
      }
    };
  },
  dial02: () => {
    return {
      elem: document.querySelector("#dial02"),
      ctrl: () => {
        return controlPanel.dials[1];
      },
      ctx: document.querySelector("#dial02").getContext("2d"),
      gridHighlightIntensity: (e) => {
        if (controlPanel.GRID_HL_COLOR.a <= 1 && controlPanel.GRID_HL_COLOR.a >= 0) {
          let setting = e.deltaY / 1000;
          controlPanel.GRID_HL_COLOR.a -= setting;
          // truncate zeroes and prevent over-adjust
          if (controlPanel.GRID_HL_COLOR.a < 0) {
            controlPanel.GRID_HL_COLOR.a = 0;
          }
          if (controlPanel.GRID_HL_COLOR.a > 1) {
            controlPanel.GRID_HL_COLOR.a = 1;
          }
        }
      }
    };
  },
  dial03: () => {
    return {
      elem: document.querySelector("#dial03"),
      ctx: document.querySelector("#dial03").getContext("2d"),
      ctrl: () => {
        return controlPanel.dials[2];
      },
    };
  },
  dial04: () => {
    return {
      elem: dial04,
      ctx: dial04.getContext("2d"),
      ctrl: () => {
        return controlPanel.dials[3];
      },
    };
  },
  dial05: () => {
    return {
      elem: dial05,
      ctx: dial05.getContext("2d"),
      ctrl: () => {
        return controlPanel.dials[4];
      },
    };
  },
  dial06: () => {
    return {
      elem: dial06,
      ctx: dial06.getContext("2d"),
      ctrl: () => {
        return controlPanel.dials[5];
      },
    };
  },
  // dial07: () => {
  //   return {
  //     elem: dial07,
  //     ctx: dial07.getContext("2d"),
  //     ctrl: () => {
  //       return controlPanel.dials[6];
  //     },
  //     html: `
  //     <div class="control-unit">
  //       <div class="control-legend">7</div>
  //       <canvas
  //         height="126"
  //         width="38"
  //         class="control-unit-canvas"
  //         id="dial07"
  //         data-ctrl='7'
  //       ></canvas>
  //     </div>
  //     `,
  //   };
  // },
};

let drawObjects = [];
