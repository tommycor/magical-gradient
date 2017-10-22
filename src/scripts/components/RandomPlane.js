import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';

module.exports = class RandomPlane extends Component {
	onInit() {
		this.uniforms = {
			uResolution:    { type: 'v2', 	value: new THREE.Vector2( 0, 0 ) },
			uTime:    		{ type: 'f', 	value: 0 }
		};

		this.geometry 	= this.createGeometry( 100, 1500, 100, 50 );
		this.attributes = this.createAttributes();
		this.material 	= new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			attributes: this.attributes,
			transparent: true,
			vertexShader: require('../shaders/random.vertex.glsl'),
			fragmentShader: require('../shaders/random.fragment.glsl'),
			vertexColors: THREE.FaceColors,
			transparent: true
		} );

		this.mesh = new THREE.Mesh( this.geometry, this.material );
	}

	createGeometry() {
		var geometry = new THREE.PlaneGeometry( 100, 100, 50, 50 );

		for( let i = 0 ; i < geometry.vertices.length ; i++ ) {
			let vertex = geometry.vertices[i];

			vertex.x += Math.random() * 1.5;
			vertex.y += Math.random() * 2;
			vertex.z += Math.random() * 1.5;
		}

	    geometry.computeVertexNormals();

		for( let i = 0 ; i < geometry.faces.length ; i++ ) {
			let face = geometry.faces[i];

			face.color.setRGB( face.vertexNormals[0].x, face.vertexNormals[0].y, face.vertexNormals[0].z );
		}

		return geometry;
	}

	createAttributes() {
		let attributes = new Array();

		for( let i = 0 ; i < this.geometry.vertices.length ; i++ ) {
			attributes.push( Math.random() < .5 ? 0 : 1 );
		}

		return {
			aVisible:    	{ type: 'f', 	value: new Array() }
		};
	}
}