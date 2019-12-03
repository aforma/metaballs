const canvasSketch = require("canvas-sketch");
const createRegl = require("regl");
const createQuad = require("./regl/quad");
import frag from "./shader/frag.glsl";
import vert from "./shader/vert.glsl";

// Sketch parameters
const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: 'in',
  duration: 5,
  context: "webgl",
  fps: 25,
  timeScale: 1,
  animate: true,
  attributes: {
    antialias: false
  }
};

const NUM_METABALLS = 160;
const WIDTH = 6;
const HEIGHT = 9;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Artwork function
const sketch = ({ gl, update, render, pause }) => {
  const regl = createRegl({ gl });
  
  var metaballs = [];
  
  for (var i = 0; i < NUM_METABALLS; i++) {
    var radius = 0.2 * Math.random();
    metaballs.push({
      x: getRandomArbitrary(-WIDTH / 2, WIDTH / 2),
      y: getRandomArbitrary(-HEIGHT / 2, HEIGHT / 2),
      vx: Math.random() * 0.1 - 0.05,
      vy: Math.random() * 0.1 - 0.05,
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

  const animate = () => {
    for (var i = 0; i < NUM_METABALLS; i++) {
      var mb = metaballs[i];
      mb.x += mb.vx;
      if (mb.x - mb.r < -WIDTH / 2) {
        mb.vx = Math.abs(mb.vx);
      } else if (mb.x + mb.r > WIDTH / 2) {
        mb.vx = -Math.abs(mb.vx);
      }
      mb.y += mb.vy;
      if (mb.y - mb.r < -HEIGHT / 2) {
        mb.vy = Math.abs(mb.vy);
      } else if (mb.y + mb.r > HEIGHT / 2) {
        mb.vy = -Math.abs(mb.vy);
      }
    }

    for (let i = 0; i < NUM_METABALLS; i++) {
      let mb = metaballs[i];
      metabbalsUniform[`metaballs[${i}]`] = new Float32Array(3);
      metabbalsUniform[`metaballs[${i}]`][0] = mb.x;
      metabbalsUniform[`metaballs[${i}]`][1] = mb.y;
      metabbalsUniform[`metaballs[${i}]`][2] = mb.r;
    }
  }
  
  
  
  return () => {
    // Update regl sizes
    regl.poll();
    regl.clear({
      color: [0, 0, 1, 1]
    });
    animate();
    const quad = regl(createQuad({ frag, vert, metaballs: metabbalsUniform, total: NUM_METABALLS }));
    quad({ x: -WIDTH / 2, y: -HEIGHT / 2, width: WIDTH, height: HEIGHT });
  };
};

// Start the sketch
canvasSketch(sketch, settings);
