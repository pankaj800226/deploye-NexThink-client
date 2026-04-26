import { Add, AutoAwesome, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import { CheckCircle, Target } from "lucide-react";

type Day = { checked: boolean; date: string };
type Week = { weekNo: number; days: Day[] };
type Task = { _id: string; title: string; weeks: Week[] };

// Past date + unchecked = missed
const isMissed = (date: string, checked: boolean): boolean => {
    if (checked) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate < today;
};

// Aaj ka din?
const isToday = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate.getTime() === today.getTime();
};

// Future din?
const isFuture = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(date);
    dayDate.setHours(0, 0, 0, 0);
    return dayDate > today;
};

// ✅ Kya yeh week ke saare din "done" hain? (checked ya missed)
const isWeekAllDone = (week: Week): boolean => {
    return week.days.every(day => {
        if (day.checked) return true;
        return isMissed(day.date, day.checked);
    });
};

const CreateHabitTracker = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("TOKEN");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);

    // ✅ Page load pe missed weeks trigger karo
    const triggerMissedWeeks = async (fetchedTasks: Task[]) => {
        for (const task of fetchedTasks) {
            for (const week of task.weeks) {
                const allDone = isWeekAllDone(week);
                const nextWeekExists = task.weeks.some(w => w.weekNo === week.weekNo + 1);

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

    // Fetch schedulers on component mount
    useEffect(() => {
        const fetchShedular = async () => {
            try {
                setLoader(true);
                const res = await axios.get(`${api}/api/shedular/get/shedular`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fetchedTasks = res.data.schedulers;
                setTasks(fetchedTasks);
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

    // Motivation message based on progress
    const getMotivation = (percent: number) => {
        if (percent === 0) return "Every journey starts with a single check! 🌱";
        if (percent < 30) return "You're getting started, keep it up! 💪";
        if (percent < 70) return "Consistency is key. You're doing great! 🚀";
        if (percent < 100) return "So close to perfection! Don't stop! 🎯";
        return "Masterpiece! You crushed it this week! 🏆✨";
    };

    // Get achievement badge
    const getAchievementBadge = (percent: number) => {
        if (percent === 100) return { icon: "👑", text: "Perfect Week!", color: "#fbbf24" };
        if (percent >= 80) return { icon: "🔥", text: "On Fire!", color: "#f97316" };
        if (percent >= 60) return { icon: "⚡", text: "Great Progress!", color: "#6366f1" };
        if (percent >= 40) return { icon: "🌱", text: "Growing!", color: "#10b981" };
        return { icon: "🎯", text: "Keep Going!", color: "#6b7280" };
    };

    // Task progress calculate karne ka function
    const calculateTaskProgress = (task: Task) => {
        const allDays = task.weeks.flatMap(w => w.days);
        const checked = allDays.filter(d => d.checked).length;
        return allDays.length > 0 ? Math.round((checked / allDays.length) * 100) : 0;
    };

    // Task add 
    const handleAddTask = async () => {
        if (!input.trim()) return;
        setBtnLoader(true);
        const startDate = new Date();
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
            const res = await axios.post(`${api}/api/shedular/create/shedular`, newTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Scheduler created 🎉");
            setTasks(prev => [...prev, res.data.task]);
            setInput("");
        } catch (error) {
            console.log(error);
            toast.error("Error creating task");
        } finally {
            setBtnLoader(false);
        }
    };

    // delete task function
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${api}/api/shedular/delete/shedular/${id}`);
            setTasks(prev => prev.filter(s => s._id !== id));
            toast.success("Habit Deleted");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting");
        }
    };

    // checkbox toggle function
    const handleCheckbox = async (taskId: string, weekNo: number, dayIndex: number, checked: boolean) => {
        try {
            const res = await axios.put(
                `${api}/api/shedular/check`,
                { taskId, weekNo, dayIndex, checked },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks(prev => prev.map(task => (task._id === taskId ? res.data.task : task)));
            toast.success(checked ? "Great job! ✅" : "Task unchecked");
        } catch {
            toast.error("Failed to update");
        }
    };

    if (error) return <ApiError error={error} />;
    if (loader) return <Loading />;

    return (
        <div className="habit-container">
            <style>{`
                .habit-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
                    padding: 20px;
                    font-family: 'Inter', sans-serif;
                }

                .habit-content {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                /* Header Styles */
                .habit-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .habit-header h1 {
                    font-size: 28px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #1F2937, #4F46E5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0;
                }

                .habit-header p {
                    color: #6B7280;
                    margin-top: 5px;
                    font-size: 14px;
                }

                /* Input Wrapper */
                .habit-input-wrapper {
                    display: flex;
                    gap: 10px;
                    background: white;
                    padding: 4px 4px 4px 16px;
                    border-radius: 50px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .habit-input-wrapper:hover,
                .habit-input-wrapper:focus-within {
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
                    border-color: #4F46E5;
                }

                .habit-input-wrapper input {
                    border: none;
                    outline: none;
                    width: 220px;
                    font-size: 14px;
                    background: transparent;
                    color: #1F2937;
                }

                .habit-input-wrapper input::placeholder {
                    color: #9CA3AF;
                }

                .add-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: none;
                    background: linear-gradient(135deg, #4F46E5, #7C3AED);
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .add-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
                }

                /* Grid Layout */
                .habit-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                    gap: 20px;
                }

                /* Card Styles */
                .habit-card {
                    background: white;
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    border: 1px solid #E5E7EB;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .habit-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
                    border-color: #C7D2FE;
                }

                /* Card Header */
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .title-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .title-group h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1F2937;
                    word-break: break-word;
                }

                .progress-pill {
                    background: linear-gradient(135deg, #4F46E5, #7C3AED);
                    color: white;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    white-space: nowrap;
                }

                .delete-icon-btn {
                    background: transparent;
                    border: none;
                    color: #9CA3AF;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .delete-icon-btn:hover {
                    color: #EF4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                /* Scroll Area - Fix for overflow */
                .grid-scroll-area {
                    overflow-x: auto;
                    overflow-y: visible;
                    margin: 0 -8px;
                    padding: 0 8px;
                    -webkit-overflow-scrolling: touch;
                }

                /* Hide scrollbar for cleaner look */
                .grid-scroll-area::-webkit-scrollbar {
                    height: 4px;
                }

                .grid-scroll-area::-webkit-scrollbar-track {
                    background: #F3F4F6;
                    border-radius: 10px;
                }

                .grid-scroll-area::-webkit-scrollbar-thumb {
                    background: #C7D2FE;
                    border-radius: 10px;
                }

                .grid-scroll-area::-webkit-scrollbar-thumb:hover {
                    background: #4F46E5;
                }

                /* Table Styles */
                .habit-table {
                    width: 100%;
                    min-width: 500px;
                    border-collapse: separate;
                    border-spacing: 6px 3px;
                }

                .habit-table th {
                    font-size: 11px;
                    font-weight: 600;
                    color: #6B7280;
                    text-align: center;
                    padding-bottom: 6px;
                }

                .week-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #4F46E5;
                    text-align: center;
                    white-space: nowrap;
                }

                .current-day {
                    background: rgba(79, 70, 229, 0.08);
                    border-radius: 10px;
                }

                /* Cell Wrapper */
                .cell-wrapper {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 40px;
                    min-height: 40px;
                }

                .cell-wrapper.is-future {
                    opacity: 0.3;
                    pointer-events: none;
                }

                /* Checkbox Custom */
                .checkbox-custom {
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox-custom input {
                    display: none;
                }

                .check-ui {
                    font-size: 24px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox-custom:hover .check-ui {
                    transform: scale(1.1);
                }

                .icon-done {
                    color: #10B981;
                    filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
                }

                .icon-empty {
                    color: #D1D5DB;
                }

                /* Missed Indicator - Centered */
                .missed-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 18px;
                    height: 18px;
                    background: #EF4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeInScale 0.3s ease-out;
                    box-shadow: 0 0 0 2px white, 0 2px 4px rgba(0,0,0,0.1);
                }

                .missed-indicator::before {
                    content: '✕';
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                }

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

                /* Card Footer */
                .card-footer {
                    margin-top: 16px;
                    padding-top: 12px;
                    border-top: 1px solid #E5E7EB;
                }

                .footer-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .motivation-text {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #6B7280;
                }

                .stats-badges {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                }

                .stat-count {
                    font-weight: 600;
                    color: #1F2937;
                }

                .badge-text {
                    font-size: 11px;
                    font-weight: 600;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 50px 20px;
                    background: white;
                    border-radius: 20px;
                    margin-top: 30px;
                    border: 1px solid #E5E7EB;
                }

                /* ========== RESPONSIVE STYLES ========== */
                
                /* Tablet (768px - 1024px) */
                @media (max-width: 1024px) {
                    .habit-grid {
                        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
                        gap: 16px;
                    }
                }

                /* Mobile Large (600px - 768px) */
                @media (max-width: 768px) {
                    .habit-container {
                        padding: 16px;
                    }
                    
                    .habit-header {
                        flex-direction: column;
                        align-items: stretch;
                        margin-bottom: 20px;
                    }
                    
                    .habit-header h1 {
                        font-size: 24px;
                    }
                    
                    .habit-header p {
                        font-size: 13px;
                    }
                    
                    .habit-input-wrapper {
                        width: 100%;
                    }
                    
                    .habit-input-wrapper input {
                        width: 100%;
                        flex: 1;
                    }
                    
                    .habit-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    
                    .habit-card {
                        padding: 16px;
                    }
                    
                    .title-group h3 {
                        font-size: 15px;
                    }
                    
                    .progress-pill {
                        font-size: 10px;
                        padding: 2px 8px;
                    }
                    
                    .habit-table {
                        min-width: 450px;
                        border-spacing: 4px 2px;
                    }
                    
                    .cell-wrapper {
                        min-width: 36px;
                        min-height: 36px;
                    }
                    
                    .check-ui {
                        font-size: 20px;
                    }
                    
                    .missed-indicator {
                        width: 16px;
                        height: 16px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 9px;
                    }
                    
                    .footer-content {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .stats-badges {
                        width: 100%;
                        justify-content: space-between;
                    }
                }

                /* Mobile Small (480px and below) */
                @media (max-width: 480px) {
                    .habit-container {
                        padding: 12px;
                    }
                    
                    .habit-header h1 {
                        font-size: 20px;
                    }
                    
                    .habit-card {
                        padding: 14px;
                    }
                    
                    .title-group {
                        gap: 8px;
                    }
                    
                    .title-group h3 {
                        font-size: 14px;
                    }
                    
                    .progress-pill {
                        font-size: 9px;
                        padding: 2px 6px;
                    }
                    
                    .delete-icon-btn {
                        padding: 4px;
                    }
                    
                    .habit-table {
                        min-width: 380px;
                        border-spacing: 3px 2px;
                    }
                    
                    .habit-table th {
                        font-size: 9px;
                    }
                    
                    .week-label {
                        font-size: 9px;
                    }
                    
                    .cell-wrapper {
                        min-width: 32px;
                        min-height: 32px;
                    }
                    
                    .check-ui {
                        font-size: 18px;
                    }
                    
                    .missed-indicator {
                        width: 14px;
                        height: 14px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 8px;
                    }
                    
                    .motivation-text {
                        font-size: 11px;
                    }
                    
                    .stat-item {
                        font-size: 11px;
                    }
                    
                    .badge-text {
                        font-size: 10px;
                    }
                    
                    .empty-state {
                        padding: 40px 16px;
                    }
                    
                    .empty-state h3 {
                        font-size: 18px;
                    }
                    
                    .empty-state p {
                        font-size: 13px;
                    }
                }

                /* Very Small (360px and below) */
                @media (max-width: 360px) {
                    .habit-table {
                        min-width: 320px;
                        border-spacing: 2px;
                    }
                    
                    .cell-wrapper {
                        min-width: 28px;
                        min-height: 28px;
                    }
                    
                    .check-ui {
                        font-size: 16px;
                    }
                    
                    .missed-indicator {
                        width: 12px;
                        height: 12px;
                    }
                    
                    .missed-indicator::before {
                        font-size: 7px;
                    }
                    
                    .habit-table th {
                        font-size: 8px;
                    }
                    
                    .week-label {
                        font-size: 8px;
                    }
                }
            `}</style>

            <main className="habit-content">
                <motion.header
                    className="habit-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div>
                        <h1>🧠 Your Habits</h1>
                        <p>Turn consistency into your greatest strength.</p>
                    </div>

                    <motion.div
                        className="habit-input-wrapper"
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            placeholder="Type a new goal..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAddTask()}
                        />
                        <motion.button
                            onClick={handleAddTask}
                            className="add-btn"
                            whileTap={{ scale: 0.95 }}
                        >
                            {btnLoader ? <LoaderIcon /> : <Add />}
                        </motion.button>
                    </motion.div>
                </motion.header>

                <div className="habit-grid">
                    <AnimatePresence mode="popLayout">
                        {tasks.map(task => {
                            const progress = calculateTaskProgress(task);
                            const badge = getAchievementBadge(progress);
                            const totalCompleted = task.weeks.flatMap(w => w.days).filter(d => d.checked).length;
                            const totalDays = task.weeks.flatMap(w => w.days).length;

                            return (
                                <motion.div
                                    className="habit-card"
                                    key={task._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="card-header">
                                        <div className="title-group">
                                            <h3>{task.title}</h3>
                                            <motion.span
                                                className="progress-pill"
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {progress}%
                                            </motion.span>
                                        </div>
                                        <motion.button
                                            className="delete-icon-btn"
                                            onClick={() => handleDelete(task._id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Delete fontSize="small" />
                                        </motion.button>
                                    </div>

                                    <div className="grid-scroll-area">
                                        <table className="habit-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <th key={i}>{d}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {task.weeks.map((week, wIndex) => (
                                                    <motion.tr
                                                        key={wIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: wIndex * 0.05 }}
                                                    >
                                                        <td className="week-label">W{week.weekNo}</td>
                                                        {week.days.map((day, dIndex) => {
                                                            const missed = isMissed(day.date, day.checked);
                                                            const todayDay = isToday(day.date);
                                                            const future = isFuture(day.date);

                                                            return (
                                                                <td key={dIndex} className={todayDay ? "current-day" : ""}>
                                                                    <div className={`cell-wrapper ${future ? "is-future" : ""}`}>
                                                                        <motion.label
                                                                            className="checkbox-custom"
                                                                            whileTap={{ scale: 0.95 }}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={day.checked}
                                                                                disabled={future}
                                                                                onChange={e => handleCheckbox(task._id, week.weekNo, dIndex, e.target.checked)}
                                                                            />
                                                                            <span className="check-ui">
                                                                                {day.checked ? (
                                                                                    <motion.div
                                                                                        initial={{ scale: 0, rotate: -180 }}
                                                                                        animate={{ scale: 1, rotate: 0 }}
                                                                                        transition={{ type: "spring", stiffness: 400 }}
                                                                                    >
                                                                                        <CheckCircle className="icon-done" size={24} />
                                                                                    </motion.div>
                                                                                ) : (
                                                                                    <RadioButtonUnchecked className="icon-empty" />
                                                                                )}
                                                                            </span>
                                                                        </motion.label>
                                                                        {missed && !day.checked && !future && (
                                                                            <div className="missed-indicator" />
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

                                    <motion.div
                                        className="card-footer"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="footer-content">
                                            <div className="motivation-text">
                                                <AutoAwesome sx={{ fontSize: 14, color: '#4F46E5' }} />
                                                <span>{getMotivation(progress)}</span>
                                            </div>
                                            <div className="stats-badges">
                                                <div className="stat-item">
                                                    <span>✅</span>
                                                    <span className="stat-count">{totalCompleted}/{totalDays}</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span style={{ fontSize: 14 }}>{badge.icon}</span>
                                                    <span className="badge-text" style={{ color: badge.color }}>{badge.text}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {tasks.length === 0 && (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Target size={40} style={{ margin: '0 auto 15px', color: '#4F46E5' }} />
                        <h3>No habits yet</h3>
                        <p>Create your first habit above and start building consistency! 🚀</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default CreateHabitTracker;