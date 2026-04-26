import { useEffect, useState } from "react";
import { TextField, Rating } from "@mui/material";
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

const FeedbackStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Entrance ── */
    @keyframes fadeUpFb {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fadeInFb {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes shimmerFb {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes slideRightFb {
      from { width: 0%; }
      to   { width: 100%; }
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── Section ── */
    .fb-section {
      background: #ffffff;
      padding: 90px 40px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .fb-section::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 120px; height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
    }

    /* ── Static blobs ── */
    .fb-blob-tl {
      position: absolute; top: -140px; left: -120px;
      width: 440px; height: 440px; border-radius: 50%;
      background: radial-gradient(circle, rgba(79,70,229,.07) 0%, transparent 70%);
      pointer-events: none;
    }
    .fb-blob-br {
      position: absolute; bottom: -100px; right: -100px;
      width: 360px; height: 360px; border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Heading block ── */
    .fb-heading-wrap {
      text-align: center;
      margin-bottom: 52px;
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .05s;
    }
    .fb-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 14px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 12px;
      font-weight: 600;
      color: #4338ca;
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .fb-title {
      font-size: clamp(26px, 4vw, 42px);
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin: 0 0 12px;
    }
    .fb-title-accent {
      background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #4f46e5 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerFb 4s linear infinite;
      position: relative;
      display: inline-block;
    }
    .fb-title-accent::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      height: 3px; width: 0;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: slideRightFb 0.7s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .65s;
    }
    .fb-subtitle {
      font-size: clamp(14px, 1.8vw, 17px);
      color: #6b7280;
      line-height: 1.7;
      max-width: 460px;
      margin: 0 auto;
    }

    /* ── Two-column layout ── */
    .fb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      max-width: 980px;
      margin: 0 auto;
      align-items: start;
    }
    @media (max-width: 860px) {
      .fb-grid     { grid-template-columns: 1fr; }
      .fb-section  { padding: 70px 24px; }
    }
    @media (max-width: 480px) {
      .fb-section  { padding: 60px 16px; }
    }

    /* ── Form card ── */
    .fb-form-card {
      background: #ffffff;
      border: 1.5px solid #f3f4f6;
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 30px rgba(0,0,0,.06);
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .18s;
    }

    .fb-form-label {
      font-size: 12px;
      font-weight: 700;
      color: #4f46e5;
      text-transform: uppercase;
      letter-spacing: .06em;
      margin-bottom: 8px;
    }
    .fb-form-title {
      font-size: clamp(20px, 2.5vw, 26px);
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.025em;
      margin: 0 0 6px;
    }
    .fb-form-sub {
      font-size: 14px;
      color: #9ca3af;
      margin: 0 0 28px;
    }

    /* ── Rating row ── */
    .fb-rating-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      margin-bottom: 16px;
    }
    .fb-rating-label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    /* ── Textarea box ── */
    .fb-textarea-wrap {
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 20px;
      transition: border-color .18s;
    }
    .fb-textarea-wrap:focus-within {
      border-color: #a5b4fc;
      background: #fff;
    }

    /* ── Submit button ── */
    .fb-submit-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(79,70,229,.30);
      transition: transform .18s ease, box-shadow .18s ease, opacity .18s;
      position: relative;
      overflow: hidden;
    }
    .fb-submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(79,70,229,.38);
    }
    .fb-submit-btn:disabled { opacity: .65; cursor: not-allowed; }

    /* ── Feed column ── */
    .fb-feed-card {
      background: #ffffff;
      border: 1.5px solid #f3f4f6;
      border-radius: 20px;
      padding: 24px 24px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 30px rgba(0,0,0,.06);
      display: flex;
      flex-direction: column;
      max-height: 540px;
      opacity: 0;
      animation: fadeUpFb 0.6s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .28s;
    }

    .fb-feed-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .fb-feed-title {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }
    .fb-count-pill {
      padding: 4px 12px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 12px;
      font-weight: 600;
      color: #4338ca;
    }

    /* ── Scrollable list ── */
    .fb-list {
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-right: 4px;
    }
    .fb-list::-webkit-scrollbar { width: 4px; }
    .fb-list::-webkit-scrollbar-track { background: transparent; }
    .fb-list::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

    /* ── Review card ── */
    .fb-review {
      background: #f9fafb;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 16px;
      transition: border-color .18s, box-shadow .18s;
      animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
    }
    .fb-review:hover {
      border-color: #c7d2fe;
      box-shadow: 0 4px 16px rgba(79,70,229,.07);
    }

    .fb-review-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .fb-user-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .fb-avatar {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }
    .fb-username {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 2px;
    }

    /* ── Delete button ── */
    .fb-del-btn {
      width: 32px; height: 32px;
      border-radius: 8px;
      border: 1.5px solid #fee2e2;
      background: #fff5f5;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #ef4444;
      transition: background .18s, border-color .18s, transform .18s;
      flex-shrink: 0;
    }
    .fb-del-btn:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      transform: scale(1.08);
    }

    .fb-review-text {
      font-size: 13.5px;
      color: #6b7280;
      line-height: 1.65;
      margin: 0;
    }

    /* ── Empty state ── */
    .fb-empty {
      text-align: center;
      padding: 40px 20px;
      color: #9ca3af;
      font-size: 14px;
    }
    .fb-empty-icon {
      font-size: 32px;
      margin-bottom: 10px;
      opacity: .4;
    }
  `}</style>
);

/* ═══════════════════════════════ Feedback ══════════════════════════════════ */
const Feedback = () => {
  const [rating, setRating]           = useState<number | null>(0);
  const [feedback, setFeedback]       = useState("");
  const [btnLoading, setBtnLoading]   = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackType[]>([]);
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);

  const currentUserId = localStorage.getItem("USERID");
  const token         = localStorage.getItem("TOKEN");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/api/feedback/get/feedbacks`);
      setAllFeedbacks(response.data.feedbacks);
    } catch {
      setError("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleSubmit = async () => {
    if (!feedback || !rating)
      return toast.error("Please provide both feedback and rating.");
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
    } catch {
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
      setAllFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch {
      toast.error("Delete failed.");
    }
  };

  if (error)   return <ApiError error={error} />;
  if (loading) return <Loading />;

  return (
    <>
      <FeedbackStyles />

      <section className="fb-section">
        {/* Static blobs */}
        <div className="fb-blob-tl" />
        <div className="fb-blob-br" />

        {/* ── Heading ── */}
        <div className="fb-heading-wrap">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <span className="fb-eyebrow">✦ Community</span>
          </div>
          <h2 className="fb-title">
            What Our Users{" "}
            <span className="fb-title-accent">Are Saying</span>
          </h2>
          <p className="fb-subtitle">
            Your thoughts directly shape our roadmap. Share what you love or
            what we can do better.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="fb-grid">

          {/* ── Left: Form ── */}
          <div className="fb-form-card">
            <p className="fb-form-label">✦ Write a Review</p>
            <h3 className="fb-form-title">Help us improve.</h3>
            <p className="fb-form-sub">Your feedback shapes our next release.</p>

            {/* Rating row */}
            <div className="fb-rating-row">
              <span className="fb-rating-label">Overall Experience</span>
              <Rating
                value={rating}
                onChange={(_, val) => setRating(val)}
                size="large"
                sx={{ color: "#4f46e5" }}
              />
            </div>

            {/* Textarea */}
            <div className="fb-textarea-wrap">
              <TextField
                placeholder="What features would you like to see next?"
                multiline
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& textarea": {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: 1.65,
                  },
                  "& textarea::placeholder": { color: "#9ca3af" },
                }}
              />
            </div>

            {/* Submit */}
            <button
              className="fb-submit-btn"
              onClick={handleSubmit}
              disabled={btnLoading}
            >
              <MessageSquare size={17} />
              {btnLoading ? "Sending..." : "Submit Review"}
            </button>
          </div>

          {/* ── Right: Feed ── */}
          <div className="fb-feed-card">
            {/* Header */}
            <div className="fb-feed-top">
              <h3 className="fb-feed-title">Community Wall</h3>
              <span className="fb-count-pill">{allFeedbacks.length} Reviews</span>
            </div>

            {/* Scrollable list */}
            <div className="fb-list">
              {allFeedbacks.length === 0 ? (
                <div className="fb-empty">
                  <div className="fb-empty-icon">💬</div>
                  <p>No reviews yet. Be the first!</p>
                </div>
              ) : (
                allFeedbacks.map((fb, i) => (
                  <div
                    key={fb._id}
                    className="fb-review"
                    style={{ animationDelay: `${0.05 * i}s` }}
                  >
                    {/* Card header */}
                    <div className="fb-review-header">
                      <div className="fb-user-row">
                        <div className="fb-avatar">
                          {fb.userId.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="fb-username">{fb.userId.username}</p>
                          <Rating
                            value={fb.rating}
                            readOnly
                            size="small"
                            sx={{ color: "#f59e0b", fontSize: "14px" }}
                          />
                        </div>
                      </div>

                      {fb.userId._id === currentUserId && (
                        <button
                          className="fb-del-btn"
                          onClick={() => handleDelete(fb._id)}
                          aria-label="Delete review"
                        >
                          <Delete style={{ fontSize: 16 }} />
                        </button>
                      )}
                    </div>

                    {/* Review text */}
                    <p className="fb-review-text">{fb.feedback}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Feedback;