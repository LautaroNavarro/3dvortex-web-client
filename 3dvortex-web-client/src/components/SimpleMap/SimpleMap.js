import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
    name: 'Home'
  };

  render() {
    return (
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD26DcdKTKGn4-JggBmU-ciinAVvguEL-o' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={ this.props.center.lat }
            lng={ this.props.center.lng }
            text={ this.props.name }
            color='red'
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
