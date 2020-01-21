import React, {PureComponent} from 'react';
import * as THREE from "three";
import classes from './InteractiveModelVisualizer.module.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import BlockOutlineSecondaryButton from '../../components/Buttons/BlockOutlineSecondaryButton';
let STLLoader = require('three-stl-loader')(THREE)


class InteractiveModelVisualizer extends PureComponent {

    state = {
        percentLoaded: 0,
    }

    constructor(props) {
        super(props);
        this.renderer = null;
    }

    handleProgressEvent = (progressEvent) => {
        let percentLoaded = ( progressEvent.loaded * 100 ) / progressEvent.total;
        this.setState({ percentLoaded: percentLoaded });
    }

    getImageData = () => {
        const STRMIME = "image/png";
        let imgData = this.renderer.domElement.toDataURL(STRMIME);
        this.props.saveImageHandler(imgData);
    }

    componentDidMount() {
        let loader = new STLLoader();
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( 'white' );
        let camera = new THREE.PerspectiveCamera( 75, this.mount.clientWidth/this.mount.clientHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        new OrbitControls( camera, this.renderer.domElement );
        this.renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
        this.mount.appendChild( this.renderer.domElement );
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
        let animate = () => {
            requestAnimationFrame( animate );
            this.renderer.render( scene, camera );
        };
        animate();
    }

    render() {
        return (
        <div>
          <div
            className={classes.InteractiveModelVisualizer}
            style={
            {
                'maxHeight': (this.props.maxHeight) ? this.props.maxHeight : '400px',
                'minHeight': (this.props.minHeight) ? this.props.minHeight : '400px',
                'maxWidth': (this.props.maxWidth) ? this.props.maxWidth : '400px',
                'minWidth': (this.props.minWidth) ? this.props.minWidth : '400px',
            }
          } ref={ref => (this.mount = ref)} />
            <div className={ `progress ${classes.progressBar}` }
            style={
            {
                'visibility': (this.state.percentLoaded === 100) ? 'hidden' : 'visible',
                'maxWidth': (this.props.maxWidth) ? this.props.maxWidth : '400px',
            }
          }
            >
              <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={ {width: `${this.state.percentLoaded}%`} }
                ></div>
            </div>
            { this.props.saveImageHandler ? <BlockOutlineSecondaryButton handler={() => this.getImageData()} text='Guardar imagen' /> : ''}
        </div>
        )
    }
}

export default InteractiveModelVisualizer;
