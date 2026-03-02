import  { useEffect, useState } from "react";
import { 
  IconButton, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, useTheme, useMediaQuery,
  Chip, Tooltip, Box, Avatar
} from "@mui/material";
import { Visibility, Edit, Delete, FolderSpecial } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../../components/SideBar";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";
import { api } from "../../api/api";

interface Project {
  _id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
}

const ManageProject = () => {
  const [allProject, setAllProject] = useState<Project[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchTask = async () => {
    const token = localStorage.getItem("TOKEN");
    if (!token) return;
    try {
      setLoader(true);
      const res = await axios.get(`${api}/api/project/getProject`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllProject(res.data.findProject);
    } catch (err) {
      setError("Api Fetching Error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => { fetchTask(); }, []);

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return { color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)" };
      case "working": return { color: "#6a5af9", bg: "rgba(106, 90, 249, 0.1)" };
      case "pending": return { color: "#facc15", bg: "rgba(250, 204, 21, 0.1)" };
      default: return { color: "#9aa4af", bg: "rgba(154, 164, 175, 0.1)" };
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${api}/api/project/project/delete/${id}`);
      setAllProject((prev) => prev.filter((f) => f._id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  if (loader) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="dashboard_container">
      <Sidebar />
      <main className="manage_project_main">
        
        <Box className="table_header_box">
          <div>
            <Typography variant="h5" className="main_title">Project Inventory</Typography>
            <Typography variant="body2" className="subtitle">Overview of your ongoing and archived works</Typography>
          </div>
          <Typography className="project_count">{allProject.length} Total</Typography>
        </Box>

        <TableContainer component={Paper} className="custom_table_container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="head_cell">Project Details</TableCell>
                {!isMobile && <TableCell className="head_cell">Category</TableCell>}
                <TableCell className="head_cell">Status</TableCell>
                {!isMobile && <TableCell className="head_cell">Priority</TableCell>}
                <TableCell className="head_cell" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allProject.length > 0 ? (
                allProject.map((project) => {
                  const status = getStatusConfig(project.status);
                  return (
                    <TableRow key={project._id} className="body_row">
                      {/* Title & Icon Cell */}
                      <TableCell className="body_cell">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#1e252b', color: '#3b82f6', width: 38, height: 38 }}>
                            <FolderSpecial fontSize="small" />
                          </Avatar>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#fff' }}>
                            {project.title}
                          </Typography>
                        </Box>
                      </TableCell>

                      {!isMobile && (
                        <TableCell className="body_cell text_muted">{project.category}</TableCell>
                      )}

                      {/* Status Chip */}
                      <TableCell className="body_cell">
                        <Chip 
                          label={project.status} 
                          size="small" 
                          sx={{ 
                            bgcolor: status.bg, 
                            color: status.color, 
                            fontWeight: 800, 
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            borderRadius: '6px'
                          }} 
                        />
                      </TableCell>

                      {!isMobile && (
                        <TableCell className="body_cell">
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                             <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: project.priority === 'High' ? '#ef4444' : '#6a5af9' }} />
                             <Typography variant="caption">{project.priority}</Typography>
                           </Box>
                        </TableCell>
                      )}

                      {/* Actions */}
                      <TableCell align="center" className="body_cell action_cell">
                        <Tooltip title="View Project"><Link to={`/projectdetails/${project._id}`}>
                          <IconButton className="view_btn"><Visibility fontSize="small" /></IconButton>
                        </Link></Tooltip>

                        <Tooltip title="Edit"><Link to={`/projectedit/${project._id}`}>
                          <IconButton className="edit_btn"><Edit fontSize="small" /></IconButton>
                        </Link></Tooltip>

                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(project._id)} className="delete_btn"><Delete fontSize="small" /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow><TableCell colSpan={5} align="center" className="empty_cell">No projects found. Create one to get started! 🚀</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default ManageProject;