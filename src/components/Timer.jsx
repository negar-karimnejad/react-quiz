/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <button className="border rounded-full w-20 h-10 p-1">
      {min < 10 && "0"}
      {min}:{seconds < 10 && "0"}
      {seconds}
    </button>
  );
}

export default Timer;
