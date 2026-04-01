import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
import {
  Play, Pause, RotateCcw, Save, Trash2, Target,
  Zap, TrendingUp, TrendingDown, ListChecks, Flame, Minus
} from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface ITimer {
  _id: string;
  userId: string;
  routineTitle: string;
  min: number;
  spentMin: number;
  spentSec: number;
  secondsSpent: number;
  createdAt: string;
  updatedAt: string;
}

interface DayEntry {
  key: string;
  label: string;
  isToday: boolean;
}

type BarKind = "good" | "partial" | "bad" | "empty";
type VerdictKind = "good" | "neutral" | "bad";
type StatColor = "green" | "yellow" | "red";

/* ─── CONSTANTS ──────────────────────────────────────────────────────────── */
const PRESETS: { label: string; val: number }[] = [
  { label: "30m", val: 30 },
  { label: "1h", val: 60 },
  { label: "2h", val: 120 },
  { label: "4h", val: 240 },
  { label: "6h", val: 360 },
  { label: "8h", val: 480 },
];

const DAILY_GOAL_MIN = 60;

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
// FIX 1: Local date function to avoid timezone issues
const getLocalDayKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getLast15Days = (): DayEntry[] => {
  const days: DayEntry[] = [];
  const today = new Date();
  for (let i = 14; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = getLocalDayKey(d);
    const label = i === 0
      ? "Today"
      : d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2) + d.getDate();
    days.push({ key, label, isToday: i === 0 });
  }
  return days;
};

const getBarKind = (min: number): BarKind => {
  if (min === 0) return "empty";
  if (min >= DAILY_GOAL_MIN) return "good";
  if (min >= DAILY_GOAL_MIN * 0.5) return "partial";
  return "bad";
};

const getStatColor = (val: number, good: number, mid: number): StatColor =>
  val >= good ? "green" : val >= mid ? "yellow" : "red";

