precision mediump float;
varying vec2 uv;
uniform vec3 metaballs[50];

void main() {
  float x = uv.x;
  float y = uv.y;
  float v = 0.0;

  for (int i = 0; i < 50; i++) {
    vec3 mb = metaballs[i];
    float dx = mb.x - x;
    float dy = mb.y - y;
    float r = mb.z;
    v += r*r/(dx*dx + dy*dy);
    if (v > 1.0) {
      gl_FragColor = vec4(255.0, 0.0, 0.0, 1.0);
      return;
    }
  }

  gl_FragColor = vec4(0.0, 0.0, 255.0, 1.0);
}