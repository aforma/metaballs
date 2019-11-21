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

const NUM_METABALLS = 50;
const WIDTH = 1;
const HEIGHT = 1;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Artwork function
const sketch = ({ gl, update, render, pause }) => {
  const regl = createRegl({ gl });
  
  var metaballs = [];
  
  for (var i = 0; i < NUM_METABALLS; i++) {
    var radius = 0.1;
    metaballs.push({
      x: getRandomArbitrary(-WIDTH / 2, WIDTH / 2),
      y: getRandomArbitrary(-HEIGHT / 2, HEIGHT / 2),
      r: radius
    });
  }
  
  const metabbalsUniform = {};
  for (let i = 0; i < NUM_METABALLS; i++) {
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
    quad({ x: -0.5, y: -0.5, width: WIDTH, height: HEIGHT, ...metabbalsUniform });
  };
};

// Start the sketch
canvasSketch(sketch, settings);
