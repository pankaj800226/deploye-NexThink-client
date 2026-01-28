import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import axios from "axios";
import { api } from "../../api/api";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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


  // project find
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
      console.error(err);
      setError("Api Fetching Error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#22c55e"; // green
      case "working":
        return "#6a5af9"; // purple
      case "pending":
        return "#facc15"; // yellow
      default:
        return "#E0E0E0"; // default gray
    }
  };


  // project delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/project/project/delete/${id}`)

      setAllProject((prev) => prev.filter((f) => f._id !== id))

      toast.success("project delete sucessfully")

    } catch (error) {
      console.log(error);
      toast.error('error')

    }
  }

  if (loader) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main
        style={{
          backgroundColor: "#0F1214",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            backgroundColor: "#14181B",
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            overflowX: "auto", // Horizontal scroll on small screens
          }}
        >
          <Typography
            variant="h6"
            sx={{
              p: 2,
              color: "#fff",
              borderBottom: "1px solid #2A2E33",
            }}
          >
            Manage Projects
          </Typography>

          <Table>
            {/* ===== Table Head ===== */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1B1F23" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Title
                </TableCell>

                {!isMobile && (
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Category
                  </TableCell>
                )}

                <TableCell

                  sx={{ color: "#fff", fontWeight: "bold" }}>
                  Status
                </TableCell>

                {!isMobile && (
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Priority
                  </TableCell>
                )}

                <TableCell
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* ===== Table Body ===== */}
            <TableBody>
              {allProject && allProject.length > 0 ? (
                allProject.map((project, index) => (
                  <TableRow
                    key={project._id || index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#1A1E22",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ color: "#E0E0E0", borderColor: "#2A2E33" }}
                    >
                      {project.title}
                    </TableCell>

                    {!isMobile && (
                      <TableCell
                        sx={{ color: "#E0E0E0", borderColor: "#2A2E33" }}
                      >
                        {project.category}
                      </TableCell>
                    )}

                    <TableCell
                      sx={{
                        color: statusColor(project.status),
                        fontWeight: "bold",
                        borderColor: "#2A2E33",
                      }}
                    >
                      {project.status}
                    </TableCell>

                    {!isMobile && (
                      <TableCell
                        sx={{ color: "#E0E0E0", borderColor: "#2A2E33" }}
                      >
                        {project.priority}
                      </TableCell>
                    )}

                    <TableCell
                      align="center"
                      sx={{ borderColor: "#2A2E33" }}

                    >
                      {/* View */}
                      <Link to={`/projectdetails/${project._id}`}>
                        <IconButton
                          aria-label="view"
                          size={isMobile ? "small" : "medium"}
                          sx={{ color: "#4FC3F7" }}
                        >
                          <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      </Link>

                      {/* Edit */}
                      <Link to={`/projectedit/${project._id}`}>
                        <IconButton
                          aria-label="edit"
                          size={isMobile ? "small" : "medium"}
                          sx={{ color: "#FFB74D" }}
                        >
                          <EditIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      </Link>

                      {/* Delete */}
                      <IconButton
                        onClick={() => handleDelete(project._id)}
                        aria-label="delete"
                        size={isMobile ? "small" : "medium"}
                        sx={{ color: "#E57373" }}
                      >
                        <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ color: "#B0B0B0" }}
                  >
                    No projects found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default ManageProject;