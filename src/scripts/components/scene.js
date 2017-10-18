import * as THREE 			from "three";

import Component 			from '../colorz/Component';
import device 				from '../colorz/utils/device';
import getAbsoluteOffset 	from '../colorz/utils/getAbsoluteOffset';

import getIntersectionMouse from '../utils/getIntersectionMouse';

import Gradient 			from'./Gradient';
import RandomPlane 			from'./RandomPlane';

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

		this.gradient = new Gradient();
		this.scene.add( this.gradient.mesh );

		this.randomPlane = new RandomPlane();
		this.scene.add( this.randomPlane.mesh );

		this.axisHelper =  new THREE.AxisHelper( 5 );
		this.scene.add( this.axisHelper );

		this.ambient = new THREE.AmbientLight( 0xffffff );
		this.scene.add( this.ambient );

		this.el.addEventListener( device.pointermove, this.onPointermove );
		this.el.appendChild( this.renderer.domElement );

		this.onResize();
	}

	onResize() {
		this.width 		= device.width;
		this.height 	= device.height;
		this.offset 	= getAbsoluteOffset( this.el );

		// https://stackoverflow.com/questions/14614252/how-to-fit-camera-to-object
		let fov = 2 * Math.atan( this.height / ( 2 * 100 ) ) * ( 180 / Math.PI );

		this.renderer.setSize(this.width, this.height);
		this.ratio = this.width / this.height;

		this.camera.aspect = this.ratio;
		this.camera.updateProjectionMatrix();
	}

	onPointermove( event ) {
		this.mousePos.x 		= event.clientX;
		this.mousePos.y 		= event.clientY - ( this.offset.top - device.scroll.top );

		let intersection = getIntersectionMouse( this.mousePos.x, this.mousePos.y, this.randomPlane.mesh, this.camera );

		console.log( intersection );
	}

	onUpdate( delta ) {
		this.renderer.render(this.scene, this.camera);
	}
}