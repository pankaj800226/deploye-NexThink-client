import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimerChallanger = () => {
  const [routineTitle, setRoutineTitle] = useState<string>(""); 
  const [timer, setTimer] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    if (min <= 0) return;
    const seconds = min * 60;
    setTimer(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
  };

  const startPomodoro = () => {
    const seconds = 25 * 60;
    setRoutineTitle(prev => prev || "Focus Session");
    setMin(25);
    setTimer(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          audioRef.current?.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = () => {
    const m = String(Math.floor(timer / 60)).padStart(2, "0");
    const s = String(timer % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
    setMin(0);
    setTotalTime(0);
    setRoutineTitle("");
  };

  const progress = totalTime > 0 ? ((totalTime - timer) / totalTime) * 100 : 0;

  return (
    <div className="timer-app">
      <div className="routine-header">
        <span>{isRunning ? "🚀 SESSION ACTIVE" : "📅 PLAN YOUR ROUTINE"}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isRunning && timer === 0 ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <input
              type="text"
              placeholder="What are you studying?"
              value={routineTitle}
              onChange={(e) => setRoutineTitle(e.target.value)}
              className="routine-input"
            />
            <input
              type="number"
              placeholder="Enter minutes"
              value={min || ""}
              onChange={(e) => setMin(Number(e.target.value))}
              className="time-input"
            />
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="active-display-container"
          >
            <h3 className="active-routine-title">
              {routineTitle || "Learning Session"}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="time-display">{formatTime()}</div>

      <div className="progress-wrapper">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="btn-group">
        {!isRunning ? (
          <button className="start-btn" onClick={handleStart}>
            Start Routine
          </button>
        ) : (
          <button className="pause-btn" onClick={() => setIsRunning(false)}>
            Pause
          </button>
        )}
        <button className="reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <button className="pomo-btn" onClick={startPomodoro}>
        🍅 Quick Pomodoro
      </button>

       <button className="pomo-btn">
        🍅 Save Info
      </button>

      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/beep-07.mp3"
      />
    </div>
  );
};

export default TimerChallanger;