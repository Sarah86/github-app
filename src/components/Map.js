import React, { useEffect, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const GoogleKey =  process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY;

const Map = (props) => {

  const [latitude, setLatitude] = useState(44.31771);
  const [longitude, setLongitude] = useState(9.32241);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    
  const success = (pos) => {
    const crd = pos.coords;

    console.log('Sua posição atual é:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('Mais ou menos ' + crd.accuracy + ' metros.');

    const latitudeFromSuccess  = crd.latitude;
    const longitudeFromSuccess  = crd.longitude;

    setTimeout(() => {
      setLatitude(latitudeFromSuccess);
      setLongitude(longitudeFromSuccess);    
    }, 3000);

  }

  const error = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  } 

  navigator.geolocation.getCurrentPosition(success, error, options);
  
  });

  return(
      <GoogleMap 
      defaultZoom={8}
      defaultCenter={{
        lat: latitude,
        lng: longitude,
      }}
    >
        {props.isMarkerShown && <Marker position={{ 
         lat: latitude,
         lng: longitude
        }}   
    />}
    </GoogleMap>
  )
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const HudlApp = () => {

  return(
    <div style={{
      width: "100%",
      height: "100%"
    }}>
      <WrappedMap
        isMarkerShown
        googleMapURL= "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBfa5P5ltA2gTflXsi8pb2w86ipzJZf-70"
        loadingElement= <div style={{ height: `100%` }} />
        containerElement= <div style={{ height: `400px` }} />
        mapElement= <div style={{ height: `100%` }} />
      />
    </div>
  )
};

export default HudlApp;