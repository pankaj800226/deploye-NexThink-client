import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/SideBar";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";
import { api } from "../../api/api";
import CoverImg from "./CoverImg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { motion } from "framer-motion"; // ✅ import framer-motion

type Task = {
  _id: string;
  title: string;
  status: string;
};

const ManageTodo = () => {
  const [allTask, setAllTask] = useState<Task[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const fetchTask = async () => {
    const token = localStorage.getItem("TOKEN");
    if (!token) return;

    try {
      setLoader(true);
      const res = await axios.get(`${api}/api/todo/getTask`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAllTask(res.data.findTask);
    } catch (err) {
      console.log(err);
      setError("Api Fetching Error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const completedCount = allTask.filter(
    task => task.status === "completed"
  ).length;

  const pendingCount = allTask.length - completedCount;

  const progressPercent =
    allTask.length === 0
      ? 0
      : Math.round((completedCount / allTask.length) * 100);

  const chartData = [
    { name: "Total", value: allTask.length },
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount }
  ];



  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { width: `${progressPercent}%`, transition: { duration: 1 } }
  };

  const getBadge = (completed: number) => {
    if (completed >= 100) return { name: "Legendary", color: "#7f7f7f", icon: "💎" };
    if (completed >= 75) return { name: "Epic", color: "#a52a2a", icon: "🔥" };
    if (completed >= 35) return { name: "Golden", color: "#ffd700", icon: "🏆" };
    return { name: "Silver", color: "#c0c0c0", icon: "🥈" };
  };


  const bedge = getBadge(completedCount)

  if (loader) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="dashboard_container">
      <Sidebar />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <CoverImg />

        <motion.div className="analyze_container" variants={containerVariants}>

          {/* STAT CARDS */}
          <motion.div className="stats_card" variants={cardVariants}>
            <h2>Total Tasks</h2>
            <p>{allTask.length}</p>
          </motion.div>

          <motion.div className="stats_card completed" variants={cardVariants}>
            <h2>Completed</h2>
            <p>{completedCount}</p>
          </motion.div>

          <motion.div className="stats_card pending" variants={cardVariants}>
            <h2>Pending</h2>
            <p>{pendingCount}</p>
          </motion.div>

          <motion.div className="stats_card badge" variants={cardVariants}>
            <h2>Achievement</h2>
            <div
              style={{
                background: `linear-gradient(135deg, ${bedge.color} 0%, #000 100%)`,
                padding: "10px 20px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                  textAlign: "center",
                  lineHeight: "24px",
                  color: bedge.color
                }}
              >
                {bedge.icon}
              </span>
              {bedge.name}
            </div>
          </motion.div>
          {/* PROGRESS BAR */}
          <motion.div className="progress_card" variants={cardVariants}>
            <div className="progress_header">
              <h3>Task Progress</h3>
              <span>{progressPercent}%</span>
            </div>

            <div className="progress_bar">
              <motion.div
                className="progress_fill"
                initial="hidden"
                animate="visible"
                variants={progressVariants}
              />
            </div>
          </motion.div>

          {/* LINE CHART */}
          <motion.div className="chart_card" variants={cardVariants}>
            <h3>Task Status Trend</h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#1f242b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    background: "#15191d",
                    border: "1px solid #2a2f36",
                    color: "#fff"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6a5af9"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </motion.div>
      </motion.main>
    </div>
  );
};

export default ManageTodo;
