precision mediump float;
attribute vec3 position;
uniform mat4 view, projection;
uniform float width;
uniform float height;
uniform float size;
varying vec2 uv;
void main() {
  uv.x = position.x;
  uv.y = position.y;
  gl_Position = vec4(position, 1);
}