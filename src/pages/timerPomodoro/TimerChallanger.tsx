import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

import axios from "axios";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import TimerList from "./TimerList";
import sound from "../../assets/alarm.mp3"; // ✅ FIXED IMPORT

export interface ITimer {
  _id: string;
  routineTitle: string;
  min: number;
  spentMin: number;
  spentSec: number;
  secondsSpent: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const TimerChallanger: React.FC = () => {
  const [routineTitle, setRoutineTitle] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [timers, setTimers] = useState<any[]>([]);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const token = localStorage.getItem("TOKEN");

  const fetchTimers = async () => {
    try {
      const res = await axios.get(`${api}/api/timer/getTimers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) setTimers(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchTimers(); }, []);

  // ⏱ TIMER LOGIC
  useEffect(() => {
    let interval: any;

    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);

      // 🔊 RESET + PLAY SOUND
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      toast.success("Focus session complete!");
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // 📊 CHART
  const chartData = useMemo(() => {
    const lastData = timers.slice(-7);
    return {
      labels: lastData.map((t) => t.routineTitle.substring(0, 8)),
      datasets: [{
        fill: true,
        data: lastData.map((t) => t.spentMin),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
      }],
    };
  }, [timers]);

  // ▶ START
  const handleStart = () => {
    if (min <= 0) return toast.error("Please set minutes");

    // 🔊 STOP OLD SOUND
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setTimer(min * 60);
    setTotalTime(min * 60);
    setIsRunning(true);
  };

  // 💾 SAVE
  const handleSaveInfo = async () => {
    const secondsSpent = totalTime - timer;

    if (!routineTitle.trim() || secondsSpent < 3) {
      return toast.error("Invalid session");
    }

    setBtnLoader(true);
    try {
      await axios.post(`${api}/api/timer/saveTimer`,
        {
          routineTitle,
          min,
          spentMin: Math.floor(secondsSpent / 60),
          spentSec: secondsSpent % 60,
          secondsSpent
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔊 STOP + RESET SOUND AFTER SAVE
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      toast.success("Challenge Saved!");
      fetchTimers();

      // 🔄 RESET STATE
      setTimer(0);
      setRoutineTitle("");
      setMin(0);
      setTotalTime(0);
      setIsRunning(false);

    } catch {
      toast.error("Error saving");
    } finally {
      setBtnLoader(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/timer/deleteTimer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Session log deleted");
      fetchTimers();
    } catch (err) {
      console.log(err);
      toast.error("Error deleting log");
    }
  };

  return (
    <div className="saas-container">
      <header className="page-header">
        <div>
          <h1>Challenger Board</h1>
          <p>Track your deep work sessions</p>
        </div>
        <div className="total-badge">{timers.length} Sessions</div>
      </header>

      <div className="grid-layout">
        <section className="left-panel">
          <div className="card chart-card">
            <h3>Productivity Analytics</h3>
            <div className="chart-box">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </div>
          <TimerList timers={timers} handleDelete={handleDelete} />
        </section>

        <aside className="right-panel">
          <div className="card timer-card sticky">

            <div className={`status-dot ${isRunning ? 'pulse' : ''}`}>
              {isRunning ? 'FOCUS ACTIVE' : 'READY TO CHALLENGE'}
            </div>

            <AnimatePresence mode="wait">
              {!isRunning && timer === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="form-inputs"
                >
                  <input
                    type="text"
                    placeholder="Task Name"
                    value={routineTitle}
                    onChange={(e) => setRoutineTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Minutes"
                    value={min}
                    onChange={(e) => setMin(Number(e.target.value))}
                  />
                </motion.div>
              ) : (
                <h2 className="current-task">
                  {routineTitle || "Deep Work"}
                </h2>
              )}
            </AnimatePresence>

            <div className="timer-val">
              {String(Math.floor(timer / 60)).padStart(2, '0')}:
              {String(timer % 60).padStart(2, '0')}
            </div>

            <div className="bar-track">
              <motion.div
                className="bar-fill"
                animate={{
                  width: `${totalTime > 0 ? ((totalTime - timer) / totalTime) * 100 : 0}%`
                }}
              />
            </div>

            <div className="btn-group">
              {!isRunning ? (
                <button className="btn-p btn-full" onClick={handleStart}>
                  Start Challenge
                </button>
              ) : (
                <button className="btn-s" onClick={() => setIsRunning(false)}>
                  Pause
                </button>
              )}
              <button className="btn-o" onClick={handleSaveInfo}>
                {btnLoader ? "Saving..." : "Save Session"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 🔊 AUDIO */}
      <audio ref={audioRef} src={sound} preload="auto" />
    </div>
  );
};

export default TimerChallanger;