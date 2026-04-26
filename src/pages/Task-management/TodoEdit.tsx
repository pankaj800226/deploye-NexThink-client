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
    AutoAwesome,
    ArrowBackIosNew
} from "@mui/icons-material";
import { motion,type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";

// Professional Motion Variants
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
        <div className="min-h-screen bg-white text-[#37352f]">
            {/* Top Navigation Strip */}
            <div className="h-12 w-full bg-white flex items-center px-4 justify-between sticky top-0 z-50 border-b border-gray-50">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ArrowBackIosNew fontSize="small" />
                    </button>
                    <span className="text-sm font-medium text-gray-400">Workspace / Edit Mode</span>
                </div>
                <Button
                    onClick={handleEdit}
                    disabled={btnLoader}
                    className="!text-[#2383e2] !text-sm !font-bold !capitalize !px-3 hover:!bg-gray-50"
                >
                    {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Save Changes"}
                </Button>
            </div>

            <main className="max-w-[800px] mx-auto px-10 pt-16 pb-32">
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Hover Actions Bar */}
                    <motion.div className="flex gap-2 mb-4 opacity-0 hover:opacity-100 transition-opacity duration-300" variants={itemVars}>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                            <InsertEmoticon className="!text-lg" /> Change icon
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded text-sm transition-colors">
                            <AutoAwesome className="!text-lg" /> Update cover
                        </button>
                    </motion.div>

                    {/* Title Input */}
                    <motion.div variants={itemVars}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Untitled Task"
                            className="w-full text-5xl font-bold border-none outline-none placeholder:text-gray-200 text-[#37352f] tracking-tight mb-8 bg-transparent"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Property Grid System */}
                    <motion.div className="space-y-1 mb-10" variants={itemVars}>
                        {[
                            { label: "Status", icon: <PushPin />, name: "status", options: ["pending", "inprogress", "completed"] },
                            { label: "Priority", icon: <SignalCellularAlt />, name: "priority", options: ["Low", "Medium", "High"] },
                            { label: "Category", icon: <Layers />, name: "category", options: ["Work", "Personal", "Study", "Other"] }
                        ].map((prop, idx) => (
                            <div key={idx} className="flex items-center group min-h-[34px]">
                                <label className="w-32 flex items-center gap-2 text-sm text-gray-400 font-normal shrink-0">
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

                    <Divider className="!mb-8 !border-gray-50" />

                    {/* Editor Content Area */}
                    <motion.div variants={itemVars} className="relative">
                        <textarea
                            name="description"
                            placeholder="Start editing your description..."
                            className="w-full min-h-[400px] text-[17px] leading-[1.6] text-[#37352f] border-none outline-none resize-none placeholder:text-gray-300 bg-transparent"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Floating Save Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50"
                    >
                        <div className="flex flex-col pr-4 border-r border-gray-100">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Editing Mode</span>
                            <span className="text-[11px] text-indigo-500 font-medium">Ready to sync</span>
                        </div>
                        <Button
                            onClick={handleEdit}
                            disabled={btnLoader}
                            className="!bg-[#2383e2] !text-white !normal-case !text-sm !font-bold !px-8 !py-2 !rounded-lg hover:!bg-[#1b66b1] transition-all shadow-md shadow-blue-100"
                        >
                            {btnLoader ? <CircularProgress size={16} color="inherit" /> : "Update Workspace"}
                        </Button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

export default TodoEdit;