/* ─── CSS (Same as before, no changes) ──────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #07090f;
  --s1:        #0d1017;
  --s2:        #131720;
  --s3:        #1a1f2e;
  --border:    #21273a;
  --border2:   #2b3349;
  --accent:    #4fffb0;
  --accent2:   #00d4ff;
  --accentRgb: 79,255,176;
  --warn:      #ff5f5f;
  --warnRgb:   255,95,95;
  --gold:      #fbbf24;
  --goldRgb:   251,191,36;
  --partial:   #f97316;
  --partRgb:   249,115,22;
  --text:      #e4e9f8;
  --sub:       #5a6280;
  --r:         14px;
  --rSm:       10px;
  --shadow:    0 4px 32px rgba(0,0,0,0.55);
}

.fc {
  font-family: 'Outfit', sans-serif;
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.fc-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 4vw, 36px);
  height: 62px;
  background: var(--s1);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}
.fc-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -0.4px;
}
.fc-logo-icon {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: #07090f;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(var(--accentRgb), 0.3);
}
.fc-nav-right { display: flex; align-items: center; gap: 10px; }
.fc-badge {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  background: rgba(var(--accentRgb), 0.08);
  color: var(--accent);
  border: 1px solid rgba(var(--accentRgb), 0.2);
  padding: 4px 12px;
  border-radius: 99px;
}

.fc-page {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-areas:
    "progress timer"
    "chart    timer"
    "logs     timer";
  gap: 18px;
  padding: clamp(16px, 3vw, 28px);
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  align-items: start;
}

.fc-card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: clamp(16px, 2.5vw, 22px);
  box-shadow: var(--shadow);
}
.fc-card-hd {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--sub);
  margin-bottom: 16px;
}
.fc-card-hd svg { color: var(--accent); flex-shrink: 0; }

.fc-timer-card {
  grid-area: timer;
  position: sticky;
  top: 80px;
}
.fc-label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--sub); margin-bottom: 6px;
}
.fc-inp {
  width: 100%;
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 14px; font-weight: 500;
  padding: 10px 13px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 13px;
}
.fc-inp:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accentRgb), 0.1);
}
.fc-inp:disabled { opacity: 0.38; cursor: not-allowed; }
.fc-inp::placeholder { color: var(--sub); }
input[type=number].fc-inp::-webkit-inner-spin-button { -webkit-appearance: none; }

.fc-presets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 18px;
}
.fc-pset {
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  color: var(--sub);
  font-family: 'Space Mono', monospace;
  font-size: 11px; padding: 8px 4px;
  cursor: pointer; text-align: center;
  transition: all 0.15s; font-weight: 700;
}
.fc-pset:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(var(--accentRgb), 0.07);
}
.fc-pset:disabled { opacity: 0.3; cursor: not-allowed; }
.fc-divider { height: 1px; background: var(--border); margin: 14px 0; }

.fc-ring-wrap { display: flex; justify-content: center; padding: 6px 0 18px; }
.fc-ring { position: relative; width: 170px; height: 170px; }
.fc-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.fc-ring-bg   { fill: none; stroke: var(--s3); stroke-width: 8; }
.fc-ring-fill {
  fill: none; stroke: var(--accent);
  stroke-width: 8; stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}
.fc-ring-fill.pulse { animation: ringGlow 2s ease-in-out infinite; }
@keyframes ringGlow {
  0%,100% { filter: drop-shadow(0 0 4px rgba(var(--accentRgb),.45)); }
  50%      { filter: drop-shadow(0 0 18px rgba(var(--accentRgb),.9)); }
}
.fc-ring-inner {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 4px;
}
.fc-big-time {
  font-family: 'Space Mono', monospace;
  font-size: clamp(22px, 5vw, 32px);
  font-weight: 700; letter-spacing: -1px; line-height: 1;
}
.fc-status {
  font-size: 9px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.8px;
  color: var(--sub);
}
.fc-status.active { color: var(--accent); }
.fc-status.paused { color: var(--warn); }

.fc-actions { display: grid; gap: 7px; }
.fc-row2 { grid-template-columns: 1fr 1fr; }
.fc-btn {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  border: none; border-radius: var(--rSm);
  font-family: 'Outfit', sans-serif;
  font-size: 13px; font-weight: 700;
  padding: 11px 14px; cursor: pointer;
  transition: all 0.18s; white-space: nowrap;
}
.fc-btn:disabled { opacity: 0.38; cursor: not-allowed; }
.fc-btn-start {
  background: linear-gradient(135deg, var(--accent), #00e896);
  color: #07090f;
}
.fc-btn-start:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
.fc-btn-pause {
  background: rgba(var(--warnRgb), 0.1); color: var(--warn);
  border: 1px solid rgba(var(--warnRgb), 0.25);
}
.fc-btn-pause:hover { background: rgba(var(--warnRgb), 0.18); }
.fc-btn-reset {
  background: var(--s2); color: var(--sub);
  border: 1px solid var(--border);
}
.fc-btn-reset:hover { color: var(--text); border-color: var(--border2); }
.fc-btn-save {
  background: rgba(var(--accentRgb), 0.08); color: var(--accent);
  border: 1px solid rgba(var(--accentRgb), 0.2);
}
.fc-btn-save:hover:not(:disabled) { background: rgba(var(--accentRgb), 0.16); }

.fc-chart-card { grid-area: chart; }
.fc-chart-wrap { height: 190px; }
.fc-chart-empty {
  height: 190px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; color: var(--sub); font-size: 13px;
}

.fc-logs-card { grid-area: logs; }
.fc-log-list {
  display: flex; flex-direction: column; gap: 7px;
  max-height: 360px; overflow-y: auto; padding-right: 2px;
}
.fc-log-list::-webkit-scrollbar { width: 3px; }
.fc-log-list::-webkit-scrollbar-track { background: transparent; }
.fc-log-list::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
.fc-log-item {
  display: flex; align-items: center; gap: 11px;
  padding: 11px 13px;
  background: var(--s2); border: 1px solid var(--border);
  border-radius: var(--rSm); transition: border-color 0.15s;
}
.fc-log-item:hover { border-color: var(--border2); }
.fc-log-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(var(--accentRgb), 0.08); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.fc-log-info { flex: 1; min-width: 0; }
.fc-log-title {
  font-weight: 600; font-size: 13px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.fc-log-meta {
  font-family: 'Space Mono', monospace;
  font-size: 10px; color: var(--sub); margin-top: 2px;
}
.fc-log-del {
  background: none; border: none; color: var(--sub);
  cursor: pointer; padding: 6px; border-radius: 6px;
  display: flex; align-items: center;
  transition: color 0.15s, background 0.15s; flex-shrink: 0;
}
.fc-log-del:hover { color: var(--warn); background: rgba(var(--warnRgb), 0.08); }
.fc-logs-empty {
  text-align: center; color: var(--sub); font-size: 13px; padding: 36px 0;
}

.fc-progress-card { grid-area: progress; }

.fc-progress-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.fc-progress-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.fc-streak {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 700;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid rgba(var(--goldRgb), 0.25);
  background: rgba(var(--goldRgb), 0.08);
  color: var(--gold);
}
.fc-streak.cold {
  border-color: var(--border);
  background: var(--s2);
  color: var(--sub);
}
.fc-verdict {
  display: flex; align-items: center; gap: 5px;
  padding: 4px 11px;
  border-radius: 99px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
}
.fc-verdict.good    { background: rgba(var(--accentRgb),0.08); color: var(--accent); border: 1px solid rgba(var(--accentRgb),0.2); }
.fc-verdict.neutral { background: rgba(var(--goldRgb),0.08);   color: var(--gold);   border: 1px solid rgba(var(--goldRgb),0.2); }
.fc-verdict.bad     { background: rgba(var(--warnRgb),0.08);   color: var(--warn);   border: 1px solid rgba(var(--warnRgb),0.2); }

.fc-days-grid {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 4px;
  align-items: end;
}
.fc-day-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.fc-day-min {
  font-family: 'Space Mono', monospace;
  font-size: 7px; color: transparent;
  transition: color 0.2s;
  white-space: nowrap;
}
.fc-day-min.has { color: var(--sub); }

.fc-day-bar-track {
  width: 100%; height: 84px;
  background: var(--s2);
  border-radius: 5px;
  position: relative; overflow: hidden;
  border: 1px solid var(--border);
  cursor: default;
}
.fc-day-bar-track::before {
  content: '';
  position: absolute;
  left: 0; right: 0;
  bottom: calc(var(--goal-pct, 60) * 1%);
  height: 1px;
  background: repeating-linear-gradient(90deg, rgba(var(--accentRgb),.35) 0 4px, transparent 4px 8px);
  z-index: 2;
  pointer-events: none;
}
.fc-day-bar-fill {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  border-radius: 4px 4px 3px 3px;
}
.fc-day-bar-fill.good    { background: linear-gradient(to top, var(--accent), rgba(79,255,176,0.4)); }
.fc-day-bar-fill.partial { background: linear-gradient(to top, var(--gold),   rgba(251,191,36,0.4)); }
.fc-day-bar-fill.bad     { background: linear-gradient(to top, var(--warn),   rgba(255,95,95,0.35)); }
.fc-day-bar-fill.empty   { background: var(--s3); }

.fc-day-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px; color: var(--sub);
  text-align: center; white-space: nowrap;
}
.fc-day-label.today { color: var(--accent); font-weight: 700; }

.fc-bar-legend {
  display: flex; align-items: center; gap: 14px;
  margin-top: 10px; flex-wrap: wrap;
}
.fc-legend-item {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; color: var(--sub);
}
.fc-legend-dot {
  width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0;
}
.fc-legend-dot.good    { background: var(--accent); }
.fc-legend-dot.partial { background: var(--gold); }
.fc-legend-dot.bad     { background: var(--warn); }
.fc-legend-dot.empty   { background: var(--s3); border: 1px solid var(--border); }
.fc-legend-goal {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; color: var(--sub);
}
.fc-legend-dash {
  width: 16px; height: 1px;
  background: repeating-linear-gradient(90deg, rgba(var(--accentRgb),.6) 0 3px, transparent 3px 6px);
}

.fc-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 14px;
}
.fc-stat-box {
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: var(--rSm);
  padding: 12px 13px;
  display: flex; flex-direction: column; gap: 3px;
  transition: border-color 0.2s;
}
.fc-stat-box:hover { border-color: var(--border2); }
.fc-stat-label {
  font-size: 9px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.9px;
  color: var(--sub);
}
.fc-stat-val {
  font-family: 'Space Mono', monospace;
  font-size: 20px; font-weight: 700; line-height: 1;
  display: flex; align-items: baseline; gap: 2px;
}
.fc-stat-val sup { font-size: 11px; opacity: 0.5; font-weight: 400; }
.fc-stat-val.green  { color: var(--accent); }
.fc-stat-val.yellow { color: var(--gold); }
.fc-stat-val.red    { color: var(--warn); }
.fc-stat-sub { font-size: 9px; color: var(--sub); }

@media (max-width: 900px) {
  .fc-page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "timer"
      "progress"
      "chart"
      "logs";
  }
  .fc-timer-card { position: static; }
  .fc-stats-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 600px) {
  .fc-days-grid { gap: 3px; }
  .fc-day-bar-track { height: 64px; }
  .fc-day-min { display: none; }
  .fc-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .fc-day-label { font-size: 7px; }
}
@media (max-width: 420px) {
  .fc-nav { padding: 0 14px; }
  .fc-logo span { display: none; }
  .fc-ring { width: 148px; height: 148px; }
  .fc-big-time { font-size: 24px; }
  .fc-day-bar-track { height: 52px; }
}
`;

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const TimerChallanger: React.FC = () => {
  const [routineTitle, setRoutineTitle] = useState<string>("");
  const [customMin, setCustomMin] = useState<number | "">("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalInitialSeconds, setTotalInitialSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timers, setTimers] = useState<ITimer[]>([]);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const token = localStorage.getItem("TOKEN");

  /* ── FIX: Audio play with error handling ── */
  const playSound = useCallback(async () => {
    if (audioRef.current && !audioError) {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Audio playback failed:", err);
        setAudioError(true);
        toast.success("🎉 Focus session complete!", { duration: 5000 });
      }
    } else {
      toast.success("🎉 Focus session complete!", { duration: 5000 });
    }
  }, [audioError]);

  /* ── fetch timers ── */
  const fetchTimers = useCallback(async (): Promise<void> => {
    if (!token) {
      toast.error("Please login again");
      return;
    }
    try {
      const res = await axios.get<ITimer[]>(`${api}/api/timer/getTimers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // FIX: Validate timer data
      const validTimers = res.data.filter(t => {
        const mins = t.spentMin ?? 0;
        const isValid = mins >= 0 && mins <= 1440; // Max 24 hours
        if (!isValid) {
          console.warn("Invalid timer found:", t);
        }
        return isValid;
      });
      setTimers(validTimers);
    } catch (err) {
      console.error('Failed to fetch timers:', err);
      toast.error("Failed to load sessions");
    }
  }, [token]);

  useEffect(() => {
    fetchTimers();
  }, [fetchTimers]);

  /* ── FIX: Timer countdown engine with proper cleanup ── */
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;

    if (isRunning && timeLeft > 0) {
      id = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playSound();
    }

    return () => {
      if (id) clearInterval(id);
    };
  }, [isRunning, timeLeft, playSound]);

  /* ── handlers ── */
  const startSession = useCallback((mins: number): void => {
    if (isRunning) {
      toast.error("Current session finish karo pehle");
      return;
    }
    const secs = mins * 60;
    setCustomMin(mins);
    setTimeLeft(secs);
    setTotalInitialSeconds(secs);
    setIsRunning(true);
  }, [isRunning]);

  const handleStart = useCallback((): void => {
    if (isRunning) return;

    if (timeLeft > 0) {
      setIsRunning(true);
      return;
    }

    if (!customMin || Number(customMin) <= 0) {
      toast.error("Set minutes first");
      return;
    }

    startSession(Number(customMin));
  }, [isRunning, timeLeft, customMin, startSession]);

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    if (!token) return;
    try {
      await axios.delete(`${api}/api/timer/deleteTimer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTimers();
      toast.success("Session deleted");
    } catch {
      toast.error("Delete failed");
    }
  }, [token, fetchTimers]);

  // FIX: Save session with validation
  const handleSave = useCallback(async (): Promise<void> => {
    const spent = totalInitialSeconds - timeLeft;

    if (!routineTitle.trim()) {
      toast.error("Please enter a session title");
      return;
    }

    if (routineTitle.length > 50) {
      toast.error("Title too long (max 50 chars)");
      return;
    }

    if (spent < 5) {
      toast.error("Session must be at least 5 seconds");
      return;
    }

    const spentMin = Math.floor(spent / 60);
    const spentSec = spent % 60;

    // FIX: Validate minutes
    if (spentMin > 1440) {
      toast.error("Invalid session duration");
      return;
    }

    setBtnLoader(true);
    try {
      await axios.post(`${api}/api/timer/saveTimer`, {
        routineTitle,
        min: Math.floor(totalInitialSeconds / 60),
        spentMin,
        spentSec,
        secondsSpent: spent,
      }, { headers: { Authorization: `Bearer ${token}` } });

      toast.success("Saved to dashboard!");
      fetchTimers();
      resetAll();
    } catch {
      toast.error("Save error");
    } finally {
      setBtnLoader(false);
    }
  }, [routineTitle, totalInitialSeconds, timeLeft, token, fetchTimers]);

  const resetAll = useCallback((): void => {
    setIsRunning(false);
    setTimeLeft(0);
    setTotalInitialSeconds(0);
    setCustomMin("");
    setRoutineTitle("");
  }, []);

  const fmt = useCallback((s: number): string => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h > 0 ? h + ":" : ""}${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }, []);

  /* ── SVG ring ── */
  const RADIUS = 78;
  const CIRC = 2 * Math.PI * RADIUS;
  const dashOff = totalInitialSeconds > 0
    ? CIRC * (1 - timeLeft / totalInitialSeconds)
    : CIRC;

  /* ── Chart Data ── */
  const chartData = useMemo(() => ({
    labels: timers.slice(-8).map(t => t.routineTitle.substring(0, 7)),
    datasets: [{
      data: timers.slice(-8).map(t => t.spentMin),
      borderColor: "#4fffb0",
      backgroundColor: "rgba(79,255,176,0.06)",
      fill: true,
      tension: 0.45,
      pointRadius: 4,
      pointBackgroundColor: "#4fffb0",
      pointBorderColor: "#07090f",
      pointBorderWidth: 2,
    }],
  }), [timers]);

  const chartOpts = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: "#1a1f2e" }, ticks: { color: "#5a6280", font: { family: "Space Mono", size: 10 } } },
      y: { grid: { color: "#1a1f2e" }, ticks: { color: "#5a6280", font: { family: "Space Mono", size: 10 } } },
    },
  }), []);

  /* ══════════════════════════════════════
     FIX: 15-DAY PROGRESS DATA WITH LOCAL DATES
  ══════════════════════════════════════ */
  const days15 = useMemo<DayEntry[]>(() => getLast15Days(), []);

  // FIX: Use local date for daily map
  const dailyMap = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};

    timers.forEach(t => {
      if (!t.createdAt) return;

      // Use local date to avoid timezone issues
      const date = new Date(t.createdAt);
      const key = getLocalDayKey(date);
      const mins = t.spentMin ?? 0;

      // FIX: Only add valid minutes
      if (mins > 0 && mins <= 1440) {
        map[key] = (map[key] ?? 0) + mins;
      }
    });

    return map;
  }, [timers]);

  // FIX: Calculate max day minutes from last 15 days only
  const maxDayMin = useMemo<number>(() => {
    const vals = days15.map(d => dailyMap[d.key] ?? 0);
    const maxVal = Math.max(...vals, DAILY_GOAL_MIN, 1);
    return maxVal;
  }, [days15, dailyMap]);

  const goalPct = useMemo(() => {
    return Math.min(Math.round((DAILY_GOAL_MIN / maxDayMin) * 100), 100);
  }, [maxDayMin]);

  // FIX: Stats calculation using only last 15 days
  const stats = useMemo(() => {
    let goodDays = 0;
    let badDays = 0;
    let emptyDays = 0;
    let totalMin15 = 0;

    days15.forEach(day => {
      const mins = dailyMap[day.key] ?? 0;
      totalMin15 += mins;

      if (mins >= DAILY_GOAL_MIN) goodDays++;
      else if (mins > 0 && mins < DAILY_GOAL_MIN) badDays++;
      else if (mins === 0) emptyDays++;
    });

    const avgMin = Math.round(totalMin15 / 15);

    // Calculate streak
    let streak = 0;
    for (let i = days15.length - 1; i >= 0; i--) {
      const mins = dailyMap[days15[i].key] ?? 0;
      if (mins >= DAILY_GOAL_MIN) streak++;
      else break;
    }

    // Verdict
    const goodRatio = goodDays / 15;
    const verdict: VerdictKind = goodRatio >= 0.6 ? "good" : goodRatio >= 0.3 ? "neutral" : "bad";
    const verdictText = verdict === "good" ? "🔥 On Fire" : verdict === "neutral" ? "〜 Average" : "📉 Needs Work";

    return {
      goodDays,
      badDays,
      emptyDays,
      totalMin15,
      avgMin,
      streak,
      verdict,
      verdictText
    };
  }, [days15, dailyMap]);

  const statusLabel = isRunning ? "focusing" : timeLeft > 0 ? "paused" : "ready";
  const statusClass = isRunning ? "active" : timeLeft > 0 ? "paused" : "";

  return (
    <div className="fc">
      <style>{css}</style>

      {/* Navbar */}
      {/* <div className="fc-nav">
        <div className="fc-logo">
          <div className="fc-logo-icon">
            <Zap size={18} />
          </div>
          <span>FocusChallanger</span>
        </div>
        <div className="fc-nav-right">
          <div className="fc-badge">⚡ focus mode</div>
        </div>
      </div> */}

      <div className="fc-page">

        {/* ════════════════════════════════
            15-DAY PROGRESS (FIXED)
        ════════════════════════════════ */}
        <div className="fc-card fc-progress-card">

          <div className="fc-progress-top">
            <div className="fc-card-hd" style={{ marginBottom: 0 }}>
              <Flame size={13} /> 15-Day Progress
            </div>
            <div className="fc-progress-badges">
              <div className={`fc-streak ${stats.streak >= 3 ? "" : "cold"}`}>
                <Flame size={12} /> {stats.streak}d streak
              </div>
              <div className={`fc-verdict ${stats.verdict}`}>
                {stats.verdict === "good" && <TrendingUp size={11} />}
                {stats.verdict === "neutral" && <Minus size={11} />}
                {stats.verdict === "bad" && <TrendingDown size={11} />}
                {stats.verdictText}
              </div>
            </div>
          </div>

          {/* BAR GRID */}
          <div
            className="fc-days-grid"
            style={{ '--goal-pct': goalPct } as React.CSSProperties}
          >
            {days15.map((day, i) => {
              const min = dailyMap[day.key] ?? 0;
              const kind = getBarKind(min);
              const heightPc = kind === "empty"
                ? 4
                : Math.max((min / maxDayMin) * 100, 5);

              return (
                <div className="fc-day-col" key={day.key}>
                  <div className={`fc-day-min ${min > 0 ? "has" : ""}`}>
                    {min > 0 ? `${min}m` : ""}
                  </div>
                  <div className="fc-day-bar-track">
                    <motion.div
                      className={`fc-day-bar-fill ${kind}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPc}%` }}
                      transition={{
                        duration: 0.65,
                        delay: i * 0.04,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    />
                  </div>
                  <div className={`fc-day-label ${day.isToday ? "today" : ""}`}>
                    {day.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* LEGEND */}
          <div className="fc-bar-legend">
            <div className="fc-legend-item"><div className="fc-legend-dot good" /> ≥{DAILY_GOAL_MIN}m</div>
            <div className="fc-legend-item"><div className="fc-legend-dot partial" /> {DAILY_GOAL_MIN / 2}–{DAILY_GOAL_MIN - 1}m</div>
            <div className="fc-legend-item"><div className="fc-legend-dot bad" /> &lt;{DAILY_GOAL_MIN / 2}m</div>
            <div className="fc-legend-item"><div className="fc-legend-dot empty" /> No session</div>
            <div className="fc-legend-goal"><div className="fc-legend-dash" /> Goal line</div>
          </div>

          {/* ── STATS (FIXED) ── */}
          <div className="fc-stats-grid">
            <div className="fc-stat-box">
              <div className="fc-stat-label">Good Days</div>
              <div className={`fc-stat-val ${getStatColor(stats.goodDays, 10, 5)}`}>
                {stats.goodDays}<sup>/15</sup>
              </div>
              <div className="fc-stat-sub">≥{DAILY_GOAL_MIN} min/day</div>
            </div>

            <div className="fc-stat-box">
              <div className="fc-stat-label">Partial Days</div>
              <div className={`fc-stat-val ${getStatColor(15 - stats.badDays - stats.emptyDays, 8, 4)}`}>
                {stats.badDays}<sup>/15</sup>
              </div>
              <div className="fc-stat-sub">&lt;{DAILY_GOAL_MIN}m, &gt;0m</div>
            </div>

            <div className="fc-stat-box">
              <div className="fc-stat-label">Avg / Day</div>
              <div className={`fc-stat-val ${getStatColor(stats.avgMin, DAILY_GOAL_MIN, 30)}`}>
                {stats.avgMin}<sup>m</sup>
              </div>
              <div className="fc-stat-sub">last 15 days</div>
            </div>

            <div className="fc-stat-box">
              <div className="fc-stat-label">Missed Days</div>
              <div className={`fc-stat-val ${getStatColor(15 - stats.emptyDays, 12, 8)}`}>
                {stats.emptyDays}<sup>/15</sup>
              </div>
              <div className="fc-stat-sub">zero sessions</div>
            </div>
          </div>
        </div>

        {/* ── TIMER CONTROL (Same) ── */}
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
              <button
                key={p.val}
                className="fc-pset"
                onClick={() => startSession(p.val)}
                disabled={isRunning}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="fc-divider" />

          {/* Ring */}
          <div className="fc-ring-wrap">
            <div className="fc-ring">
              <svg viewBox="0 0 180 180">
                <circle className="fc-ring-bg" cx="90" cy="90" r={RADIUS} />
                <circle
                  className={`fc-ring-fill${isRunning ? " pulse" : ""}`}
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

          {/* Buttons */}
          {isRunning ? (
            <div className="fc-actions fc-row2">
              <button className="fc-btn fc-btn-pause" onClick={() => setIsRunning(false)}>
                <Pause size={14} /> Pause
              </button>
              <button className="fc-btn fc-btn-reset" onClick={resetAll}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          ) : (
            <>
              <div className="fc-actions" style={{ marginBottom: 7 }}>
                <button className="fc-btn fc-btn-start" onClick={handleStart}>
                  <Play size={14} /> {timeLeft > 0 ? "Resume" : "Start Focus"}
                </button>
              </div>
              <div className="fc-actions fc-row2">
                <button className="fc-btn fc-btn-reset" onClick={resetAll}>
                  <RotateCcw size={14} /> Reset
                </button>
                <button className="fc-btn fc-btn-save" onClick={handleSave} disabled={btnLoader}>
                  <Save size={14} /> {btnLoader ? "Saving…" : "Save"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── CHART (Same) ── */}
        <div className="fc-card fc-chart-card">
          <div className="fc-card-hd"><TrendingUp size={13} /> Weekly Output (minutes)</div>
          <div className="fc-chart-wrap">
            {timers.length > 0
              ? <Line data={chartData} options={chartOpts} />
              : (
                <div className="fc-chart-empty">
                  <TrendingUp size={34} strokeWidth={1} />
                  <span>Start a session to see your stats</span>
                </div>
              )}
          </div>
        </div>

        {/* ── LOGS (Same) ── */}
        <div className="fc-card fc-logs-card">
          <div className="fc-card-hd"><ListChecks size={13} /> Session Logs : {timers.length}</div>
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
                    <div className="fc-log-icon"><Target size={15} /></div>
                    <div className="fc-log-info">
                      <div className="fc-log-title">{t.routineTitle}</div>
                      <div className="fc-log-meta">
                        {t.spentMin}m {t.spentSec}s &nbsp;/&nbsp; {t.min}m goal
                      </div>
                    </div>
                    <button className="fc-log-del" onClick={() => handleDelete(t._id)}>
                      <Trash2 size={14} />
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