import { Button, MenuItem } from "@mui/material"
import Sidebar from "../../components/SideBar"
import { Upload } from "@mui/icons-material"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import ProjectFeature from "./feature/ProjectFeature";
import toast from "react-hot-toast";
import CoverImg from "../Analyze/CoverImg";

interface Project {
    _id: string
    title: string
    category: string
    priority: string
    status: string
    startDate: string
    endDate: string
    description: string
}



const ProjectDetails = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [projectDetails, setProjectDetails] = useState<Project | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams<{ id: string }>(); const [title, setTitle] = useState('')
    const [status, setStatus] = useState("pending");
    const [btnLoader, setBtnLoader] = useState(false)
    const token = localStorage.getItem('TOKEN')
    const [refreshFeature, setRefreshFeature] = useState(false)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true)

                const res = await axios.get(`${api}/api/project/projectId/${id}`)
                setProjectDetails(res.data)

            } catch (error) {
                console.log(error);
                setError("api fetching error")

            } finally {
                setLoading(false)
            }
        }

        fetchProject()
    }, [])

    const priorityColor = (priority?: Project["priority"]): string => {
        switch (priority) {
            case "High":
                return "#ff4d4d";
            case "Medium":
                return "#ffb703";
            case "Low":
                return "#6025c7";
            default:
                return "#4ade80";
        }
    };

    // handle upload feature 
    const handleUploadFeature = async () => {
        try {
            setBtnLoader(true)
            const response = await axios.post(`${api}/api/feature/create/feature/${id}`, {
                title, status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                toast(`!Feature create Done.`, {
                    duration: 2000,
                    position: "bottom-right",
                    icon: "👏",
                    iconTheme: {
                        primary: "#000",
                        secondary: "#fff",
                    },
                    ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                    },
                });
                setRefreshFeature(prev => !prev)
            }

            setEditDialogOpen(false)

        } catch (error) {
            console.log(error);
            toast.error('error')
        } finally {
            setBtnLoader(false)
        }

        setTitle('')
        setStatus('')
    }

    if (error) return <ApiError error={error} />
    if (loading) return <Loading />


    return (
        <div className="dashboard_container">
            <Sidebar />

            <main>
                <CoverImg />
                <div className="project_header">
                    <p>"💕Enjoy you works and complete your task"💓</p>
                    {/* <input type="text" placeholder="Serach Feature" /> */}

                    <Button onClick={() => setEditDialogOpen(true)}>
                        <Upload />
                    </Button>
                </div>

                {/* project details  */}

                <div className="project_details">
                    <h2>{projectDetails?.title}</h2>
                    <p>{projectDetails?.category}</p>
                    <strong
                        style={{ color: priorityColor(projectDetails?.priority) }}
                    >{projectDetails?.priority}</strong>
                    <strong>{projectDetails?.status}</strong>
                    <p>{projectDetails?.startDate}</p>
                    <p>{projectDetails?.endDate}</p>
                    <p className="description">{projectDetails?.description}</p>
                </div>

                {/* // project feature */}

                {/* <ProjectFeature id={id!} /> */}
                <ProjectFeature id={id!} refresh={refreshFeature} />
            </main>

            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                fullScreen={isMobile}
                fullWidth
                maxWidth="sm"
                disableRestoreFocus
                disableEnforceFocus
            >
                <DialogTitle sx={{ color: "white" }}>Upload Feature</DialogTitle>
                <DialogContent >
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            fullWidth select label="Status">
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="working">Working</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </TextField>

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>

                    <Button
                        onClick={handleUploadFeature}
                        variant="contained">
                        {btnLoader ? 'Loading...' : "Update"}

                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProjectDetails
