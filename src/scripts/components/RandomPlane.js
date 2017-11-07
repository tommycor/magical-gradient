import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';

module.exports = class RandomPlane extends Component {
	onInit() {
		this.uniforms = {
			uResolution:    { type: 'v2', 	value: new THREE.Vector2( 0, 0 ) },
			uTime:    		{ type: 'f', 	value: 0 },
			uMouse:    		{ type: 'v2', 	value: new THREE.Vector2( 0, 0 ) },
		};

		this.geometry 	= this.createGeometry();
		this.material 	= new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: require('../shaders/random.vertex.glsl'),
			fragmentShader: require('../shaders/random.fragment.glsl'),
			vertexColors: THREE.FaceColors,
			transparent: true
		} );

		this.mesh = new THREE.Mesh( this.geometry, this.material );
	}

	createGeometry() {
		var geometry = new THREE.PlaneGeometry( 100, 50, 100, 60 );

		for( let i = 0 ; i < geometry.vertices.length ; i++ ) {
			let vertex = geometry.vertices[i];

			vertex.x += Math.random() * 1 - .5;
			vertex.y += Math.random() * 1 - .5;
			vertex.z += Math.random() * 1.5;
		}

	    geometry.computeVertexNormals();

		for( let i = 0 ; i < geometry.faces.length ; i++ ) {
			let face = geometry.faces[i];

			let moy = ( face.vertexNormals[0].x + face.vertexNormals[0].y + face.vertexNormals[0].z ) / 3;
			moy -= .2;

			face.color.setRGB( moy, moy, 1 );
		}

		return geometry;
	}
}