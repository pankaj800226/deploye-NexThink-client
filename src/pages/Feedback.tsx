import { useEffect, useState } from "react";
import { TextField, Button, Rating } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../api/api";
import ApiError from "../components/ApiError";
import Loading from "../components/Loading";
import { Delete } from "@mui/icons-material";

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
  const isAlreadyloginUser = localStorage.getItem('USERID')

  const token = localStorage.getItem("TOKEN");

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/api/feedback/get/feedbacks`);
      setAllFeedbacks(response.data.feedbacks);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Submit feedback
  const handleSubmit = async () => {
    if (!feedback || !rating){
     return toast.error("Please provide both feedback and rating.");
    }
    try {
      setBtnLoading(true);
      await axios.post(
        `${api}/api/feedback/create/feedback`,
        { feedback, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Feedback submitted successfully!");
      setFeedback("");
      setRating(0);

      fetchFeedbacks();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  // Delete feedback
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${api}/api/feedback/delete/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Feedback deleted!");
      setAllFeedbacks(allFeedbacks.filter((fb) => fb._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete feedback.");
    }
  };

  if (error) return <ApiError error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="feedback-section">
      {/* Left: Feedback Form */}
      <div className="feedback-form">
        <h2>Share your Feedback</h2>

        <div className="feedback-rating">
          <span>Rate your experience:</span>
          <Rating
            name="user-rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
            sx={{ color: "#facc15" }}
          />
        </div>

        <TextField
          label="Your Feedback"
          multiline
          rows={5}
          variant="filled"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "#1f2225",
            borderRadius: "12px",
            "& .MuiInputBase-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#cfd3d7" },
          }}
        />

        <Button
          className="feedback-btn"
          variant="contained"
          onClick={handleSubmit}
          disabled={btnLoading}
        >
          {btnLoading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>

      {/* Right: Feedback List */}
      <div className="feedback-list">
        <h2>What Our Users Say</h2>
        {allFeedbacks.length === 0 && <p>No feedbacks yet.</p>}
        {allFeedbacks.map((fb) => (
          <div key={fb._id} className="feedback-card">
            <div className="feedback-header">
              <div className="user-avatar">{fb.userId.username.charAt(0)}</div>
              <div className="user-info">
                <h4>{fb.userId.username}</h4>
                <Rating
                  value={fb.rating}
                  readOnly
                  size="small"
                  sx={{ color: "#facc15" }}
                />
              </div>
              {fb.userId._id === isAlreadyloginUser && (
                <Button
                  variant="outlined"
                  size="small"
                  className="delete-btn"
                  onClick={() => handleDelete(fb._id)}
                >
                  <Delete fontSize="small" />
                </Button>

              )}
            </div>
            <p>{fb.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
