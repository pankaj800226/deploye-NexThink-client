import { useEffect, useRef, useState } from "react";

const TimerChallanger = () => {
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
    setMin(25);
    setTimer(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
    
  };

  // 🔥 MAIN TIMER EFFECT (NO BUG, NO WARNING)
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (audioRef.current) {
            audioRef.current.play();
          }
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
  };

  const progress =
    totalTime > 0 ? ((totalTime - timer) / totalTime) * 100 : 0;

  return (
    <div className="timer-app">
      <h2>⏱ Timer Challenge</h2>

      {!isRunning && timer === 0 && (
        <input
          type="number"
          placeholder="Enter minutes"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="time-input"
        />
      )}

      <div className="time-display">{formatTime()}</div>

      {/* Progress Bar */}
      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="btn-group">
        {!isRunning ? (
          <button className="start-btn" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button
            className="pause-btn"
            onClick={() => setIsRunning(false)}
          >
            Pause
          </button>
        )}

        <button className="reset-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <button className="pomo-btn" onClick={startPomodoro}>
        🍅 Start Pomodoro
      </button>

      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/beep-07.mp3"
      />
    </div>
  );
};

export default TimerChallanger;
