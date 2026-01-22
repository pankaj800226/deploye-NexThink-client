import { Delete, Edit, Visibility } from "@mui/icons-material";
import Sidebar from "../../components/SideBar";
import { Button, MenuItem, TextField, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDebounce } from "../../hook/useDebounceSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import ApiError from "../../components/ApiError";

export interface TaskProps {
    _id: string;
    title: string;
    description: string; // HTML from JoditEditor
    price: number;
    category: string;
    priority: string;
    status: string;
}

const ManageTodo = () => {
    const [allTask, setAllTask] = useState<TaskProps[]>([]);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [prioritySelect, setPrioritySelect] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const debouncingSearch = useDebounce(search, 500);

    useEffect(() => {
        const controller = new AbortController()
        console.log(controller);
        
        const fetchTask = async () => {
            const token = localStorage.getItem('TOKEN');
            if (!token) return;

            try {
                setLoader(true);
                const res = await axios.get(`${api}/api/todo/getTask?page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAllTask(res.data.findTask);
                
                setTotalPage(res.data.totalPage);

            } catch (error) {
                console.log(error);
                setError("Api Fetching Error");
            } finally {
                setLoader(false);
            }
        };
        fetchTask();
        return () => controller.abort()
    }, [page]);

    const searchFilter = allTask.filter((task) =>
        task.title.toLowerCase().includes(debouncingSearch.toLowerCase()) &&
        (!categorySelect || task.category === categorySelect) &&
        (!prioritySelect || task.priority === prioritySelect)
    );

    const statusColor = (status: string) => {
        if (status === "pending") return "warning";
        if (status === "inprogress") return "info";
        if (status === "completed") return "success";
        return "default";
    };

    const priorityColor = (p: string) => {
        if (p === "High") return "#ff4d4d";
        if (p === "Medium") return "#ffb703";
        return "#4ade80";
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`${api}/api/todo/deleteTask/${id}`);
            setAllTask((prevTask) => prevTask.filter((task) => task._id !== id));
            toast.success("Task Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    if (loader) return <Loading />;
    if (error) return <ApiError error={error} />;

    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>
                <div className="todo_manage_search">
                    <TextField
                        fullWidth
                        label="Search Task"
                        sx={inputStyle}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <TextField
                        value={categorySelect}
                        onChange={(e) => setCategorySelect(e.target.value)}
                        fullWidth
                        select
                        label="Category"
                        sx={inputStyle}
                    >
                        <MenuItem value="">ALL</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Study">Study</MenuItem>
                    </TextField>

                    <TextField
                        value={prioritySelect}
                        onChange={(e) => setPrioritySelect(e.target.value)}
                        fullWidth
                        select
                        label="Priority"
                        sx={inputStyle}
                    >
                        <MenuItem value="">ALL</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </TextField>
                </div>

                <div className="todo_manage_container">
                    {searchFilter.length === 0 ? (
                        <h2 style={{ color: "#fff" }}>Task Not Found</h2>
                    ) : (
                        searchFilter.map((todo, index) => (
                            <motion.div
                                key={todo._id}
                                className="todo_card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                            >
                                <div className="todo_status">
                                    <Chip
                                        label={todo.status}
                                        size="small"
                                        color={statusColor(todo.status)}
                                    />

                                    <span
                                        className="priority"
                                        style={{ background: priorityColor(todo.priority) }}
                                    >
                                        {todo.priority}
                                    </span>
                                </div>

                                <h3 style={{ color: "#fff" }}>{todo.title}</h3>

                                {/* Render formatted description with line clamp */}
                                <Typography className="description">
                                    {todo.description.substring(0, 100)}
                                </Typography>

                                <div className="todo_action">
                                    <Link to={`/todoDetails/${todo._id}`}>
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            <Button className="edit_btn">
                                                <Visibility />
                                            </Button>
                                        </motion.div>
                                    </Link>

                                    <Link to={`/todoEdit/${todo._id}`}>
                                        <motion.div whileHover={{ scale: 1.2 }}>
                                            <Button className="edit_btn">
                                                <Edit />
                                            </Button>
                                        </motion.div>
                                    </Link>

                                    <motion.div whileHover={{ scale: 1.2 }}>
                                        <Button
                                            onClick={() => handleDeleteTask(todo._id)}
                                            className="delete_btn"
                                        >
                                            <Delete />
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
                {/* // Pagination Controls */}
                <div className="pagination_controls">
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        variant="outlined"
                    >Prev</Button>

                    <Button
                        disabled={page === totalPage}
                        onClick={() => setPage(p => p + 1)}
                        variant="outlined"
                    >Next</Button>
                </div>
            </main>
        </div>
    );
};

const inputStyle = {
    mb: 2,
    "& label": { color: "#aaa" },
    "& label.Mui-focused": { color: "#6a5af9" },
    "& .MuiOutlinedInput-root": {
        color: "#fff",
        "& fieldset": { borderColor: "#2a2f36" },
        "&:hover fieldset": { borderColor: "#6a5af9" },
        "&.Mui-focused fieldset": { borderColor: "#9a6bff" }
    }
};

export default ManageTodo;
