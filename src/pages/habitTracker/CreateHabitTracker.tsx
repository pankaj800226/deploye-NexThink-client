import { Add, AutoAwesome, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import { CheckCircle, Target } from "lucide-react";

// ============================================
// TYPE DEFINITIONS
// ============================================

// Individual day data structure
type Day = { checked: boolean; date: string };
// Week data structure (7 days)
type Week = { weekNo: number; days: Day[] };
// Task/Habit data structure
type Task = { _id: string; title: string; weeks: Week[] };

// ============================================
// HELPER FUNCTIONS
// ============================================

// ✅ Check if a day is missed (past date AND not checked)
const isMissed = (date: string, checked: boolean): boolean => {
    if (checked) return false; // Already checked, so not missed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate < today; // Returns true if date is in the past
};

// ✅ Check if a day is today's date
const isToday = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() === today.getTime();
};

// ✅ Check if a day is in the future (can't check future days)
const isFuture = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate > today;
};

// ✅ Check if all days in a week are completed (checked OR missed)
const isWeekAllDone = (week: Week): boolean => {
    return week.days.every(day => {
        if (day.checked) return true; // Day is checked
        return isMissed(day.date, day.checked); // Day is missed (past unchecked)
    });
};

// ============================================
// MAIN COMPONENT
// ============================================

