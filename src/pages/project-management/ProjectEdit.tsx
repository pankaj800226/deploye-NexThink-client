import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar"
import { motion } from 'framer-motion'
import {
    Button,
    MenuItem,
    TextField,
    Divider,
    CircularProgress
} from "@mui/material";
import { 
    InsertEmoticon, 
    AutoAwesome, 
    CalendarToday, 
    EventAvailable, 
    Category, 
    Flag 
} from "@mui/icons-material";
import toast from "react-hot-toast";
import ApiError from "../../components/ApiError";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/api";
import Loading from "../../components/Loading";

// Same Motion Variants for consistency
const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Inline Style for Date Inputs
const dateInputStyle = {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#FFFFFF",
    fontSize: "0.9rem",
    padding: "4px 8px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "inherit",
    borderRadius: "4px",
    transition: "background 0.2s"
};

const ProjectEdit = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
    })

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [btnLoader, setBtnLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('TOKEN')

    // Fetch project details
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${api}/api/project/projectId/${id}`)
                setFormData({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    category: res.data.category || "",
                    priority: res.data.priority || "",
                })
                setStartDate(res.data.startDate || "")
                setEndDate(res.data.endDate || "")
            } catch (err) {
                console.log(err);
                setError("Failed to fetch project details")
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleProject = async () => {
        if (!token) {
            toast.error("You are not logged in")
            return navigate('/login')
        }

        const { title, description, category, priority } = formData
        if (!title || !description || !category || !priority || !startDate || !endDate) {
            return toast.error("All fields are required")
        }

        try {
            setBtnLoader(true)
            await axios.put(`${api}/api/project/edit/project/${id}`, {
                ...formData,
                startDate,
                endDate
            })
            toast.success("Project updated successfully")
            navigate('/manageproject')
        } catch (err) {
            setError("API fetching error")
            toast.error("Update failed")
        } finally {
            setBtnLoader(false)
        }
    }

    if (error) return <ApiError error={error} />
    if (loading) return <Loading />

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
                    <motion.div className="notion_meta_bar" variants={itemVars}>
                        <span className="meta_item"><InsertEmoticon fontSize="inherit" /> Change icon</span>
                        <span className="meta_item"><AutoAwesome fontSize="inherit" /> Reposition cover</span>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <input
                            type="text"
                            name="title"
                            className="notion_title_input"
                            placeholder="Project Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </motion.div>

                    <motion.div className="notion_property_grid" variants={itemVars}>
                        
                        <div className="property_row">
                            <label><CalendarToday fontSize="inherit" /> Start Date</label>
                            <input 
                                type="date" 
                                style={dateInputStyle}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                onFocus={(e) => (e.target.style.backgroundColor = "#1A1F24")}
                                onBlur={(e) => (e.target.style.backgroundColor = "transparent")}
                            />
                        </div>

                        <div className="property_row">
                            <label><EventAvailable fontSize="inherit" /> End Date</label>
                            <input 
                                type="date" 
                                style={dateInputStyle}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                onFocus={(e) => (e.target.style.backgroundColor = "#1A1F24")}
                                onBlur={(e) => (e.target.style.backgroundColor = "transparent")}
                            />
                        </div>

                        <div className="property_row">
                            <label><Category fontSize="inherit" /> Project Type</label>
                            <TextField 
                                select name="category" value={formData.category} 
                                onChange={handleChange} variant="standard" 
                                InputProps={{ disableUnderline: true }} className="notion_select"
                            >
                                <MenuItem value="software">Software Development</MenuItem>
                                <MenuItem value="design">Design</MenuItem>
                                <MenuItem value="marketing">Marketing</MenuItem>
                                <MenuItem value="testing">Testing / QA</MenuItem>
                            </TextField>
                        </div>

                        <div className="property_row">
                            <label><Flag fontSize="inherit" /> Priority</label>
                            <TextField 
                                select name="priority" value={formData.priority} 
                                onChange={handleChange} variant="standard" 
                                InputProps={{ disableUnderline: true }} className="notion_select"
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVars}>
                        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.06)' }} />
                    </motion.div>

                    <motion.div variants={itemVars} style={{ width: '100%' }}>
                        <textarea
                            name="description"
                            className="notion_editor"
                            placeholder="Edit project description..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* Fixed Save Button Top-Right */}
                    <div className="notion_fixed_actions">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleProject}
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
    )
}

export default ProjectEdit;