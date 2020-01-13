import React, {PureComponent} from 'react';
import * as THREE from "three";
import classes from './ModelViewer.module.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let STLLoader = require('three-stl-loader')(THREE)


class ModelViewer extends PureComponent {

    otraFuncion = () => {

    let loader = new STLLoader();
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 'white' );
    var camera = new THREE.PerspectiveCamera( 75, this.mount.clientWidth/this.mount.clientHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    let controls = new OrbitControls( camera, renderer.domElement );
    renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    camera.position.z = 100;
    loader.load(
        'https://3d-vortex-models.s3.us-east-2.amazonaws.com/object.stl',
        (geometry) => {
          geometry.center();
          let material = new THREE.MeshNormalMaterial();
          let mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        },
        (progress) => {console.log(progress)},
        (error) => {console.log(error)}
    )
    let light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };
    animate();

    }

  componentDidMount() {
    this.otraFuncion();
  }
  render() {
    return (
      <div className={ classes.ModelViewer } ref={ref => (this.mount = ref)} />
    )
  }
}

export default ModelViewer;
