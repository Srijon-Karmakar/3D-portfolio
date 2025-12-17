export const rippleVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

export const rippleFragment = `
  uniform sampler2D uTexture;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uStrength;

  varying vec2 vUv;

  void main() {
    float dist = distance(vUv, uCenter);
    float ripple = sin(dist * 40.0 - uTime * 6.0);
    float decay = exp(-dist * 6.0);

    float effect = ripple * decay * uStrength;

    vec2 offset = normalize(vUv - uCenter) * effect * 0.015;

    // chromatic aberration
    vec4 r = texture2D(uTexture, vUv + offset * 1.2);
    vec4 g = texture2D(uTexture, vUv + offset);
    vec4 b = texture2D(uTexture, vUv + offset * 0.8);

    gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
  }
`;
