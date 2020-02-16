import React, { Component, useEffect, useState } from "react";

const ApiTest = () => {
  
 
  const [people, setPeople] = useState([])

  
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
    .then(results => results.json())
    .then(data => { 
        setPeople(data.results);
        console.log(data)
    });
    
   },[setPeople])

   return (
      <div className="App">
        <div className="container2">
          <div className="container1">

            {people.map(person => (
              <div>{person.name.first}</div>
            ))}

          </div>
        </div>
      </div>
    );
  }

export default ApiTest;