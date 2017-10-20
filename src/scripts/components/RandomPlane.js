import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';

module.exports = class RandomPlane extends Component {
	onInit() {
		this.uniforms = {
			uResolution:    { type: 'v2', 	value: new THREE.Vector2( 0, 0 ) },
			uTime:    		{ type: 'f', 	value: 0 }
		};

		this.geometry 	= this.createGeometry();
		// this.attributes = this.createAttributes();
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

	onReady() {
	}

	onResize() {
		// this.uniforms.uResolution.value = new THREE.Vector2( device.width, device.height );
	}

	onUpdate( delta ) {
		// this.material.uniforms.uTime.value += delta * .001;
	}

	createGeometry() {
		// var geometry = new THREE.PlaneGeometry( 100, 50, 50, 50 );
		var geometry = new THREE.PlaneBufferGeometry( 100, 50, 50, 50 );

		for( let i = 0 ; i < geometry.attributes.position.count ; i+=3 ) {
			geometry.attributes.position[i]  += Math.random() * 1.5 - .75;
			geometry.attributes.position[i+1] += Math.random() * 2 - 1;
			geometry.attributes.position[i+2] += Math.random() * 1.5;
		}

		geometry.attributes.position.needsUpdate = true;
		geometry.computeVertexNormals();
		console.log('geometry', geometry);

		// for( let i = 0 ; i < geometry.faces.length ; i++ ) {
		// 	let face = geometry.faces[i];

		// 	face.color.setRGB( face.vertexNormals[0].x, face.vertexNormals[0].y, face.vertexNormals[0].z );
		// }

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