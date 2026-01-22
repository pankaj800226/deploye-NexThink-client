import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Sidebar from "../components/SideBar";
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
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ApiError from "../components/ApiError";

interface User {
  username: string,
  email: string,
  avatar: string
}

const Profile = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const token = localStorage.getItem('TOKEN')
  const navigate = useNavigate()
  const [btnLoader, setBtnLoader] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    file: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
    }
  };



  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("You are not login")
        return navigate('/login')
      }

      try {
        setLoader(true)

        const res = await axios.get(`${api}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setProfile(res.data)

        setFormData({
          username: res?.data.username,
          email: res?.data.email,
          file: ""
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile")
        setError("Api Fetching Error")
      } finally {
        setLoader(false)

      }
    }
    fetchProfile()
  }, [token, navigate])

  // edit prifile
  const handleEditProfile = async () => {
    const fd = new FormData()
    fd.append('username', formData.username)
    fd.append('email', formData.email)

    if (file) fd.append('file', file)

    if (!token) {
      toast.error("You are not login")
      return navigate('/login')
    }
    setBtnLoader(true)
    try {
      const res = await axios.put(`${api}/api/user/editProfile`, fd, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(res.data)
      setEditDialogOpen(false)
      toast.success("Profile updated")

    } catch (error) {
      console.log(error);
      toast.error("Error updating profile")
      setError("Api Fetching Error")

    } finally {
      setBtnLoader(false)
    }
  }

  if (error) return <ApiError error={error} />
  if (loader) return <Loading />

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <motion.div
          className="profile_container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="profile_left"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <motion.img
              src={profile?.avatar}
              alt="User Avatar"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="profile_right"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{profile?.username}</h1>
            <p className="email">{profile?.email}</p>
            <span className="role">Creator</span>

            <motion.div whileHover={{ scale: 1.08 }} className="edit_btn">
              <Button onClick={() => setEditDialogOpen(true)} startIcon={<Edit />}>
                Edit Profile
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

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
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent >
          <Stack  spacing={2} mt={1}>
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

            <Button
              fullWidth
              component="label"
              sx={{
                mt: 2,
                py: 1.2,
                border: "1px dashed #0ff",
                color: "#222",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(0,255,255,0.08)"
                }
              }}
            >
              {file ? file.name : "Avatar"}
              <input hidden type="file" accept="image/*" onChange={handleAvatarChange} />
            </Button>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProfile}>
            {btnLoader ? <Loading /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile;
