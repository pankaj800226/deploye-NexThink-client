import React from "react";
import { Trash2, Clock, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import type { ITimer } from "./TimerChallanger";

interface Props {
  timers: ITimer[];
  handleDelete: (id: string) => void;
}

const TimerList: React.FC<Props> = ({ timers, handleDelete }) => {
  return (
    <div className="timer-list-wrapper">
      <div className="list-header">
        <h2>Focus History</h2>
        <span className="badge">{timers.length} sessions logged</span>
      </div>

      {timers.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">
            <Zap size={40} />
          </div>
          <p>No study logs found. Let's start your first session!</p>
        </div>
      ) : (
        <div className="logs-stack">
          {timers.slice().reverse().map((timer, i) => (
            <motion.div
              key={timer._id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="log-card"
            >
              <div className="log-body">
                <div className="log-main-info">
                  <div className="title-row">
                    <h3>{timer.routineTitle || "Untitled Session"}</h3>
                    <button
                      onClick={() => handleDelete(timer._id)}
                      className="delete-btn"
                      title="Delete log"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="log-stats-row">
                    <div className="stat-item">
                      <Clock size={14} className="icon-blue" />
                      <span>{timer.spentMin}m {timer.spentSec}s</span>
                    </div>
                    <div className="stat-item">
                      <Target size={14} className="icon-purple" />
                      <span>Goal: {timer.min}m</span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Progress Bar */}
                <div className="mini-progress-track">
                  <div
                    className="mini-progress-fill"
                    style={{
                      width: `${Math.min((timer.secondsSpent / (timer.min * 60)) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerList;