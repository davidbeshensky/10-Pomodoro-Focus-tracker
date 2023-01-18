/*This code allows a user to start a 25 minute timer that counts down by seconds, 
and then alerts them when the timer is complete. The code uses the useEffect hook 
to set an interval to count down the timer. The timer is set to 25 minutes (25 * 60 seconds) 
in the useState hook. The start function is called when the start button is clicked. 
The start function sets a timer variable to setInterval, which sets an interval to count down the timer by 1 second. 
The timer variable is then set by calling the setTimer function. The useEffect hook is used to clear the interval when the timer reaches zero.
The return function in the useEffect hook is used to clear the interval when the component is unmounted.*/

import { useEffect, useState } from "react";

const PomoTimer = ({ index, minutesArray }) => {

  const minutes = minutesArray[index];
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [timer, setTimer] = useState();
  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000)
    setTimer(timer);
  };
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes])

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

const minutesLeft = Math.floor(secondsLeft / 60);
const remainingSeconds = secondsLeft % 60;
const formattedTime = `${minutesLeft.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
console.log(formattedTime);

  return (
    <div className='pomoTimer'>
      <h1>{formattedTime}</h1>
      <button className="startButton" onClick={start}>start</button>
    </div>
  );
};

export default PomoTimer;
