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
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiError from "../../components/ApiError";

// Animation Variants
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

const CreateTodo = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Work",
        priority: "Medium",
        status: "pending",
    });
    const [btnLoader, setBtnLoader] = useState(false);
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateTodo = async () => {
        if (!formData.title) return toast.error("Please add a title");
        try {
            setBtnLoader(true);
            await axios.post(`${api}/api/todo/createTodo`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Page added to Workspace");
            navigate('/managetodo');
        } catch (err) {
            setError("Api error");
        } finally {
            setBtnLoader(false);
        }
    };

    if (error) return <ApiError error={error} />;

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
                    {/* Meta Actions with Hover Motion */}
                    <motion.div className="notion_meta_bar" variants={itemVars}>
                        <motion.span whileHover={{ backgroundColor: "#1A1F24" }} className="meta_item">
                            <InsertEmoticon fontSize="inherit" /> Add icon
                        </motion.span>
                        <motion.span whileHover={{ backgroundColor: "#1A1F24" }} className="meta_item">
                            <AutoAwesome fontSize="inherit" /> Add cover
                        </motion.span>
                    </motion.div>

                    {/* Title Motion */}
                    <motion.div variants={itemVars}>
                        <input
                            type="text"
                            name="title"
                            className="notion_title_input"
                            placeholder="Untitled Task"
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                        />
                    </motion.div>

                    {/* Properties Staggered Motion */}
                    <motion.div className="notion_property_grid" variants={itemVars}>
                        {[
                            { label: "Status", icon: <PushPin />, name: "status", options: ["pending", "inprogress", "completed"] },
                            { label: "Priority", icon: <SignalCellularAlt />, name: "priority", options: ["Low", "Medium", "High"] },
                            { label: "Category", icon: <Layers />, name: "category", options: ["Work", "Personal", "Study", "Other"] }
                        ].map((prop, idx) => (
                            <motion.div 
                                key={idx} 
                                className="property_row"
                                whileHover={{ backgroundColor: "#1A1F24" }}
                            >
                                <label>{prop.icon} {prop.label}</label>
                                <TextField 
                                    select 
                                    name={prop.name} 
                                    value={(formData as any)[prop.name]} 
                                    onChange={handleChange} 
                                    variant="standard" 
                                    InputProps={{ disableUnderline: true }} 
                                    className="notion_select"
                                >
                                    {prop.options.map(opt => (
                                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                    ))}
                                </TextField>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.06)' }} />
                    </motion.div>

                    {/* Editor Motion */}
                    <motion.div variants={itemVars} style={{ width: '100%' }}>
                        <textarea
                            name="description"
                            className="notion_editor"
                            placeholder="Type '/' for commands..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Floating Button Motion */}
                    <motion.div 
                        className="notion_fixed_actions"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleCreateTodo}
                                className="notion_primary_btn"
                                disabled={btnLoader}
                            >
                                {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Save Task"}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

export default CreateTodo;