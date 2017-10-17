
uniform vec2 uResolution;
uniform float uTime;

vec3 gradients[4];
vec3 currentGradient[4];
vec2 uv;
float fractal;
vec3 rgb;
float currentIndex;

vec3 getGradient(int id) {
    for (int i = 0 ; i < 4 ; i++ ) {
        if (i == id) return gradients[i];
    }
}

void main( void ) {
	uv   = gl_FragCoord.xy/uResolution;

	currentIndex = floor( uTime );
	fractal = fract( uTime );

	gradients[0]	= vec3( .70, .93, .70 );   // .0
	gradients[1]	= vec3(	.68, .89, .97 );   // .33
	gradients[2]	= vec3( .95, .82, .91 );   // .66
	gradients[3]	= vec3( .94, .71, .81 );   // 1.

	currentGradient[0] = mix( getGradient( int( mod( 0. + currentIndex, 4. ) ) ), getGradient( int( mod( 1. + currentIndex, 4. ) ) ), fractal );
	currentGradient[1] = mix( getGradient( int( mod( 1. + currentIndex, 4. ) ) ), getGradient( int( mod( 2. + currentIndex, 4. ) ) ), fractal );
	currentGradient[2] = mix( getGradient( int( mod( 2. + currentIndex, 4. ) ) ), getGradient( int( mod( 3. + currentIndex, 4. ) ) ), fractal );
	currentGradient[3] = mix( getGradient( int( mod( 3. + currentIndex, 4. ) ) ), getGradient( int( mod( 0. + currentIndex, 4. ) ) ), fractal );

	if( uv.x >= .0 && uv.x < .25 ) {
		rgb = vec3( mix( currentGradient[0], currentGradient[1], uv.x * 4.) );
	}
	else if( uv.x >= .25 && uv.x < .5 ) {
		rgb = vec3( mix( currentGradient[1], currentGradient[2], ( uv.x - .25 ) * 4.) );
	}
	else if( uv.x >= .5 && uv.x < .75 ) {
		rgb = vec3( mix( currentGradient[2], currentGradient[3], ( uv.x - .5 ) * 4.) );
	}
	else if( uv.x >= .75 ) {
		rgb = vec3( mix( currentGradient[3], currentGradient[0], ( uv.x - .75 ) * 4.) );
	}

	gl_FragColor = vec4( rgb, 1. );
}