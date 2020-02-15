import React, { useEffect, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";


const GoogleKey =  process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY;

const Map = (props) => {

  // const [latitude, setLatitude] = useState(44.31771);
  // const [longitude, setLongitude] = useState(9.32241);
  // // const [position, setPosition] = useState(0);
  // const [content, setContent] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          };
          setCenter(pos);
        });        
    } else {
      alert('Sorry, I do not know where you are ;(')
    }
  }, [setCenter]);


  return(
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