const CreateHabitTracker = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("TOKEN");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);

    // ============================================
    // AUTO-TRIGGER NEXT WEEK WHEN CURRENT WEEK IS COMPLETE
    // ============================================

    // ✅ Automatically trigger next week when all days in current week are done
    const triggerMissedWeeks = async (fetchedTasks: Task[]) => {
        for (const task of fetchedTasks) {
            for (const week of task.weeks) {
                const allDone = isWeekAllDone(week);  // Check if week complete
                const nextWeekExists = task.weeks.some(w => w.weekNo === week.weekNo + 1);

                // If week complete AND next week doesn't exist, create next week
                if (allDone && !nextWeekExists) {
                    try {
                        const res = await axios.put(
                            `${api}/api/shedular/check`,
                            {
                                taskId: task._id,
                                weekNo: week.weekNo,
                                dayIndex: 6,
                                checked: week.days[6].checked
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        // Update the task with new week data
                        setTasks(prev =>
                            prev.map(t => (t._id === task._id ? res.data.task : t))
                        );
                    } catch (err) {
                        console.log("Week trigger error:", err);
                    }
                }
            }
        }
    };

    // ============================================
    // FETCH ALL HABITS ON COMPONENT MOUNT
    // ============================================

    useEffect(() => {
        const fetchShedular = async () => {
            try {
                setLoader(true);
                // Fetch all habits from API
                const res = await axios.get(`${api}/api/shedular/get/shedular`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fetchedTasks = res.data.schedulers;
                setTasks(fetchedTasks);
                // Check and auto-create next weeks if needed
                await triggerMissedWeeks(fetchedTasks);
            } catch (error) {
                console.log(error);
                setError("API fetch error");
            } finally {
                setLoader(false);
            }
        };
        fetchShedular();
    }, [token]);

    // ============================================
    // MOTIVATION MESSAGES BASED ON PROGRESS
    // ============================================

    const getMotivation = (percent: number) => {
        if (percent === 0) return "Every journey starts with a single check! 🌱";
        if (percent < 30) return "You're getting started, keep it up! 💪";
        if (percent < 70) return "Consistency is key. You're doing great! 🚀";
        if (percent < 100) return "So close to perfection! Don't stop! 🎯";
        return "Masterpiece! You crushed it this week! 🏆✨";
    };

    // ============================================
    // ACHIEVEMENT BADGES BASED ON PROGRESS
    // ============================================

    const getAchievementBadge = (percent: number) => {
        if (percent === 100) return { icon: "👑", text: "Perfect Week!", color: "#fbbf24" };
        if (percent >= 80) return { icon: "🔥", text: "On Fire!", color: "#f97316" };
        if (percent >= 60) return { icon: "⚡", text: "Great Progress!", color: "#6366f1" };
        if (percent >= 40) return { icon: "🌱", text: "Growing!", color: "#10b981" };
        return { icon: "🎯", text: "Keep Going!", color: "#6b7280" };
    };

    // ============================================
    // CALCULATE OVERALL PROGRESS FOR A TASK
    // ============================================

    const calculateTaskProgress = (task: Task) => {
        // Flatten all days from all weeks
        const allDays = task.weeks.flatMap(w => w.days);
        // Count checked days
        const checked = allDays.filter(d => d.checked).length;
        // Calculate percentage
        return allDays.length > 0 ? Math.round((checked / allDays.length) * 100) : 0;
    };

    // ============================================
    // ADD NEW HABIT/TASK
    // ============================================

    const handleAddTask = async () => {
        if (!input.trim()) return; // Don't add empty tasks

        setBtnLoader(true);
        const startDate = new Date();

        // Create 7 days starting from today
        const daysArray: Day[] = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            return { checked: false, date: d.toISOString() };
        });

        const newTask = {
            title: input.trim(),
            weeks: [{ weekNo: 1, days: daysArray }],
        };

        try {
            // API call to create new habit
            const res = await axios.post(`${api}/api/shedular/create/shedular`, newTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Scheduler created 🎉");
            setTasks(prev => [...prev, res.data.task]);
            setInput(""); // Clear input field
        } catch (error) {
            console.log(error);
            toast.error("Error creating task");
        } finally {
            setBtnLoader(false);
        }
    };

    // ============================================
    // DELETE HABIT/TASK
    // ============================================

    const handleDelete = async (id: string) => {
        try {
            // API call to delete habit
            await axios.delete(`${api}/api/shedular/delete/shedular/${id}`);
            // Remove from local state
            setTasks(prev => prev.filter(s => s._id !== id));
            toast.success("Habit Deleted");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting");
        }
    };

    // ============================================
    // TOGGLE CHECKBOX FOR A SPECIFIC DAY
    // ============================================

    const handleCheckbox = async (taskId: string, weekNo: number, dayIndex: number, checked: boolean) => {
        try {
            // API call to update day status
            const res = await axios.put(
                `${api}/api/shedular/check`,
                { taskId, weekNo, dayIndex, checked },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Update local state with response
            setTasks(prev => prev.map(task => (task._id === taskId ? res.data.task : task)));
            toast.success(checked ? "Great job! ✅" : "Task unchecked");
        } catch {
            toast.error("Failed to update");
        }
    };

    // ============================================
    // RENDER LOADING AND ERROR STATES
    // ============================================

    if (error) return <ApiError error={error} />;
    if (loader) return <Loading />;

    // ============================================
    // MAIN RENDER
    // ============================================

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 font-['Inter',sans-serif]">
            <main className="max-w-[1400px] mx-auto">
                {/* ========== HEADER SECTION ========== */}
                <motion.header
                    className="flex justify-between items-center mb-8 flex-wrap gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-800 to-indigo-600 bg-clip-text text-transparent">
                            🧠 Your Habits
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Turn consistency into your greatest strength.
                        </p>
                    </div>

                    {/* Input Section */}
                    <motion.div
                        className="flex gap-2 bg-white py-1 pl-4 pr-1 rounded-full shadow-sm border-2 border-transparent transition-all duration-300 hover:shadow-md focus-within:border-indigo-600 focus-within:shadow-indigo-100"
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            placeholder="Type a new goal..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAddTask()}
                            className="border-none outline-none w-[180px] md:w-[220px] text-sm bg-transparent text-gray-800 placeholder:text-gray-400"
                        />
                        <motion.button
                            onClick={handleAddTask}
                            className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
                            whileTap={{ scale: 0.95 }}
                        >
                            {btnLoader ? <LoaderIcon /> : <Add />}
                        </motion.button>
                    </motion.div>
                </motion.header>

                {/* ========== HABITS GRID ========== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <AnimatePresence mode="popLayout">
                        {tasks.map(task => {
                            const progress = calculateTaskProgress(task);
                            const badge = getAchievementBadge(progress);
                            const totalCompleted = task.weeks.flatMap(w => w.days).filter(d => d.checked).length;
                            const totalDays = task.weeks.flatMap(w => w.days).length;

                            return (
                                <motion.div
                                    className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200"
                                    key={task._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* ========== CARD HEADER ========== */}
                                    <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base font-bold text-gray-800 break-words">
                                                {task.title}
                                            </h3>
                                            <motion.span
                                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {progress}%
                                            </motion.span>
                                        </div>
                                        <motion.button
                                            className="bg-transparent border-none text-gray-400 cursor-pointer p-1.5 rounded-lg transition-all duration-200 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => handleDelete(task._id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Delete fontSize="small" />
                                        </motion.button>
                                    </div>

                                    {/* ========== SCROLLABLE TABLE AREA ========== */}
                                    <div className="overflow-x-auto overflow-y-visible -mx-2 px-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-indigo-200 hover:scrollbar-thumb-indigo-600">
                                        <table className="w-full min-w-[450px] md:min-w-[500px] border-separate border-spacing-1 md:border-spacing-1.5">
                                            <thead>
                                                <tr>
                                                    <th className="text-[11px] font-semibold text-gray-500 text-center pb-1.5"></th>
                                                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                                        <th key={i} className="text-[11px] font-semibold text-gray-500 text-center pb-1.5">
                                                            {d}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Map through weeks */}
                                                {task.weeks.map((week, wIndex) => (
                                                    <motion.tr
                                                        key={wIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: wIndex * 0.05 }}
                                                    >
                                                        {/* Week Label */}
                                                        <td className="text-[11px] font-bold text-indigo-600 text-center whitespace-nowrap">
                                                            W{week.weekNo}
                                                        </td>

                                                        {/* Map through days in week */}
                                                        {week.days.map((day, dIndex) => {
                                                            const missed = isMissed(day.date, day.checked);
                                                            const todayDay = isToday(day.date);
                                                            const future = isFuture(day.date);

                                                            return (
                                                                <td
                                                                    key={dIndex}
                                                                    className={todayDay ? "bg-indigo-50 rounded-xl" : ""}
                                                                >
                                                                    <div className={`relative flex justify-center items-center min-w-[32px] md:min-w-[40px] min-h-[32px] md:min-h-[40px] ${future ? "opacity-30 pointer-events-none" : ""}`}>
                                                                        <motion.label
                                                                            className="cursor-pointer relative flex items-center justify-center"
                                                                            whileTap={{ scale: 0.95 }}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={day.checked}
                                                                                disabled={future}
                                                                                onChange={e => handleCheckbox(task._id, week.weekNo, dIndex, e.target.checked)}
                                                                                className="hidden"
                                                                            />
                                                                            <span className="text-xl md:text-2xl transition-all duration-200 flex items-center justify-center">
                                                                                {day.checked ? (
                                                                                    <motion.div
                                                                                        initial={{ scale: 0, rotate: -180 }}
                                                                                        animate={{ scale: 1, rotate: 0 }}
                                                                                        transition={{ type: "spring", stiffness: 400 }}
                                                                                    >
                                                                                        <CheckCircle
                                                                                            className="text-emerald-500 drop-shadow-md"
                                                                                            size={24}
                                                                                        />
                                                                                    </motion.div>
                                                                                ) : (
                                                                                    <RadioButtonUnchecked className="text-gray-300" />
                                                                                )}
                                                                            </span>
                                                                        </motion.label>

                                                                        {/* Missed Indicator - shows red X for missed days */}
                                                                        {missed && !day.checked && !future && (
                                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] bg-red-500 rounded-full flex items-center justify-center animate-[fadeInScale_0.3s_ease-out] shadow-[0_0_0_2px_white,0_2px_4px_rgba(0,0,0,0.1)] before:content-['✕'] before:text-white before:text-[8px] md:before:text-[10px] before:font-bold" />
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* ========== CARD FOOTER WITH STATS ========== */}
                                    <motion.div
                                        className="mt-4 pt-3 border-t border-gray-200"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <AutoAwesome sx={{ fontSize: 14, color: '#4F46E5' }} />
                                                <span>{getMotivation(progress)}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* Completed stats */}
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <span>✅</span>
                                                    <span className="font-semibold text-gray-800">
                                                        {totalCompleted}/{totalDays}
                                                    </span>
                                                </div>
                                                {/* Achievement badge */}
                                                <div className="flex items-center gap-1.5 text-xs">
                                                    <span style={{ fontSize: 14 }}>{badge.icon}</span>
                                                    <span className="text-[11px] font-semibold" style={{ color: badge.color }}>
                                                        {badge.text}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* ========== EMPTY STATE ========== */}
                {tasks.length === 0 && (
                    <motion.div
                        className="text-center py-12 px-5 bg-white rounded-2xl mt-8 border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Target size={40} className="mx-auto mb-4 text-indigo-600" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No habits yet</h3>
                        <p className="text-sm text-gray-500">
                            Create your first habit above and start building consistency! 🚀
                        </p>
                    </motion.div>
                )}
            </main>

            {/* Custom animation keyframes */}
            <style>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                
                /* Custom scrollbar for better UX (optional, works with Tailwind) */
                .scrollbar-thin::-webkit-scrollbar {
                    height: 4px;
                }
                
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #F3F4F6;
                    border-radius: 10px;
                }
                
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #C7D2FE;
                    border-radius: 10px;
                }
                
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #4F46E5;
                }
            `}</style>
        </div>
    );
}

export default CreateHabitTracker;