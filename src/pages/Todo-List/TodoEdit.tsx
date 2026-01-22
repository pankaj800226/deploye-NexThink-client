import Sidebar from "../../components/SideBar";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper
} from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ApiError from "../../components/ApiError";

const TodoEdit = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        priority: "",
        status: "",
        createdAt: new Date().toISOString()
    })

    const [btnLoader, setBtnLoader] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const fetchTaskID = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${api}/api/todo/getTaskId/${id}`)
                setFormData({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    price: res.data.price || "",
                    category: res.data.category || "",
                    priority: res.data.priority || "",
                    status: res.data.status || "",
                    createdAt: res.data.createdAt || new Date().toISOString()
                });

            } catch (error) {
                console.log(error);
                setError("Api fetching error")

            } finally {
                setLoading(false)
            }
        }

        fetchTaskID()
    }, [id])

    // handle edit 
    const handleEdit = async () => {
        const { title, description, price, category, priority, status } = formData

        try {
            setBtnLoader(true)
            await axios.put(`${api}/api/todo/editTodo/${id}`, {
                title, description, price, category, priority, status
            })

            toast.success("Todo updated successfully")
            navigate('/managetodo')

        } catch (error) {
            console.log(error);
            toast.error("Error while editing todo")

        } finally {
            setBtnLoader(false)
        }
    }

    if (error) return <ApiError error={error} />
    if (loading) return <Loading />



    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            // width: 460,
                            padding: 4,
                            borderRadius: 3,
                            background: "#151a1f"
                        }}
                    >
                        <Typography
                            variant="h5"
                            mb={3}
                            textAlign="center"
                            color="#fff"
                            fontWeight="bold"
                        >
                            Edit Todo
                        </Typography>

                        <TextField
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth label="Title" name="title" sx={inputStyle} />

                        <TextField
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth type="number" label="Price" name="price" sx={inputStyle} />

                        <TextField
                            value={formData.category}
                            onChange={handleChange}
                            fullWidth select label="Category" name="category" sx={inputStyle}>
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Study">Study</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField
                            value={formData.priority}
                            onChange={handleChange}

                            fullWidth select label="Priority" name="priority" sx={inputStyle}>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </TextField>

                        <TextField
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth select label="Status" name="status" sx={inputStyle}>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inprogress">In Progress</MenuItem>
                            <MenuItem value="completed">completed</MenuItem>
                        </TextField>

                        <TextField
                            value={formData.description}
                            onChange={handleChange}

                            fullWidth multiline rows={9} label="Description" name="description" sx={inputStyle} />

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddTask />}
                            onClick={handleEdit}
                            sx={{
                                mt: 3,
                                py: 1.4,
                                background: "linear-gradient(135deg,#6a5af9,#9a6bff)",
                                fontWeight: "bold",
                                borderRadius: 2
                            }}
                        >
                            {btnLoader ? "Loading..." : " Edit Todo"}
                        </Button>
                    </Paper>
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

export default TodoEdit;
