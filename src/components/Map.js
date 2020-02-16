import React, { useEffect, useState, useRef } from "react";

import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, PlacesService, InfoWindow } from "react-google-maps";

const google = window.google;


// const GoogleAPIkey =  process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY;
const GoogleAPIkeyMap = "AIzaSyBfa5P5ltA2gTflXsi8pb2w86ipzJZf-70";

const Map = (props) => {

  const [center, setCenter] = useState({
    lat: 41.9,
    lng: -87.624
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCenter(pos);
        console.log(pos);
      });
    } else {
      alert('Sorry, I do not know where you are ;(')
    }

  }, [setCenter]);


  return (
    <GoogleMap
      defaultZoom={15}
      center={center}
    >
      {props.isMarkerShown && <Marker position={center}
      />}
    </GoogleMap>

  )
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const HudlApp = () => {

  return (
    <div style={{
      width: "100%",
      height: "100%"
    }}>
      <WrappedMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${GoogleAPIkeyMap}`}
        loadingElement= <div style={{ height: `100%` }} />
        containerElement= <div style={{ height: `400px` }} />
      mapElement= <div style={{ height: `100%` }} />
      />

    </div>
  )
};

export default HudlApp;