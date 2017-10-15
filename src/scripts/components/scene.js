import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';
import getAbsoluteOffset 	from '../colorz/utils/getAbsoluteOffset';

module.exports = class Scene extends Component {
	onInit( el ) {
		this.onPointermove 			= this.onPointermove.bind( this );

		this.el 		= el;
		this.mousePos 	= new THREE.Vector2( 0, 0 );
	}

	onReady() {
		this.canvas  = document.createElement( 'canvas' );
		this.context = this.canvas.getContext('2d');

		this.scene 	   			= new THREE.Scene();
		this.camera 		   	= new THREE.PerspectiveCamera(45, this.ratio, 10, 300);
		this.camera.position.x 	= 0;
		this.camera.position.y 	= 0;
		this.camera.position.z 	= 100;

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0x000000);
		this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);

		this.uniforms = {
			uResolution:    { type: 'v2', value: new THREE.Vector2( this.width, this.height ) }
		};

		this.geometry = new THREE.PlaneGeometry( 150, 150, 1 );
		this.material = new THREE.ShaderMaterial( {
			uniforms: this.uniforms,
			transparent: false,
			vertexShader: require('../shaders/base.vertex.glsl'),
			fragmentShader: require('../shaders/base.fragment.glsl')
		} );

		this.material = new THREE.MeshBasicMaterial({
			color: 'red'
		})

		this.plane    = new THREE.Mesh( this.geometry, this.material );
		this.scene.add( this.plane );

		this.axisHelper =  new THREE.AxisHelper( 5 );
		this.scene.add( this.axisHelper );

		this.ambient = new THREE.AmbientLight( 0xffffff );
		this.scene.add( this.ambient );

		this.el.addEventListener( device.pointermove, this.onPointermove );
		this.el.appendChild( this.renderer.domElement );

		this.onResize();
	}

	onResize() {
		this.width 		= this.el.offsetWidth;
		this.height 	= this.el.offsetHeight;
		this.offset 	= getAbsoluteOffset( this.el );

		// https://stackoverflow.com/questions/14614252/how-to-fit-camera-to-object
		// let fov = 2 * Math.atan( this.planeHeight / ( 2 * 100 ) ) * ( 180 / Math.PI );
		this.renderer.setSize(this.width, this.height);
		this.ratio = this.width / this.height;

		this.camera.aspect = this.ratio;
		this.camera.updateProjectionMatrix();

		this.uniforms.uResolution.value = new THREE.Vector2( this.width, this.height );
	}

	onPointermove( event ) {
		this.mousePos.x 		= event.clientX;
		this.mousePos.y 		= event.clientY - ( this.offset.top - device.scroll.top );
	}

	onUpdate() {
		this.renderer.render(this.scene, this.camera);
	}
}