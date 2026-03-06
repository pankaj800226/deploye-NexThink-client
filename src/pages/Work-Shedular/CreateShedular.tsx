import { Add, AutoAwesome, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import { CheckCircle } from "lucide-react";

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

export default function HabitTracker() {
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

                // Week ke saare din done hain?
                const allDone = isWeekAllDone(week);

                // Next week already exist karta hai?
                const nextWeekExists = task.weeks.some(w => w.weekNo === week.weekNo + 1);

                // Agar saare done hain aur next week nahi hai → backend trigger karo
                if (allDone && !nextWeekExists) {
                    try {
                        // Last day ko trigger karo (index 6) — backend new week banayega
                        const res = await axios.put(
                            `${api}/api/shedular/check`,
                            {
                                taskId: task._id,
                                weekNo: week.weekNo,
                                dayIndex: 6,
                                checked: week.days[6].checked // same value rakhna, sirf trigger
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        // Updated task set karo
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

                // ✅ Fetch ke baad missed weeks check karo
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
        if (percent === 0) return "Every journey starts with a single check!";
        if (percent < 30) return "You're getting started, keep it up!";
        if (percent < 70) return "Consistency is key. You're doing great!";
        if (percent < 100) return "So close to perfection! Don't stop.";
        return "Masterpiece! You crushed it this week! 🏆";
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
            toast.success("Scheduler created");
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
            toast.success("Sheduler Deleted");
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
        } catch {
            toast.error("Failed to update");
        }
    };

    if (error) return <ApiError error={error} />;
    if (loader) return <Loading />;

    return (
        <div className="habit-container">
            <main className="habit-content">
                <header className="habit-header">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1>🧠 Your Habits</h1>
                        <p>Turn consistency into your greatest strength.</p>
                    </motion.div>

                    <div className="habit-input-wrapper">
                        <input
                            placeholder="Type a new goal..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAddTask()}
                        />
                        <button onClick={handleAddTask} className="add-btn">
                            {btnLoader ? <LoaderIcon /> : <Add />}
                        </button>
                    </div>
                </header>

                <div className="habit-grid">
                    <AnimatePresence mode="popLayout">
                        {tasks.map(task => {
                            const progress = calculateTaskProgress(task);
                            return (
                                <motion.div
                                    className="habit-card"
                                    key={task._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="card-header">
                                        <div className="title-group">
                                            <h3>{task.title}</h3>
                                            <span className="progress-pill">{progress}%</span>
                                        </div>
                                        <button className="delete-icon-btn" onClick={() => handleDelete(task._id)}>
                                            <Delete fontSize="inherit" />
                                        </button>
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
                                                    <tr key={wIndex}>
                                                        <td className="week-label">W{week.weekNo}</td>
                                                        {week.days.map((day, dIndex) => {
                                                            const missed = isMissed(day.date, day.checked);
                                                            const todayDay = isToday(day.date);
                                                            const future = isFuture(day.date);

                                                            return (
                                                                <td key={dIndex} className={todayDay ? "current-day" : ""}>
                                                                    <div className={`cell-wrapper ${future ? "is-future" : ""}`}>
                                                                        <label className="checkbox-custom">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={day.checked}
                                                                                disabled={future}
                                                                                onChange={e => handleCheckbox(task._id, week.weekNo, dIndex, e.target.checked)}
                                                                            />
                                                                            <span className="check-ui">
                                                                                {day.checked ? <CheckCircle className="icon-done" /> : <RadioButtonUnchecked className="icon-empty" />}
                                                                            </span>
                                                                        </label>
                                                                        {missed && !day.checked && <div className="missed-indicator" />}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="card-footer">
                                        <AutoAwesome sx={{ fontSize: 16, color: '#818cf8' }} />
                                        <span>{getMotivation(progress)}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}