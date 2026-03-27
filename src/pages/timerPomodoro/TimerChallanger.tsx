import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Filler
} from "chart.js";
import axios from "axios";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import sound from "../../assets/alarm.mp3";
import { Play, Pause, RotateCcw, Save, Trash2, Target, Zap, TrendingUp, ListChecks } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const PRESETS = [
  { label: "30m", val: 30 },
  { label: "1h", val: 60 },
  { label: "2h", val: 120 },
  { label: "4h", val: 240 },
  { label: "6h", val: 360 },
  { label: "8h", val: 480 },
];

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #07090f;
  --s1:        #0e1118;
  --s2:        #141720;
  --s3:        #1b1f2e;
  --border:    #252a3a;
  --border2:   #2e3449;
  --accent:    #4fffb0;
  --accent2:   #00d4ff;
  --accentRgb: 79,255,176;
  --warn:      #ff6b6b;
  --text:      #e8ecf8;
  --sub:       #6b7494;
  --r:         14px;
  --rSm:       10px;
  --shadow:    0 4px 24px rgba(0,0,0,0.5);
}

.fc {
  font-family: 'Outfit', sans-serif;
  // background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── NAV ─────────────────────────────────── */
.fc-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 4vw, 32px);
  height: 60px;
  background: var(--s1);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.fc-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.5px;
}
.fc-logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #07090f;
  flex-shrink: 0;
}
.fc-badge {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  background: rgba(var(--accentRgb), 0.1);
  color: var(--accent);
  border: 1px solid rgba(var(--accentRgb), 0.25);
  padding: 4px 12px;
  border-radius: 99px;
}

/* ── PAGE GRID ───────────────────────────── */
.fc-page {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-areas:
    "chart  timer"
    "logs   timer";
  gap: 20px;
  padding: clamp(16px, 3vw, 28px);
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  align-items: start;
}

/* ── CARD ────────────────────────────────── */
.fc-card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: clamp(16px, 2.5vw, 24px);
  box-shadow: var(--shadow);
}
.fc-card-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--sub);
  margin-bottom: 18px;
}
.fc-card-hd svg { color: var(--accent); flex-shrink: 0; }

/* ── TIMER CARD ──────────────────────────── */
.fc-timer-card {
  grid-area: timer;
  position: sticky;
  top: 80px;
}

/* inputs */
.fc-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--sub);
  margin-bottom: 6px;
}
.fc-inp {
  width: 100%;
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 14px;
}
.fc-inp:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accentRgb), 0.12);
}
.fc-inp:disabled { opacity: 0.4; cursor: not-allowed; }
.fc-inp::placeholder { color: var(--sub); }
input[type=number].fc-inp::-webkit-inner-spin-button { -webkit-appearance: none; }

/* presets */
.fc-presets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 20px;
}
.fc-pset {
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  color: var(--sub);
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  padding: 8px 4px;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
  font-weight: 700;
}
.fc-pset:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(var(--accentRgb), 0.08);
}
.fc-pset:disabled { opacity: 0.35; cursor: not-allowed; }

.fc-divider { height: 1px; background: var(--border); margin: 16px 0; }

/* ring */
.fc-ring-wrap {
  display: flex;
  justify-content: center;
  padding: 8px 0 20px;
}
.fc-ring {
  position: relative;
  width: 175px;
  height: 175px;
}
.fc-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.fc-ring-bg   { fill: none; stroke: var(--s3); stroke-width: 9; }
.fc-ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 9;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}
.fc-ring-fill.pulse { animation: glow 2s ease-in-out infinite; }
@keyframes glow {
  0%,100% { filter: drop-shadow(0 0 5px rgba(var(--accentRgb),.5)); }
  50%      { filter: drop-shadow(0 0 20px rgba(var(--accentRgb),.9)); }
}
.fc-ring-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
.fc-big-time {
  font-family: 'Space Mono', monospace;
  font-size: clamp(24px, 5vw, 34px);
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1;
}
.fc-status {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--sub);
}
.fc-status.active { color: var(--accent); }
.fc-status.paused { color: var(--warn); }

/* action buttons */
.fc-actions {
  display: grid;
  gap: 8px;
}
.fc-row2 { grid-template-columns: 1fr 1fr; }
.fc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: none;
  border-radius: var(--rSm);
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
}
.fc-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.fc-btn-start {
  background: linear-gradient(135deg, var(--accent) 0%, #00e896 100%);
  color: #07090f;
}
.fc-btn-start:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
.fc-btn-pause {
  background: rgba(255,107,107,0.1);
  color: var(--warn);
  border: 1px solid rgba(255,107,107,0.3);
}
.fc-btn-pause:hover { background: rgba(255,107,107,0.2); }
.fc-btn-reset {
  background: var(--s2);
  color: var(--sub);
  border: 1px solid var(--border);
}
.fc-btn-reset:hover { color: var(--text); border-color: var(--border2); }
.fc-btn-save {
  background: rgba(var(--accentRgb), 0.08);
  color: var(--accent);
  border: 1px solid rgba(var(--accentRgb), 0.25);
}
.fc-btn-save:hover:not(:disabled) { background: rgba(var(--accentRgb), 0.18); }

/* ── CHART ───────────────────────────────── */
.fc-chart-card { grid-area: chart; }
.fc-chart-wrap { height: 200px; }
.fc-chart-empty {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--sub);
  font-size: 13px;
}

