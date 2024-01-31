import React, { useEffect, useState } from "react";
import { create } from "zustand";
import { TimerIcon } from "lucide-react";

// type TimerState = {
//   time: number;
//   setTime: (newTime: number) => void;
// };
//
// const useTimerStore = create<TimerState>((set) => ({
//   time: 0,
//   setTime: (newTime) =>
//     set(() => ({
//       time: newTime,
//     })),
// }));

const Timer = ({ startTime }: { startTime: number }) => {
  const initialTime = Math.round((Date.now() - startTime) / 1000);
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const initialTime = Math.round((Date.now() - startTime) / 1000);
    setTime(() => initialTime);
  }, [startTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-1">
      <p className="pt-0.5">{time}</p>
      <TimerIcon />
    </div>
  );
};

export default Timer;
