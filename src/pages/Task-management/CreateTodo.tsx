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
import { motion,type Variants } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiError from "../../components/ApiError";

// Animation Variants
const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, staggerChildren: 0.1 }
    }
};

const itemVars: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const CreateTodo = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
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
        if (!formData.title || !formData.description) return toast.error("Title and description are required");
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
        <div className="min-h-screen bg-white text-[#37352f]">
            {/* Minimal Header Space */}
            <div className="h-12 w-full bg-white flex items-center px-4 justify-between sticky top-0 z-50">
                <span className="text-sm font-medium text-gray-400">Workspace / New Task</span>
                <Button
                    onClick={handleCreateTodo}
                    disabled={btnLoader}
                    className="!text-[#2383e2] !text-sm !font-bold !capitalize !px-3 hover:!bg-gray-50"
                >
                    {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Done"}
                </Button>
            </div>

            <main className="max-w-[800px] mx-auto px-10 pt-16 pb-32">
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Meta Actions - Hover appearance like Notion */}
                    <motion.div className="flex gap-2 mb-4 opacity-0 hover:opacity-100 transition-opacity duration-300" variants={itemVars}>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                            <InsertEmoticon className="!text-lg" /> Add icon
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                            <AutoAwesome className="!text-lg" /> Add cover
                        </button>
                    </motion.div>

                    {/* Notion Title */}
                    <motion.div variants={itemVars}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Untitled Task"
                            className="w-full text-5xl font-bold border-none outline-none placeholder:text-gray-200 text-[#37352f] tracking-tight mb-8"
                            value={formData.title}
                            onChange={handleChange}
                            autoFocus
                        />
                    </motion.div>

                    {/* Notion Property Grid */}
                    <motion.div className="space-y-1 mb-10" variants={itemVars}>
                        {[
                            { label: "Status", icon: <PushPin />, name: "status", options: ["pending", "inprogress", "completed"] },
                            { label: "Priority", icon: <SignalCellularAlt />, name: "priority", options: ["Low", "Medium", "High"] },
                            { label: "Category", icon: <Layers />, name: "category", options: ["Work", "Personal", "Study", "Other"] }
                        ].map((prop, idx) => (
                            <div key={idx} className="flex items-center group min-h-[34px]">
                                <label className="w-32 flex items-center gap-2 text-sm text-gray-500 font-normal shrink-0">
                                    <span className="opacity-70">{prop.icon}</span> {prop.label}
                                </label>
                                <div className="flex-1">
                                    <TextField
                                        select
                                        name={prop.name}
                                        value={(formData as any)[prop.name]}
                                        onChange={handleChange}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        className="!w-full hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                                        sx={{
                                            '& .MuiSelect-select': {
                                                paddingTop: '2px !important',
                                                paddingBottom: '2px !important',
                                                fontSize: '14px',
                                                color: '#37352f'
                                            }
                                        }}
                                    >
                                        {prop.options.map(opt => (
                                            <MenuItem key={opt} value={opt} className="!text-sm !py-2">{opt}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <Divider className="!mb-8 !border-gray-100" />

                    {/* Editor Space */}
                    <motion.div variants={itemVars} className="relative group">
                        <textarea
                            name="description"
                            placeholder="Press Enter to start writing..."
                            className="w-full min-h-[300px] text-[16px] leading-[1.6] text-[#37352f] border-none outline-none resize-none placeholder:text-gray-300 bg-transparent"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </motion.div>
                </motion.div>
            </main>

            {/* Quick Action Floating Bar */}
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.05)] z-50"
            >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Autosave on</span>
                <div className="h-4 w-[1px] bg-gray-200" />
                <Button
                    onClick={handleCreateTodo}
                    disabled={btnLoader}
                    className="!bg-[#2383e2] !text-white !normal-case !text-sm !font-bold !px-6 !py-1.5 !rounded-lg hover:!bg-[#1b66b1] transition-all"
                >
                    {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Publish Page"}
                </Button>
            </motion.div>
        </div>
    );
};

export default CreateTodo;