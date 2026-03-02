import { Edit, CloudUpload, VerifiedUser } from "@mui/icons-material";
import { Button, Avatar, Box, IconButton } from "@mui/material";
import Sidebar from "../components/SideBar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress
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
      setPreview(URL.createObjectURL(selectedFile)); // Create live preview
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

  if (error) return <ApiError error={error} />;
  if (loader) return <Loading />;

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main className="profile_main_wrapper">
        <motion.div 
          className="profile_card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Avatar Section */}
          <div className="avatar_wrapper">
            <motion.div className="avatar_ring" whileHover={{ rotate: 5 }}>
              <img src={profile?.avatar} alt="User" />
            </motion.div>
            <div className="online_indicator" />
          </div>

          {/* Info Section */}
          <div className="profile_info">
            <div className="badge_row">
              <span className="role_badge">PRO WORKFLOW</span>
              <VerifiedUser className="verified_icon" />
            </div>
            <h1>{profile?.username}</h1>
            <p className="email_text">{profile?.email}</p>
            <Button 
              className="glass_edit_btn" 
              onClick={() => setEditDialogOpen(true)}
              startIcon={<Edit />}
            >
              Update Profile
            </Button>
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
      >
        <DialogTitle className="dialog_title">Account Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2, alignItems: 'center' }}>
            {/* Custom File Upload Preview */}
            <Box className="upload_preview_container">
               <Avatar 
                src={preview || profile?.avatar} 
                sx={{ width: 100, height: 100, border: '3px solid #6366f1' }} 
               />
               <IconButton component="label" className="upload_icon_btn">
                 <CloudUpload />
                 <input hidden type="file" accept="image/*" onChange={handleAvatarChange} />
               </IconButton>
            </Box>

            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="inherit">Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleEditProfile}
            disabled={btnLoader}
            className="update_btn"
          >
            {btnLoader ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;