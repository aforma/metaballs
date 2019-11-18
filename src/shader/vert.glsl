precision mediump float;
attribute vec3 position;
uniform mat4 view, projection;
uniform float width;
uniform float height;
uniform float size;
varying vec2 uv;
void main() {
  uv.x = position.x / width + 0.5;
  uv.y = position.y / height + 0.5;
  gl_Position = projection * view * vec4(position, 1);
}