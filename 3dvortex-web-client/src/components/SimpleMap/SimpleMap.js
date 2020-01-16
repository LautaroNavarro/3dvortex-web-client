import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker';

class SimpleMap extends PureComponent {
  static defaultProps = {
    center: {
      lat: -32.8788975,
      lng: -68.85360159999999
    },
    zoom: 11,
    name: 'Home'
  };

  render() {
    return (
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD26DcdKTKGn4-JggBmU-ciinAVvguEL-o' }}
          defaultCenter={{ lat: -32.8788975, lng: -68.85360159999999 }}
          center={this.props.center}
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
