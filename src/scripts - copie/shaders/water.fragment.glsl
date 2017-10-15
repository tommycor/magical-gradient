
#define MAX_DIST 5.
#define MAX_Time 10.

uniform float uTime;
uniform vec2 uResolution;
uniform bool uGreyscale;
uniform sampler2D uTex;

uniform float uInteractionsTime[ MAX_INT ];
uniform vec2 uInteractionsPos[ MAX_INT ];
uniform int uInteractionsIndex;

varying vec2 vUv;
varying vec3 vPosition;

vec3 offset = vec3( 0., .1, .2);
vec3 rgb = vec3(.0, .0, .0);

void main() {
	vec3 noise 	= vec3(.0, .0, .0);
	vec3 rgb 	= vec3(.0, .0, .0);
	vec2 diff 	= vec2(.0, .0);
	float dist  = .0;
	float influence = .0;
	float displacement = .0;
	float frequency = 1.;
	float attenuation = 2.;


	noise = vec3(
		snoise( vec3( vUv * 2. + offset.r, uTime * .5 ) ) * .5 + .75,
		snoise( vec3( vUv * 2. + offset.g, uTime * .5 ) ) * .5 + .75,
		snoise( vec3( vUv * 2. + offset.b, uTime * .5 ) ) * .5 + .75
	);

	// rgb = texture2D(uTex, vUv).rgb * noise;


	for( int i = 0 ; i < MAX_INT ; i++ ) {
		if( i >= uInteractionsIndex ) {
			break;
		}

		dist = distance( vec3( uInteractionsPos[i], .0 ), vec3( vPosition.xy , 0.) );

		influence = ( dist * -.2 ) + .5;

		// influence is gonna act on sombrero function
		if( influence > .0 ) {
			rgb = rgb.rgb + influence;
		}
		rgb = rgb.rgb + sin( dist * uTime );
		// rgb = rgb.rgb + sin( dist + uTime * 2. ) * .5 + .5;


		// SOMBRERO FUNCTION
		// diff = uInteractionsPos[i].xy - vPosition.xy;
		// float r = sqrt( pow( ( diff.x ) * frequency, 2.) +  pow( ( diff.y ) * frequency, 2.) );		
		// displacement = sin( r ) / r;


	}

	

	gl_FragColor = vec4( rgb, 1. );
}
