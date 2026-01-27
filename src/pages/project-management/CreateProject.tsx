import { useState } from "react";
import Sidebar from "../../components/SideBar"
import { motion } from 'framer-motion'
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
    CircularProgress
} from "@mui/material";
import { AddTask } from "@mui/icons-material";
import toast from "react-hot-toast";
import ApiError from "../../components/ApiError";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/api";


const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
    })

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [btnLoader, setBtnLoader] = useState(false)

    const token = localStorage.getItem('TOKEN')

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const navigate = useNavigate()

    // create project
    const handleProject = async () => {

        if (!token) {
            toast.error("You are not login")
            return navigate('/login')
        }
        const { title, description, category, priority } = formData

        if (!title || !description || !category || !priority || !startDate || !endDate) {
            return toast.error("all field are required")
        }

        try {
            setBtnLoader(true)

            await axios.post(`${api}/api/project/create/project`, {
                title,
                description,
                category,
                priority,
                startDate,
                endDate
            }, {
                headers: { Authorization: `Bearer ${token}` }

            })

            toast.success("Project Created done")
        } catch (error) {
            setError("api fetching error")
            console.log(error);
            toast.error("error")

        } finally {
            setBtnLoader(false)
        }


    }

    if (error) return <ApiError error={error} />


    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>

                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {/* Animate Paper card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                padding: 4,
                                borderRadius: 3,
                                background: "#151a1f",
                                minWidth: 400
                            }}
                        >
                            <Typography
                                variant="h5"
                                mb={3}
                                textAlign="center"
                                color="#fff"
                                fontWeight="bold"
                            >
                                Create Project
                            </Typography>


                            {/* <EmojiPicker /> */}
                            <TextField fullWidth label="Project Title" name="title"
                                value={formData.title}
                                onChange={handleChange}
                                sx={inputStyle} />

                            <TextField fullWidth type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                sx={inputStyle} />

                            <TextField fullWidth type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                sx={inputStyle} />

                            <TextField
                                fullWidth
                                select
                                label="Project Type"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                sx={inputStyle}
                            >
                                <MenuItem value="software">Software Development</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="design">Design</MenuItem>
                                <MenuItem value="marketing">Marketing</MenuItem>
                                <MenuItem value="testing">Testing / QA</MenuItem>
                                <MenuItem value="research">Research</MenuItem>
                                <MenuItem value="maintenance">Maintenance</MenuItem>
                            </TextField>


                            <TextField fullWidth select label="Priority" name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                sx={inputStyle}>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>


                            <TextField fullWidth multiline rows={9} label="Description" name="description"
                                value={formData.description}
                                onChange={handleChange}
                                sx={inputStyle}
                            >

                            </TextField>



                            {/* Animate Add Todo Button */}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleProject}
                                    startIcon={<AddTask />}
                                    sx={{
                                        mt: 3,
                                        py: 1.4,
                                        background: "linear-gradient(135deg,#6a5af9,#9a6bff)",
                                        fontWeight: "bold",
                                        borderRadius: 2
                                    }}
                                >
                                    {btnLoader ? <CircularProgress size={20} /> : "Create Project"}
                                </Button>
                            </motion.div>
                        </Paper>
                    </motion.div>
                </Box>
            </main>
        </div>
    )
}

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

export default CreateProject
