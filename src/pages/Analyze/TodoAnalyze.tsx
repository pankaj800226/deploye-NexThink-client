import { useEffect, useState } from "react";
import axios from "axios";
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
import { motion } from "framer-motion";

type Task = {
  _id: string;
  title: string;
  status: string;
};

const Analyze = () => {
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
      setError("Api Fetching Error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => { fetchTask(); }, []);

  const completedCount = allTask.filter(t => t.status === "completed").length;
  const pendingCount = allTask.length - completedCount;
  const progressPercent = allTask.length === 0 ? 0 : Math.round((completedCount / allTask.length) * 100);

  const getBadge = (count: number) => {
    if (count >= 100) return { name: "Legendary", color: "#6366f1", icon: "💎" };
    if (count >= 75) return { name: "Epic", color: "#ef4444", icon: "🔥" };
    return { name: "Achiever", color: "#f59e0b", icon: "🏆" };
  };
  const badge = getBadge(completedCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loader) return <Loading />;
  if (error) return <ApiError error={error} />;

  // ... (Imports and Logic same as before)

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 selection:bg-indigo-100">
      {/* 1. Enhanced Cover Image with Bottom Curve */}
      <div className="relative shadow-sm border-b border-gray-100 overflow-hidden">
        <CoverImg />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 mt-10"
      >

        {/* 2. Sleek Header with Date/Time feel */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-1.5 w-8 bg-indigo-600 rounded-full"></span>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em]">Live Insights</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 text-base mt-2">Manage your workflow and track task velocity.</p>
          </div>

          {/* Enhanced Badge Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.02)] ring-1 ring-slate-100"
          >
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-3xl shadow-inner">
              {badge.icon}
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase leading-none mb-1">Rank Status</p>
              <p className="text-lg font-black" style={{ color: badge.color }}>{badge.name}</p>
            </div>
          </motion.div>
        </header>

        {/* 3. High-End Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Active Pipeline", val: allTask.length, icon: "📋", theme: "indigo" },
            { label: "Goals Reached", val: completedCount, icon: "✅", theme: "emerald" },
            { label: "In Queue", val: pendingCount, icon: "⏳", theme: "amber" }
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all overflow-hidden"
            >
              {/* Background Decoration */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 bg-${s.theme}-600`} />

              <div className="relative z-10">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest">{s.label}</h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">{s.val}</p>
                  <span className="text-slate-300 font-medium text-sm">tasks</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Combined Progress & Trend Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Modern Progress Bar (Col 4) */}
          <motion.div variants={cardVariants} className="lg:col-span-4 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="font-black text-xl mb-6 text-slate-800">Efficiency</h3>

            <div className="relative h-[200px] flex items-center justify-center">
              {/* Visual Progress ring effect (simple version) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-[12px] border-slate-50 relative flex items-center justify-center">
                  <span className="text-4xl font-black text-indigo-600">{progressPercent}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-400">
                <span>Task Saturation</span>
                <span>{progressPercent}% / 100%</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full p-1 border border-slate-50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                />
              </div>
            </div>
          </motion.div>

          {/* Professional Graph (Col 8) */}
          <motion.div variants={cardVariants} className="lg:col-span-8 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-xl text-slate-800 tracking-tight">Performance Trend</h3>
              <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
                <option>Current Metrics</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={[{ name: "Total", value: allTask.length }, { name: "Done", value: completedCount }, { name: "Pending", value: pendingCount }]}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} dy={15} />
                <YAxis stroke="#94A3B8" fontSize={11} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ stroke: '#EEF2FF', strokeWidth: 40 }}
                  contentStyle={{ borderRadius: '20px', border: 'none', padding: '15px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={5}
                  dot={{ fill: "#4F46E5", strokeWidth: 4, r: 6, stroke: "#fff" }}
                  activeDot={{ r: 10, strokeWidth: 0 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      </motion.main>
    </div>
  );
};

export default Analyze;