

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vVisible;

void main(void) {
	vNormal = normal;
	vColor = color;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1. );

    gl_Position = projectionMatrix * mvPosition;
}