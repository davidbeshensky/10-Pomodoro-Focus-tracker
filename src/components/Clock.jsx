// this functional component will allow the user to increment the Pomodoro timer by 5 minutes either forward or backward
// the functional component contains a button to increment the timer by 5 minutes, a button to decrement the timer by 5 minutes,
// and a p tag to display the current timer value
// the functional component contains a useState hook to keep track of the index of the array containing the timer values
// the functional component contains two functions, handleIncrement and handleDecrement, to handle the event of a user
//clicking the increment and decrement buttons, respectively
// this functional component will allow the user to increment the Pomodoro timer by 5 minutes either forward or backward
import React, { useState } from "react";
import PomoTimer from "./PomoTimer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//timer or clock
const Clock = ({ index, minutesArray, setIndex }) => {
  const minutes = minutesArray[index];
  const [pomodoros, setPomodoros] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const handleIncrement = () => {
    if (index === minutesArray.length - 1) {
      return;
    }
    setIndex(index + 1);
  };

  const handleDecrement = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  };

  return (
    <>
      <button className="handleDecrement" onClick={handleDecrement}><ArrowBackIosNewIcon />
      </button>
      <PomoTimer
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        pomodoros={pomodoros}
        setPomodoros={setPomodoros}
        index={index}
        minutesArray={minutesArray}
      />
      <button className="handleIncrement" onClick={handleIncrement}>
        <ArrowForwardIosIcon />
      </button>
    </>
  );
};

export default Clock;
