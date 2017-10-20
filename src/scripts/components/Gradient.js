import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';

module.exports = class Gradient extends Component {
	onInit() {
		this.uniforms = {
			uResolution:    { type: 'v2', 	value: new THREE.Vector2( 0, 0 ) },
			uTime:    		{ type: 'f', 	value: 0 }
		};

		this.geometry = new THREE.PlaneGeometry( 100, 50, 1 );
		this.material = new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			transparent: false,
			vertexShader: require('../shaders/base.vertex.glsl'),
			fragmentShader: require('../shaders/gradient.fragment.glsl')
		} );

		this.mesh    = new THREE.Mesh( this.geometry, this.material );
	}

	onReady() {
		this.onResize();
	}

	onResize() {
		this.uniforms.uResolution.value = new THREE.Vector2( device.width, device.height );
	}

	onUpdate( delta ) {
		this.material.uniforms.uTime.value += delta * .001;
	}
}