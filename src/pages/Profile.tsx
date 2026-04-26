import { Edit, CloudUpload, VerifiedUser, Email, Person, CalendarToday, TrendingUp, Logout } from "@mui/icons-material";
import { Button, Avatar, Box, IconButton, Chip, Divider, Badge } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ApiError from "../components/ApiError";

interface User {
  username: string;
  email: string;
  avatar: string;
  createdAt?: string;
  stats?: {
    totalTasks?: number;
    completedTasks?: number;
    totalSessions?: number;
    streak?: number;
  };
}

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN');

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  
  // Form & Preview State
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("Please login to continue");
        return navigate('/login');
      }
      try {
        setLoader(true);
        const res = await axios.get(`${api}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setFormData({ username: res.data.username, email: res.data.email });
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoader(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleEditProfile = async () => {
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('email', formData.email);
    if (file) fd.append('file', file);

    setBtnLoader(true);
    try {
      const res = await axios.put(`${api}/api/user/editProfile`, fd, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEditDialogOpen(false);
      setPreview(null);
      setFile(null);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setBtnLoader(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    toast.success("Logged out successfully");
  };

  const getMemberSince = () => {
    if (!profile?.createdAt) return 'Recent';
    const date = new Date(profile.createdAt);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (error) return <ApiError error={error} />;
  if (loader) return <Loading />;

  return (
    <div className="profile-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F3E8FF 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Decorative Background */
        .profile-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%);
          pointer-events: none;
        }

        .profile-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .profile_main_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .profile_card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.8);
          padding: 3rem;
          border-radius: 32px;
          width: 100%;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .profile_card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 40px -12px rgba(79, 70, 229, 0.2);
        }

        /* Avatar Section */
        .avatar_wrapper {
          position: relative;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        .avatar_ring {
          width: 140px;
          height: 140px;
          padding: 4px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED, #EC4899);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .avatar_ring:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(79, 70, 229, 0.4);
        }

        .avatar_ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          background: #F3F4F6;
        }

        .online_indicator {
          position: absolute;
          bottom: 10px;
          right: 15px;
          width: 18px;
          height: 18px;
          background: #10B981;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 2px #FFFFFF;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        /* Profile Info */
        .profile_info {
          width: 100%;
        }

        .badge_row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .role_badge {
          font-size: 0.7rem;
          letter-spacing: 1px;
          font-weight: 700;
          color: #4F46E5;
          background: rgba(79, 70, 229, 0.1);
          padding: 5px 12px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .verified_icon {
          color: #3B82F6;
          font-size: 1.1rem;
        }

        .member_since {
          font-size: 0.7rem;
          color: #6B7280;
          background: #F3F4F6;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .profile_info h1 {
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .email_text {
          color: #6B7280;
          font-size: 0.9rem;
          margin: 0.5rem 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Stats Section */
        .stats_section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 1.5rem 0;
          padding: 1rem;
          background: #F9FAFB;
          border-radius: 20px;
        }

        .stat_item {
          text-align: center;
        }

        .stat_value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1F2937;
          line-height: 1;
        }

        .stat_label {
          font-size: 0.7rem;
          color: #6B7280;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-top: 6px;
        }

        /* Buttons */
        .edit_btn {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border: none;
          border-radius: 14px;
          padding: 12px 28px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: none;
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .edit_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }

        .logout_btn {
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 10px 20px;
          font-weight: 500;
          font-size: 0.85rem;
          text-transform: none;
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
        }

        .logout_btn:hover {
          background: #FEF2F2;
          border-color: #FCA5A5;
          color: #EF4444;
        }

        /* Dialog Styles */
        .dialog_title {
          text-align: center;
          font-weight: 700;
          color: #1F2937;
          padding-bottom: 8px;
        }

        .upload_preview_container {
          position: relative;
          display: inline-block;
        }

        .upload_icon_btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 8px;
        }

        .upload_icon_btn:hover {
          background: #4F46E5;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .profile_main_wrapper {
            padding: 1rem;
          }

          .profile_card {
            padding: 1.5rem;
          }

          .avatar_ring {
            width: 110px;
            height: 110px;
          }

          .profile_info h1 {
            font-size: 1.5rem;
          }

          .stats_section {
            gap: 10px;
            padding: 0.8rem;
          }

          .stat_value {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .stats_section {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .badge_row {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <main className="profile_main_wrapper">
        <motion.div 
          className="profile_card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          {/* Avatar Section */}
          <div className="avatar_wrapper">
            <motion.div 
              className="avatar_ring" 
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.username}&background=4F46E5&color=fff&size=140`} 
                alt={profile?.username} 
              />
            </motion.div>
            <div className="online_indicator" />
          </div>

          {/* Info Section */}
          <div className="profile_info">
            <div className="badge_row">
              <span className="role_badge">✨ PRO MEMBER</span>
              <VerifiedUser className="verified_icon" />
              <span className="member_since">
                <CalendarToday sx={{ fontSize: 12 }} />
                Member since {getMemberSince()}
              </span>
            </div>
            
            <h1>{profile?.username}</h1>
            <p className="email_text">
              <Email sx={{ fontSize: 14 }} />
              {profile?.email}
            </p>

            {/* Stats Section */}
            <div className="stats_section">
              <div className="stat_item">
                <div className="stat_value">{profile?.stats?.totalTasks || 0}</div>
                <div className="stat_label">Total Tasks</div>
              </div>
              <div className="stat_item">
                <div className="stat_value">{profile?.stats?.completedTasks || 0}</div>
                <div className="stat_label">Completed</div>
              </div>
              <div className="stat_item">
                <div className="stat_value">{profile?.stats?.streak || 0}</div>
                <div className="stat_label">Day Streak</div>
              </div>
            </div>
            
            <button 
              className="edit_btn" 
              onClick={() => setEditDialogOpen(true)}
            >
              <Edit sx={{ fontSize: 18 }} />
              Edit Profile
            </button>

            <button className="logout_btn" onClick={handleLogout}>
              <Logout sx={{ fontSize: 16 }} />
              Logout
            </button>
          </div>
        </motion.div>
      </main>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullScreen={isMobile}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'white',
            padding: '8px'
          }
        }}
      >
        <DialogTitle className="dialog_title">
          Account Settings
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2, alignItems: 'center' }}>
            {/* Custom File Upload Preview */}
            <Box className="upload_preview_container">
              <Avatar 
                src={preview || profile?.avatar || `https://ui-avatars.com/api/?name=${formData.username}&background=4F46E5&color=fff`} 
                sx={{ width: 100, height: 100, border: '3px solid #4F46E5' }} 
              />
              <IconButton component="label" className="upload_icon_btn" sx={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0,
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: 'white',
                '&:hover': { background: '#4F46E5' }
              }}>
                <CloudUpload sx={{ fontSize: 18 }} />
                <input hidden type="file" accept="image/*" onChange={handleAvatarChange} />
              </IconButton>
            </Box>

            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setEditDialogOpen(false)} 
            color="inherit"
            sx={{ borderRadius: '10px', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEditProfile}
            disabled={btnLoader}
            sx={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              borderRadius: '10px',
              textTransform: 'none',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #4338CA, #6D28D9)'
              }
            }}
          >
            {btnLoader ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;