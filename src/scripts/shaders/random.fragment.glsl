
varying vec3 vNormal;
varying vec3 vColor;

void main( void ) {
	// float moy = ( vNormal.x + vNormal.y + vNormal.z ) / 3.;
	float moy = ( vColor.x + vColor.y + vColor.z ) / 3.;
	moy -= .2;

	gl_FragColor = vec4( vec3( moy ) , 1. );
}