import Sidebar from "../../components/SideBar";
import {
    Button,
    MenuItem,
    TextField,
    CircularProgress,
    Divider,
} from "@mui/material";
import { 
    InsertEmoticon, 
    PushPin, 
    SignalCellularAlt, 
    Layers, 
    AutoAwesome 
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";

// Same Motion Variants as Create Page
const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.1 } 
    }
};

const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const TodoEdit = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Work",
        priority: "Medium",
        status: "pending",
    });

    const [btnLoader, setBtnLoader] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch Task Data on Load
    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${api}/api/todo/getTaskId/${id}`);
                setFormData({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    price: res.data.price || "",
                    category: res.data.category || "",
                    priority: res.data.priority || "",
                    status: res.data.status || "",
                });
            } catch (err) {
                setError("Failed to fetch task data");
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = async () => {
        if (!formData.title) return toast.error("Title cannot be empty");
        try {
            setBtnLoader(true);
            await axios.put(`${api}/api/todo/editTodo/${id}`, formData);
            toast.success("Changes saved to Workspace");
            navigate('/managetodo');
        } catch (err) {
            toast.error("Error updating todo");
        } finally {
            setBtnLoader(false);
        }
    };

    if (error) return <ApiError error={error} />;
    if (loading) return <Loading />;

    return (
        <div className="dashboard_container">
            <Sidebar />
            <main className="notion_canvas">
                <div className="notion_top_gradient" />

                <motion.div 
                    className="notion_document"
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Same Meta Actions */}
                    <motion.div className="notion_meta_bar" variants={itemVars}>
                        <span className="meta_item"><InsertEmoticon fontSize="inherit" /> Change icon</span>
                        <span className="meta_item"><AutoAwesome fontSize="inherit" /> Update cover</span>
                    </motion.div>

                    {/* Same Title Input */}
                    <motion.div variants={itemVars}>
                        <input
                            type="text"
                            name="title"
                            className="notion_title_input"
                            placeholder="Untitled Task"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Same Notion Property Grid */}
                    <motion.div className="notion_property_grid" variants={itemVars}>
                        <div className="property_row">
                            <label><PushPin fontSize="inherit" /> Status</label>
                            <TextField select name="status" value={formData.status} onChange={handleChange} variant="standard" InputProps={{ disableUnderline: true }} className="notion_select">
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="inprogress">In Progress</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </TextField>
                        </div>

                        <div className="property_row">
                            <label><SignalCellularAlt fontSize="inherit" /> Priority</label>
                            <TextField select name="priority" value={formData.priority} onChange={handleChange} variant="standard" InputProps={{ disableUnderline: true }} className="notion_select">
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>
                        </div>

                        <div className="property_row">
                            <label><Layers fontSize="inherit" /> Category</label>
                            <TextField select name="category" value={formData.category} onChange={handleChange} variant="standard" InputProps={{ disableUnderline: true }} className="notion_select">
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Study">Study</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.06)' }} />
                    </motion.div>

                    {/* Same Editor Area */}
                    <motion.div variants={itemVars} style={{ width: '100%' }}>
                        <textarea
                            name="description"
                            className="notion_editor"
                            placeholder="Task description..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Same Fixed Action Button */}
                    <div className="notion_fixed_actions">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleEdit}
                                className="notion_primary_btn"
                                disabled={btnLoader}
                            >
                                {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Save Changes"}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default TodoEdit;