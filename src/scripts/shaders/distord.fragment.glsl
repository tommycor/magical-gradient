
uniform vec2 uResolution;
uniform sampler2D uImage;
uniform sampler2D uDistortionMap;

void main( void ) {
	vec2 uv  = gl_FragCoord.xy/uResolution;

	vec2 distortion = texture2D(uDistortionMap, uv.xy ).xy;
	distortion.x = ( distortion.x - .5 )  * (-1.) * .4;
	distortion.y = ( distortion.y - .5 ) * .4;

	vec3 rgb = texture2D(uImage, uv.xy + distortion.rg ).rgb;

	// rgb = rgb * .5;

	gl_FragColor = vec4( rgb, 1. );
	// gl_FragColor = vec4( distortion.x, distortion.y, 0, 1. );
}