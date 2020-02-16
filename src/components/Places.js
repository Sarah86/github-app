import React, { Component, useEffect, useState } from "react";

const GoogleAPIkeyPlaces = "AIzaSyBfa5P5ltA2gTflXsi8pb2w86ipzJZf-70"


const PlacesApi = () => {
  
 
  const [people, setPeople] = useState([])

  
  useEffect(() => {
    fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBfa5P5ltA2gTflXsi8pb2w86ipzJZf-70", {
        "method": "POST",
        "headers": {
            'Access-Control-Allow-Origin': ' * '
        },
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
    
   },[setPeople])

   return (
      <div className="App">
        <div className="container2">
          <div className="container1">

            {/* {people.map(person => (
              <div>{person.name.first}</div>
            ))} */}

          </div>
        </div>
      </div>
    );
  }

export default PlacesApi;