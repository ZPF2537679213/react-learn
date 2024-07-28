import React from "react";
import ClockTimer from "./ClockTimer";
import { TimerProps } from "../typing/typing";

const Timer: React.FC<TimerProps> = props => {
  return (
    <>
      <ClockTimer {...props} />
    </>
  );
};

export default Timer;
