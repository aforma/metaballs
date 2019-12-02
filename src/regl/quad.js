const mat4 = require("gl-mat4");

module.exports = function({ frag, vert, metaballs }) {
  return {
    frag,
    vert: (context, { width, height }) => {
      return vert;
    },
    attributes: {
      position: ({ tick }, { x, y, width, height }) => {
        return [
          x,
          y,
          0,
          x,
          y + height,
          0,
          x + width,
          y + height,
          0,
          x + width,
          y + height,
          0,
          x + width,
          y,
          0,
          x,
          y,
          0
        ];
      }
    },
    uniforms: {
      view: ({ tick }) => {
        return mat4.lookAt([], [0, 0, 10], [0, 0, 0], [0, 1, 0]);
      },
      projection: ({ viewportWidth, viewportHeight }) =>
        mat4.perspective(
          [],
          Math.PI / 4,
          viewportWidth / viewportHeight,
          0.01,
          1000
        ),
      width: (context, { width }) => width,
      height: (context, { height }) => height,
      ...metaballs
    },
    depth: { enable: false },
    count: 6
  };
};
