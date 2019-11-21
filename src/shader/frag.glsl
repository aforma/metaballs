precision mediump float;
varying vec2 uv;
uniform vec3 metaballs[50];

void main() {
  float x = uv.x;
  float y = uv.y;

  for (int i = 0; i < 50; i++) {
    vec3 mb = metaballs[i];
    float dx = mb.x - x;
    float dy = mb.y - y;
    float r = mb.z;
    if (dx * dx + dy * dy < r * r) {
      gl_FragColor = vec4(x, y, 0.0, 1.0);
      return;
    }
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}