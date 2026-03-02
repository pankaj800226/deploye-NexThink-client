import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Button, MenuItem, Dialog, DialogActions, DialogContent, 
  DialogTitle, Stack, TextField, useMediaQuery, useTheme,
  Chip, Divider, Typography
} from "@mui/material";
import { 
  Upload, CalendarMonth, Category, 
  PriorityHigh, Assignment, Description 
} from "@mui/icons-material";
import toast from "react-hot-toast";

import Sidebar from "../../components/SideBar";
import ApiError from "../../components/ApiError";
import Loading from "../../components/Loading";
import ProjectFeature from "./feature/AllFeature";
import CoverImg from "../Analyze/CoverImg";
import { api } from "../../api/api";

interface Project {
  _id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [refreshFeature, setRefreshFeature] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState("pending");
  const [btnLoader, setBtnLoader] = useState(false);

  const token = localStorage.getItem('TOKEN');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/api/project/projectId/${id}`);
        setProjectDetails(res.data);
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUploadFeature = async () => {
    if (!title.trim()) return toast.error("Title is required");
    try {
      setBtnLoader(true);
      const res = await axios.post(`${api}/api/feature/create/feature/${id}`, 
        { title, status }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Feature created successfully!");
        setRefreshFeature(prev => !prev);
        setEditDialogOpen(false);
        setTitle('');
      }
    } catch (err) {
      toast.error('Error creating feature');
    } finally {
      setBtnLoader(false);
    }
  };

  const getPriorityColor = (p?: string) => {
    switch (p) {
      case "High": return "#ef4444";
      case "Medium": return "#facc15";
      case "Low": return "#3b82f6";
      default: return "#4ade80";
    }
  };

  if (error) return <ApiError error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <CoverImg />

        {/* PAGE HEADER */}
        <div className="project_page_header">
          <div className="header_intro">
            <h1>{projectDetails?.title}</h1>
            <p className="subtitle">Manage your project milestones and features</p>
          </div>
          <Button 
            variant="contained" 
            startIcon={<Upload />} 
            onClick={() => setEditDialogOpen(true)}
            className="action_btn"
          >
            Add Feature
          </Button>
        </div>

        {/* PROJECT INFO CARD */}
        <div className="project_card_summary">
          <div className="info_grid">
            <div className="info_tile">
              <Category className="tile_icon" />
              <div className="tile_content">
                <label>Category</label>
                <span>{projectDetails?.category}</span>
              </div>
            </div>

            <div className="info_tile">
              <PriorityHigh className="tile_icon" style={{ color: getPriorityColor(projectDetails?.priority) }} />
              <div className="tile_content">
                <label>Priority</label>
                <Chip 
                  label={projectDetails?.priority} 
                  size="small" 
                  sx={{ bgcolor: `${getPriorityColor(projectDetails?.priority)}20`, color: getPriorityColor(projectDetails?.priority), fontWeight: 'bold' }} 
                />
              </div>
            </div>

            <div className="info_tile">
              <CalendarMonth className="tile_icon" />
              <div className="tile_content">
                <label>Timeline</label>
                <span>{projectDetails?.startDate} - {projectDetails?.endDate}</span>
              </div>
            </div>

            <div className="info_tile">
              <Assignment className="tile_icon" />
              <div className="tile_content">
                <label>Status</label>
                <span className="status_label">{projectDetails?.status}</span>
              </div>
            </div>
          </div>

          <Divider sx={{ my: 3, borderColor: '#262c33' }} />

          <div className="description_section">
            <div className="desc_header">
              <Description fontSize="small" />
              <Typography variant="overline">Project Description</Typography>
            </div>
            <p>{projectDetails?.description}</p>
          </div>
        </div>

        {/* FEATURES LIST */}
        <div className="features_wrapper">
          <ProjectFeature id={id!} refresh={refreshFeature} />
        </div>
      </main>

      {/* DIALOG */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{ className: "dark_dialog" }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #262c33', mb: 2 }}>New Feature</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Feature Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              select
              label="Initial Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="working">Working</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="inherit">Cancel</Button>
          <Button 
            onClick={handleUploadFeature} 
            variant="contained" 
            disabled={btnLoader}
          >
            {btnLoader ? "Creating..." : "Create Feature"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectDetails;