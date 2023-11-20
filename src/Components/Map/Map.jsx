import React, { useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import './map.css';

const Map = ({center, zoom}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB57m2c77sxdq2PJyBejP6qmEEq2ULSYAE"
    });

  return (
    <div className="map">
      {isLoaded && (<GoogleMap zoom={zoom} center={center} mapContainerClassName='map'>
            <MarkerF position={center}/>
        </GoogleMap>)}
    </div>
  )
}

export default Map
