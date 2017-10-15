
#define MAX_DIST_1 .5
#define MAX_DIST_2 1.
#define MAX_Time 10.
#define PI 3.1415926535
#define PI_2 6.2831853071

#define s_influenceSlope -15.
#define s_frequency 5.
#define s_amplitude .2
#define s_waveLength 50.
#define s_shift .1

#define b_influenceSlope -10.
#define b_frequency 4.
#define b_amplitude 1.5
#define b_waveLength 10.
#define b_shift .03



uniform float uTime;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform sampler2D uTex;
uniform float uNoiseInfluence;

varying vec2 vFilterCoord;
varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uInteractionsTime[ MAX_INT ];
uniform vec3 uInteractionsPos[ MAX_INT ];
uniform float uInteractionsPonderation[ MAX_INT ];
uniform int uInteractionsIndex;

vec3 offset = vec3( 0., .1, .2);
vec3 offsetWave = vec3( .4, .2, .0);
vec3 noise 	= vec3(.0, .0, .0);
vec3 rgb 	= vec3(.0, .0, .0);
vec2 diff 	= vec2(.0, .0);

void main( void ) {

	vec2 uv = gl_FragCoord.xy/uResolution;

	noise = vec3(
		snoise( vec3( uv * 6. , uTime * .3 ) ) * .5 * uNoiseInfluence + 1.,
		snoise( vec3( uv * 6. , uTime * .3 ) ) * .5 * uNoiseInfluence + 1.,
		snoise( vec3( uv * 6. , uTime * .3 ) ) * .5 * uNoiseInfluence + 1.
	);

	// rgb = texture2D(uSampler, vFilterCoord.xy + explosions * .004 ).rgb * noise;
	rgb = texture2D(uSampler, vTextureCoord + noise.xy * .005 ).rgb;
	rgb = rgb * ( .8 + noise * .5 );

	gl_FragColor = vec4( rgb, 1. );
}
