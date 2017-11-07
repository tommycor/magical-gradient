#define PI 3.1415926535897932384626433832795
#define I_PI_3 0.1061032953945969

uniform vec2 uMouse;

varying vec3 vNormal;
varying vec3 vColor;

void main(void) {
	vColor = color;

	vec3 newPosition 	= position;
	float dist 			= distance( position.xy, uMouse );

	if( dist < 15. ) {
		dist += 15.;
		newPosition.z -= ( sin(dist * I_PI_3) * .5 + .5 )  * 1.5;
		// newPosition.z -= dist * sin(dist * I_PI_3) * .9;
	}

	vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1. );

    gl_Position = projectionMatrix * mvPosition;
}