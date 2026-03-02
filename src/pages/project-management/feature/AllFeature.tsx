import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { api } from "../../../api/api";
import ApiError from "../../../components/ApiError";
import Loading from "../../../components/Loading";
import { Button, Tooltip } from "@mui/material";
import {
  Delete, Edit, CheckCircle,
  RocketLaunch, Construction,
  Star, AutoAwesome
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface Feature {
  _id: string;
  title: string;
  status: 'pending' | 'working' | 'completed';
}

interface ProjectFeatureProps {
  id: string;
  refresh: boolean;
}

const ProjectFeature: React.FC<ProjectFeatureProps> = ({ id, refresh }) => {
  const [allFeature, setAllFeature] = useState<Feature[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchFeature = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/api/feature/get/feature/${id}`);
        setAllFeature(res.data.findFeature || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch features.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeature();
  }, [id, refresh]);

  // Derived State for Stats & Motivation
  const stats = useMemo(() => {
    const total = allFeature.length;
    const completed = allFeature.filter(f => f.status === 'completed').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    let motivation = { text: "No tasks yet", icon: <Star fontSize="small" /> };
    if (total > 0) {
      if (percent === 0) motivation = { text: "Ready to blast off?", icon: <RocketLaunch fontSize="small" /> };
      else if (percent < 50) motivation = { text: "Making steady progress!", icon: <Construction fontSize="small" /> };
      else if (percent < 100) motivation = { text: "So close to the finish line!", icon: <AutoAwesome fontSize="small" /> };
      else motivation = { text: "All systems go! Project complete.", icon: <CheckCircle fontSize="small" /> };
    }

    return { total, completed, percent, motivation };
  }, [allFeature]);

  const handleDelete = async (featureId: string) => {
    if (!window.confirm("Delete this feature?")) return;
    try {
      await axios.delete(`${api}/api/feature/delete/feature/${featureId}`);
      setAllFeature((prev) => prev.filter((f) => f._id !== featureId));
      toast.success("Feature removed");
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (error) return <ApiError error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="todo-wrapper">
      {/* HEADER SECTION */}
      <div className="todo-header">
        <div className="header-left">
          <h2 className="todo-title">Features</h2>
          <div className={`motivation-pill ${stats.percent === 100 ? 'complete' : ''}`}>
            {stats.motivation.icon}
            <span>{stats.motivation.text}</span>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="stats-container">
            <div className="stats-info">
              <span className="count">{stats.completed}/{stats.total} Done</span>
              <span className="percent">{stats.percent}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${stats.percent}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* LIST SECTION */}
      {allFeature.length === 0 ? (
        <div className="todo-empty">No features found for this project. 🚀</div>
      ) : (
        <ul className="todo-list">
          {allFeature.map((feature) => (
            <li key={feature._id} className={`todo-item ${feature.status}`}>
              <div className="todo-left">
                <span className="todo-dot" />
                <div className="todo-content">
                  <h4>{feature.title}</h4>
                  <span className={`badge badge-${feature.status}`}>
                    {feature.status}
                  </span>
                </div>
              </div>

              <div className="todo-actions">
                <Link to={`/editfeature/${feature._id}`}>
                  <Tooltip title="Edit">
                    <Button size="small" className="action-btn"><Edit fontSize="small" /></Button>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete">
                  <Button
                    onClick={() => handleDelete(feature._id)}
                    size="small"
                    color="error"
                    className="action-btn"
                  >
                    <Delete fontSize="small" />
                  </Button>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectFeature;