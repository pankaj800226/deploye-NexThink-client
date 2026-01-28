import { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar"
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
import ApiError from "../../../components/ApiError";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api/api";


const EditFeature = () => {
    const [formData, setFormData] = useState({
        title: "",
        status: "",
    })

    const [btnLoader, setBtnLoader] = useState(false)

    const token = localStorage.getItem('TOKEN')

    const [error, setError] = useState('')
    const { id } = useParams()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${api}/api/feature/featureId/${id}`)
                setFormData({
                    title: res.data.title,
                    status: res.data.status,
                })

            } catch (error) {
                console.log(error);
                setError("api fetching error")

            }
        }

        fetchProject()
    }, [])

    //project edit
    const handleEdit = async () => {

        if (!token) {
            toast.error("You are not login")
            return navigate('/login')
        }
        const { title, status } = formData

        try {
            setBtnLoader(true)

            await axios.put(`${api}/api/feature/edit/feature/${id}`, {
                title,
                status,
            })

            toast.success("Feature Edit done")
            navigate('/manageproject')
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
                                Project Edit
                            </Typography>

                            {/* <EmojiPicker /> */}
                            <TextField fullWidth label="Project Title" name="title"
                                value={formData.title}
                                onChange={handleChange}
                                sx={inputStyle} />

                            <TextField
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth select label="Status">
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="working">Working</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </TextField>

                            {/* Animate Add Todo Button */}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleEdit}
                                    startIcon={<AddTask />}
                                    sx={{
                                        mt: 3,
                                        py: 1.4,
                                        background: "linear-gradient(135deg,#6a5af9,#9a6bff)",
                                        fontWeight: "bold",
                                        borderRadius: 2
                                    }}
                                >
                                    {btnLoader ? <CircularProgress size={20} /> : "Edit Feature"}
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

export default EditFeature
