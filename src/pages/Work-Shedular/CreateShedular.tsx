import { Add, Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import { Button } from "@mui/material";

type Day = { checked: boolean; date: string };
type Week = { weekNo: number; days: Day[] };
type Task = { _id: string; title: string; weeks: Week[] };

export default function HabitTracker() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("TOKEN");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState(false)

    useEffect(() => {
        const fetchShedular = async () => {
            try {
                setLoader(true);
                const res = await axios.get(`${api}/api/shedular/get/shedular`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data.schedulers);
            } catch (error) {
                console.log(error);
                setError("API fetch error");
            } finally {
                setLoader(false);
            }
        };
        fetchShedular();
    }, [token]);

    const createWeek = (startDate: Date, weekNo: number): Week => {
        const daysArray: Day[] = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            return { checked: false, date: d.toISOString() };
        });
        return { weekNo, days: daysArray };
    };

    // handleAddTAsk
    const handleAddTask = async () => {
        if (!input.trim()) return;
        const newTask = {
            title: input.trim(),
            weeks: [createWeek(new Date(), 1)],
        };

        try {
            const res = await axios.post(
                `${api}/api/shedular/create/shedular`,
                newTask,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Scheduler submitted");
            setTasks(prev => [...prev, res.data.task]);
            setInput("");
        } catch (error) {
            console.log(error);
            toast.error("Error creating task");
            setError("API fetch error");
        } finally {
            setBtnLoader(false)
        }
    };

    // toggle check tick
    const toggleCheck = async (
        taskId: string,
        weekNo: number,
        dayIndex: number,
        checked: boolean
    ) => {
        try {
            const res = await axios.put(
                `${api}/api/shedular/check`,
                { taskId, weekNo, dayIndex, checked },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTasks(prev =>
                prev.map(task => (task._id === taskId ? res.data.task : task))
            );
        } catch {
            toast.error("Failed to update");
            setError("API fetch error");
        }
    };

    // delete shedular
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${api}/api/shedular/delete/shedular/${id}`)
            setTasks((prev) => prev.filter((s) => s._id !== id))

            toast.success("Sheduler Deleted")
        } catch (error) {
            console.log(error);
            toast.error("error")

        }
    }

    if (error) return <ApiError error={error} />;
    if (loader) return <Loading />;

    return (
        <div className="habit-wrapper">
            {/* Input field */}
            <div className="habit-input">
                <input
                    placeholder="Enter Daily Task"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={handleAddTask}>
                    {btnLoader ? 'Loading...' : <Add />}
                </button>
            </div>

            {/* Scheduler list with motion */}
            <AnimatePresence>
                {tasks.length === 0 ? (
                    <motion.h2
                        key="no-task"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        Scheduler Not Yet
                    </motion.h2>
                ) : (
                    tasks.map(task => (
                        <motion.div
                            className="task-box"
                            key={task._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <h2>{task.title}</h2>

                                <Button onClick={() => handleDelete(task._id)}>
                                    <Delete sx={{ color: "red" }} />
                                </Button>

                            </div>

                            <table className="habit-table">
                                <thead>
                                    <tr>
                                        <th>Week / Month</th>
                                        {Array.from({ length: 7 }).map((_, i) => (
                                            <th key={i}>Day {i + 1}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {task.weeks.map((week, wIndex) => {
                                        const month = new Date(week.days[0].date).toLocaleString(
                                            "default",
                                            { month: "long" }
                                        );
                                        return (
                                            <tr key={wIndex}>
                                                <td>
                                                    Week {week.weekNo} <br />
                                                    <span>{month}</span>
                                                </td>
                                                {week.days.map((day, dIndex) => (
                                                    <td key={dIndex}>
                                                        <label
                                                            className={`check-label ${day.checked ? "checked" : ""
                                                                }`}
                                                        >
                                                            <motion.input
                                                                type="checkbox"
                                                                checked={day.checked}
                                                                onChange={e =>
                                                                    toggleCheck(
                                                                        task._id,
                                                                        week.weekNo,
                                                                        dIndex,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                                whileTap={{ scale: 1.2 }}
                                                            />
                                                            <span></span>
                                                        </label>
                                                        <div className="date-label">
                                                            {new Date(day.date).getDate()}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
}
