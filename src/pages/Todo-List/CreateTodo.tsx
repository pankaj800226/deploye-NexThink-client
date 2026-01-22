import Sidebar from "../../components/SideBar";
// import EmojiPicker from 'emoji-picker-react'

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
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiError from "../../components/ApiError";

const CreateTodo = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        priority: "",
        status: "",
        createdAt: new Date().toISOString()
    })
    const [btnLoader, setBtnLoader] = useState(false)
    const token = localStorage.getItem('TOKEN')
    const navigate = useNavigate()
    const [error, setError] = useState('')
    // const [showEmoji, setShowEmoji] = useState(false);






    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreateTodo = async () => {
        const { title, description, price, category, priority, status } = formData

        if (!token) {
            toast.error("You are not login")
            return navigate('/login')
        }

        if (!title || !description || !category || !priority || !status) {
            return toast("All field are required")
        }

        try {
            setBtnLoader(true)

            await axios.post(`${api}/api/todo/createTodo`, {
                title,
                description,
                price,
                category,
                priority,
                status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            toast.success("Task Create Sucessfully! 📩 Check Your Email!")
            navigate('/managetodo')


        } catch (error) {
            console.log(error);
            toast.error("Error creating todo")
            setError("Api fetching error")

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
                                Create New Todo
                            </Typography>

                        
                            {/* <EmojiPicker /> */}
                            <TextField fullWidth label="Title" name="title"
                                value={formData.title}
                                onChange={handleChange}
                                sx={inputStyle} />

                            <TextField fullWidth type="number" label="Price (optional)" name="price"
                                value={formData.price}
                                onChange={handleChange}
                                sx={inputStyle} />

                            <TextField fullWidth select label="Category" name="category"
                                value={formData.category}
                                onChange={handleChange}
                                sx={inputStyle}>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Study">Study</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>

                            <TextField fullWidth select label="Priority" name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                sx={inputStyle}>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>

                            <TextField fullWidth select label="Status" name="status"
                                value={formData.status}
                                onChange={handleChange}
                                sx={inputStyle}>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="inprogress">In Progress</MenuItem>
                                <MenuItem value="completed">completed</MenuItem>
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
                                    onClick={handleCreateTodo}
                                    variant="contained"
                                    startIcon={<AddTask />}
                                    sx={{
                                        mt: 3,
                                        py: 1.4,
                                        background: "linear-gradient(135deg,#6a5af9,#9a6bff)",
                                        fontWeight: "bold",
                                        borderRadius: 2
                                    }}
                                >
                                    {btnLoader ? <CircularProgress size={20} /> : "Add Todo"}
                                </Button>
                            </motion.div>
                        </Paper>
                    </motion.div>
                </Box>
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

export default CreateTodo;
