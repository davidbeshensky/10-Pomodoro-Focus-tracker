import React from 'react'
import { useState } from 'react';
import Clock from './components/Clock';


function App() {
  
  const minutesArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
  const [index, setIndex] = useState(0);

  return (
    <div className="container">
      <div className="buttonContainer">
        <Clock setIndex={setIndex} index={index} minutesArray={minutesArray} />
      </div>
    </div>
  );
}

//props reference is pointer in memory to a function or complex object

export default App;
