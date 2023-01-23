/*This code allows a user to start a 25 minute timer that counts down by seconds, 
and then alerts them when the timer is complete. The code uses the useEffect hook 
to set an interval to count down the timer. The timer is set to 25 minutes (25 * 60 seconds) 
in the useState hook. The start function is called when the start button is clicked. 
The start function sets a timer variable to setInterval, which sets an interval to count down the timer by 1 second. 
The timer variable is then set by calling the setTimer function. The useEffect hook is used to clear the interval when the timer reaches zero.
The return function in the useEffect hook is used to clear the interval when the component is unmounted.*/
import React, { useEffect, useState } from "react";

//after Handle Complete and Handle Incomplete I want to fade out the clock and start buttons and fade in a 0-10 slider and a submit button with
//the prompt "How productive was this session?" and the submit button should say "Submit" and the slider should be set to 5 by default. I would like the slider to
//use decimals up to two places.
//I am thinking that I should move this inside of the Pomotimer component 


const HandleComplete = (minutes) => {
  const newPomodoro = {
    date: new Date(),
    duration: minutes,
    completed: true,
    colortheme: "darkmode",
  };
  console.log(newPomodoro);
};

const HandleIncomplete = (secondsLeft, minutes) => {
  const minutesCompleted = Math.floor((minutes * 60 - secondsLeft) / 60);
  const secondsOfMinuteCompleted = (minutes * 60 - secondsLeft) % 60;
  const newPomodoro = {
    date: new Date(),
    duration: `${minutesCompleted
      .toString()
      .padStart(2, "0")}:${secondsOfMinuteCompleted
      .toString()
      .padStart(2, "0")}`,
    completed: false,
    colortheme: "darkmode",
  };
  console.log(newPomodoro);
};

const PomoTimer = ({ secondsLeft, setSecondsLeft, index, minutesArray }) => {

  const [sliderValue, setSliderValue] = useState(5);
  const minutes = minutesArray[index];
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [setSecondsLeft, minutes]);

  useEffect(() => {
    if (secondsLeft === 0) {
      HandleComplete(minutes);
    } else if (
      secondsLeft !== 0 &&
      isRunning === false &&
      secondsLeft !== minutes * 60 &&
      timer
    ) {
      HandleIncomplete(secondsLeft, minutes);
      setSecondsLeft(60 * minutes);
    }
  }, [setSecondsLeft, secondsLeft, isRunning, minutes, timer]);

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
      setIsRunning(false);
      setSecondsLeft((secondsLeft) => secondsLeft + 60 * minutes);
    }
  }, [minutes, setSecondsLeft, secondsLeft, timer]);
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const minutesLeft = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formattedTime = `${minutesLeft
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  return (
    <div className="pomoTimer">
      <h1>{formattedTime}</h1>
      <input type='range' min={0} max={10} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} />
      <p>Slider value: {sliderValue}</p>
      <button
        className="startButton"
        onClick={() => {
          if (isRunning) {
            clearInterval(timer);
            setIsRunning(false);
          } else {
            setIsRunning(true);
            start();
          }
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => {
        console.log("Slider value submitted:", sliderValue)
      }}>
        Submit
      </button>
    </div>
  );
};

export default PomoTimer;