/* ── LOGS ────────────────────────────────── */
.fc-logs-card { grid-area: logs; }
.fc-log-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 2px;
}
.fc-log-list::-webkit-scrollbar { width: 3px; }
.fc-log-list::-webkit-scrollbar-track { background: transparent; }
.fc-log-list::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
.fc-log-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  transition: border-color 0.15s;
}
.fc-log-item:hover { border-color: var(--border2); }
.fc-log-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: rgba(var(--accentRgb), 0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fc-log-info { flex: 1; min-width: 0; }
.fc-log-title {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fc-log-meta {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--sub);
  margin-top: 2px;
}
.fc-log-del {
  background: none;
  border: none;
  color: var(--sub);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
  flex-shrink: 0;
}
.fc-log-del:hover { color: var(--warn); background: rgba(255,107,107,0.1); }
.fc-logs-empty {
  text-align: center;
  color: var(--sub);
  font-size: 13px;
  padding: 36px 0;
}

/* ── RESPONSIVE ──────────────────────────── */
@media (max-width: 860px) {
  .fc-page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "timer"
      "chart"
      "logs";
  }
  .fc-timer-card { position: static; }
}

@media (max-width: 480px) {
  .fc-nav { padding: 0 14px; }
  .fc-logo span { display: none; }
  .fc-ring { width: 150px; height: 150px; }
  .fc-big-time { font-size: 26px; }
  .fc-presets { grid-template-columns: repeat(3, 1fr); }
}
`;

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
const TimerChallanger: React.FC = () => {
  const [routineTitle, setRoutineTitle] = useState("");
  const [customMin, setCustomMin] = useState<number | "">("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalInitialSeconds, setTotalInitialSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timers, setTimers] = useState<any[]>([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const token = localStorage.getItem("TOKEN");

  // fetch timer data
  const fetchTimers = async () => {
    try {
      const res = await axios.get(`${api}/api/timer/getTimers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTimers(); }, []);

  useEffect(() => {
    let id: any;
    if (isRunning && timeLeft > 0) {
      id = setInterval(() => setTimeLeft(p => p - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      audioRef.current?.play();
      toast.success("🎉 Focus session complete!");
    }
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  // start session
  const startSession = (mins: number) => {
    const secs = mins * 60;
    setCustomMin(mins);
    setTimeLeft(secs);
    setTotalInitialSeconds(secs);
    setIsRunning(true);
  };

  const handleStart = () => {
    if (timeLeft > 0) return setIsRunning(true);
    if (!customMin || Number(customMin) <= 0) return toast.error("Set minutes first");
    startSession(Number(customMin));
  };


  // handle delete timer data
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/timer/deleteTimer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTimers();
    } catch { toast.error("Delete failed"); }
  };

  // save timer
  const handleSave = async () => {
    const spent = totalInitialSeconds - timeLeft;
    if (!routineTitle.trim() || spent < 5) return toast.error("Session too short or missing title");
    setBtnLoader(true);
    try {
      await axios.post(`${api}/api/timer/saveTimer`, {
        routineTitle,
        min: Math.floor(totalInitialSeconds / 60),
        spentMin: Math.floor(spent / 60),
        spentSec: spent % 60,
        secondsSpent: spent,
      }, { headers: { Authorization: `Bearer ${token}` } });

      audioRef.current?.pause()
      toast.success("Saved to dashboard!");
      fetchTimers();
      resetAll();
    } catch { toast.error("Save error"); }
    finally { setBtnLoader(false); }
  };


  // reset all 
  const resetAll = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setTotalInitialSeconds(0);
    setCustomMin("");
    setRoutineTitle("");
  };

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h > 0 ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  /* SVG ring */
  const RADIUS = 80;
  const CIRC = 2 * Math.PI * RADIUS;
  const pct = totalInitialSeconds > 0 ? timeLeft / totalInitialSeconds : 0;
  const dashOff = CIRC * (1 - pct);

  /* chart */
  const chartData = {
    labels: timers.slice(-8).map(t => t.routineTitle.substring(0, 7)),
    datasets: [{
      data: timers.slice(-8).map(t => t.spentMin),
      borderColor: '#4fffb0',
      backgroundColor: 'rgba(79,255,176,0.07)',
      fill: true,
      tension: 0.45,
      pointRadius: 4,
      pointBackgroundColor: '#4fffb0',
      pointBorderColor: '#07090f',
      pointBorderWidth: 2,
    }],
  };
  const chartOpts: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: '#1b1f2e' }, ticks: { color: '#6b7494', font: { family: 'Space Mono', size: 10 } } },
      y: { grid: { color: '#1b1f2e' }, ticks: { color: '#6b7494', font: { family: 'Space Mono', size: 10 } } },
    },
  };

  const statusLabel = isRunning ? 'focusing' : timeLeft > 0 ? 'paused' : 'ready';
  const statusClass = isRunning ? 'active' : timeLeft > 0 ? 'paused' : '';

  return (
    <div className="fc">
      <style>{css}</style>

      {/* NAV */}
      <nav className="fc-nav">
        <div className="fc-logo">
          <div className="fc-logo-icon"><Zap size={16} /></div>
          <span>FocusBoard</span>
        </div>
        <div className="fc-badge">{timers.length} sessions</div>
      </nav>

      <div className="fc-page">

        {/* ── TIMER CONTROL ── */}
        <div className="fc-card fc-timer-card">
          <div className="fc-card-hd"><Zap size={13} /> Timer Control</div>

          <div className="fc-label">Session Goal</div>
          <input
            className="fc-inp"
            placeholder="e.g. Deep Work, Study..."
            value={routineTitle}
            onChange={e => setRoutineTitle(e.target.value)}
            disabled={isRunning}
          />

          <div className="fc-label">Duration (minutes)</div>
          <input
            className="fc-inp"
            type="number"
            placeholder="Enter custom minutes"
            value={customMin}
            onChange={e => setCustomMin(e.target.value === "" ? "" : Number(e.target.value))}
            disabled={isRunning}
          />

          <div className="fc-label">Quick Presets</div>
          <div className="fc-presets">
            {PRESETS.map(p => (
              <button key={p.val} className="fc-pset" onClick={() => startSession(p.val)} disabled={isRunning}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="fc-divider" />

          {/* Ring display */}
          <div className="fc-ring-wrap">
            <div className="fc-ring">
              <svg viewBox="0 0 180 180">
                <circle className="fc-ring-bg" cx="90" cy="90" r={RADIUS} />
                <circle
                  className={`fc-ring-fill${isRunning ? ' pulse' : ''}`}
                  cx="90" cy="90" r={RADIUS}
                  strokeDasharray={CIRC}
                  strokeDashoffset={dashOff}
                />
              </svg>
              <div className="fc-ring-inner">
                <span className="fc-big-time">{fmt(timeLeft)}</span>
                <span className={`fc-status ${statusClass}`}>{statusLabel}</span>
              </div>
            </div>
          </div>

          {/* Buttons: when running → Pause + Reset */}
          {isRunning ? (
            <div className="fc-actions fc-row2">
              <button className="fc-btn fc-btn-pause" onClick={() => setIsRunning(false)}>
                <Pause size={15} /> Pause
              </button>
              <button className="fc-btn fc-btn-reset" onClick={resetAll}>
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          ) : (
            <>
              <div className="fc-actions" style={{ marginBottom: 8 }}>
                <button className="fc-btn fc-btn-start" onClick={handleStart}>
                  <Play size={15} /> {timeLeft > 0 ? 'Resume' : 'Start Focus'}
                </button>
              </div>
              <div className="fc-actions fc-row2">
                <button className="fc-btn fc-btn-reset" onClick={resetAll}>
                  <RotateCcw size={15} /> Reset
                </button>
                <button className="fc-btn fc-btn-save" onClick={handleSave} disabled={btnLoader}>
                  <Save size={15} /> {btnLoader ? 'Saving…' : 'Save'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── CHART ──  timer data*/}
        <div className="fc-card fc-chart-card">
          <div className="fc-card-hd"><TrendingUp size={13} /> Weekly Output (minutes)</div>
          <div className="fc-chart-wrap">
            {timers.length > 0
              ? <Line data={chartData} options={chartOpts} />
              : (
                <div className="fc-chart-empty">
                  <TrendingUp size={36} strokeWidth={1} />
                  <span>Start a session to see your stats</span>
                </div>
              )}
          </div>
        </div>

        {/* ── LOGS ── timer data fetch */}
        <div className="fc-card fc-logs-card">
          <div className="fc-card-hd"><ListChecks size={13} /> Session Logs</div>
          <div className="fc-log-list">
            <AnimatePresence>
              {timers.length === 0
                ? <div className="fc-logs-empty">No sessions yet. Start focusing!</div>
                : [...timers].reverse().map(t => (
                  <motion.div
                    key={t._id}
                    className="fc-log-item"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="fc-log-icon"><Target size={16} /></div>
                    <div className="fc-log-info">
                      <div className="fc-log-title">{t.routineTitle}</div>
                      <div className="fc-log-meta">
                        {t.spentMin}m {t.spentSec}s &nbsp;/&nbsp; {t.min}m goal
                      </div>
                    </div>
                    <button className="fc-log-del" onClick={() => handleDelete(t._id)}>
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))
              }
            </AnimatePresence>
          </div>
        </div>

      </div>
      <audio ref={audioRef} src={sound} />
    </div>
  );
};

export default TimerChallanger;