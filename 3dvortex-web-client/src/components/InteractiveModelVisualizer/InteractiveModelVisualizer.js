import React, {PureComponent} from 'react';
import * as THREE from "three";
import classes from './InteractiveModelVisualizer.module.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let STLLoader = require('three-stl-loader')(THREE)


class InteractiveModelVisualizer extends PureComponent {

    state = {
        percentLoaded: 0,
    }

    handleProgressEvent = (progressEvent) => {
        let percentLoaded = ( progressEvent.loaded * 100 ) / progressEvent.total;
        this.setState({ percentLoaded: percentLoaded });
    }

    componentDidMount() {
        let loader = new STLLoader();
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( 'white' );
        let camera = new THREE.PerspectiveCamera( 75, this.mount.clientWidth/this.mount.clientHeight, 0.1, 1000 );
        let renderer = new THREE.WebGLRenderer();
        new OrbitControls( camera, renderer.domElement );
        renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
        this.mount.appendChild( renderer.domElement );
        camera.position.z = 100;
        loader.load(
            this.props.url,
            (geometry) => {
                geometry.center();
                let material = new THREE.MeshNormalMaterial();
                let mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
            },
                this.handleProgressEvent,
                (error) => {console.log(error)}
            )
            let light = new THREE.AmbientLight( 0x404040 );
            scene.add( light );
            let animate = function () {
                requestAnimationFrame( animate );
                renderer.render( scene, camera );
        };
        animate();
    }

    render() {
        return (
        <div>
          <div className={ classes.InteractiveModelVisualizer } ref={ref => (this.mount = ref)} />
            <div className={ `progress ${classes.progressBar}` } style={
                {visibility: (this.state.percentLoaded === 100) ? 'hidden' : 'visible'}
            }>
              <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={ {width: `${this.state.percentLoaded}%`} }
                ></div>
            </div>
        </div>
        )
    }
}

export default InteractiveModelVisualizer;
