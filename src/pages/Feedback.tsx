import { useEffect, useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../api/api";
import ApiError from "../components/ApiError";
import Loading from "../components/Loading";
import { Delete } from "@mui/icons-material";
import { MessageSquare } from "lucide-react";

interface FeedbackType {
  _id: string;
  feedback: string;
  rating: number;
  userId: {
    _id: string;
    username: string;
  };
}

const Feedback = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [feedback, setFeedback] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUserId = localStorage.getItem('USERID');
  const token = localStorage.getItem("TOKEN");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/api/feedback/get/feedbacks`);
      setAllFeedbacks(response.data.feedbacks);
    } catch (err) {
      setError("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleSubmit = async () => {
    if (!feedback || !rating) return toast.error("Please provide both feedback and rating.");
    try {
      setBtnLoading(true);
      await axios.post(
        `${api}/api/feedback/create/feedback`,
        { feedback, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Feedback submitted!");
      setFeedback("");
      setRating(0);
      fetchFeedbacks();
    } catch (err) {
      toast.error("Submission failed.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/feedback/delete/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted!");
      setAllFeedbacks(prev => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  if (error) return <ApiError error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="feedback-wrapper">
      <div className="feedback-container">
        
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="form-section"
        >
          <div className="badge">Feedback</div>
          <h2>Help us improve.</h2>
          <p className="subtitle">Your thoughts directly influence our roadmap.</p>

          <div className="rating-card">
            <span>Overall Experience</span>
            <Rating
              value={rating}
              onChange={(_, val) => setRating(val)}
              size="large"
              sx={{ color: "#818cf8" }}
            />
          </div>

          <TextField
            placeholder="What features would you like to see next?"
            multiline
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
            className="modern-input"
          />

          <Button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={btnLoading}
            endIcon={<MessageSquare size={18} />}
          >
            {btnLoading ? "Sending..." : "Submit Review"}
          </Button>
        </motion.div>

        {/* Right Side: Feed */}
        <div className="feed-section">
          <div className="feed-header">
            <h3>Community Wall</h3>
            <div className="count-pill">{allFeedbacks.length} Reviews</div>
          </div>

          <div className="feed-scroll">
            <AnimatePresence mode="popLayout">
              {allFeedbacks.map((fb) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={fb._id}
                  className="review-card"
                >
                  <div className="card-header">
                    <div className="user-group">
                      <div className="avatar">{fb.userId.username.charAt(0)}</div>
                      <div className="user-meta">
                        <h4>{fb.userId.username}</h4>
                        <Rating value={fb.rating} readOnly size="small" sx={{ color: "#fbbf24" }} />
                      </div>
                    </div>
                    {fb.userId._id === currentUserId && (
                      <button className="del-btn" onClick={() => handleDelete(fb._id)}>
                        <Delete fontSize="small" />
                      </button>
                    )}
                  </div>
                  <p className="review-text">{fb.feedback}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;