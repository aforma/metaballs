const canvasSketch = require("canvas-sketch");
const createRegl = require("regl");
const createQuad = require("./regl/quad");
import frag from "./shader/frag.glsl";
import vert from "./shader/vert.glsl";

// Sketch parameters
const settings = {
  dimensions: "a3",
  pixelsPerInch: 300,
  units: "in",
  context: "webgl",
  fps: 60,
  timeScale: 1,
  animate: true,
  attributes: {
    antialias: false
  }
};

// Artwork function
const sketch = ({ gl, update, render, pause }) => {
  const dataToSendToGPU = [];
  const regl = createRegl({ gl });
  
  var metaballs = [];
  
  for (var i = 0; i < 10; i++) {
    var radius = 1;
    metaballs.push({
      x: Math.random() * (6 - 2 * radius) + radius,
      y: Math.random() * (8.4 - 2 * radius) + radius,
      r: radius
    });
  }
  
  const metabbalsUniform = {};
  for (let i = 0; i < 10; i++) {
    let mb = metaballs[i];
    metabbalsUniform[`metaballs[${i}]`] = new Float32Array(3);
    metabbalsUniform[`metaballs[${i}]`][0] = mb.x;
    metabbalsUniform[`metaballs[${i}]`][1] = mb.y;
    metabbalsUniform[`metaballs[${i}]`][2] = mb.r;
  }
  
  const quad = regl(createQuad({ frag, vert, metaballs: metabbalsUniform }));


  return () => {
    // Update regl sizes
    regl.poll();
    regl.clear({
      color: [0, 0, 1, 1]
    });
    quad({ x: -3, y: -4.2, width: 6, height: 8.4, ...metabbalsUniform });
  };
};

// Start the sketch
canvasSketch(sketch, settings);
