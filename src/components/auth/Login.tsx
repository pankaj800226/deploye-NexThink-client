import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  IconButton,
  Fade
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      setBtnLoader(true);
      try {
        const res = await axios.post(`${api}/api/user/login`, { email, password });

        if (res.data.code === 404) {
          toast.error("User Not Found");
        } else if (res.data.code === 405) {
          toast.error("Invalid Password");
        } else if (res.data.code === 200) {
          toast.success("Welcome back!");
          window.localStorage.setItem('USERNAME', res.data.username);
          window.localStorage.setItem('EMAIL', res.data.email);
          window.localStorage.setItem('USERID', res.data.userId);
          window.localStorage.setItem('TOKEN', res.data.token);
          window.localStorage.setItem('AVATAR', res.data.avatar);
          navigate('/');
        }
      } catch (error) {
        toast.error("Server Error");
      } finally {
        setBtnLoader(false);
      }
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <Box sx={containerStyle}>
      <Container maxWidth="xs">
        <Fade in timeout={800}>
          <Paper elevation={0} sx={glassPaperStyle}>
            <Typography variant="h4" sx={titleStyle}>
              USER LOGIN
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", textAlign: 'center', mb: 4 }}>
              Enter your credentials to access the system
            </Typography>

            <TextField
              fullWidth
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={iconStyle} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={inputFieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={iconStyle} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#555" }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link to='/forgetpassword' style={{ textDecoration: 'none' }}>
                    <Typography sx={{ color: "#0ff", fontSize: '12px', "&:hover": { textDecoration: 'underline' } }}>
                        Forgot Password?
                    </Typography>
                </Link>
            </Box>

            <Button
              fullWidth
              disabled={btnLoader}
              onClick={handleLogin}
              sx={mainBtnStyle}
            >
              {btnLoader ? <CircularProgress size={24} sx={{ color: '#000' }} /> : "ACCESS ACCOUNT"}
            </Button>

            <Typography mt={4} textAlign="center" fontSize="14px" sx={{ color: "#aaa" }}>
              New to the platform?{" "}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Box component="span" sx={{ color: "#0ff", fontWeight: 'bold', "&:hover": { textDecoration: 'underline' } }}>
                  CREATE ACCOUNT
                </Box>
              </Link>
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

// --- Styles (Identical to Register for consistency) ---

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
};

const glassPaperStyle = {
  p: 4,
  background: "rgba(20, 20, 20, 0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  border: "1px solid rgba(0, 255, 255, 0.1)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.8)",
};

const titleStyle = {
  color: "#0ff",
  fontWeight: 900,
  letterSpacing: '2px',
  textAlign: 'center',
  textShadow: "0 0 10px rgba(0,255,255,0.5)"
};

const inputFieldStyle = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "#333", borderRadius: "12px" },
    "&:hover fieldset": { borderColor: "#0ff" },
    "&.Mui-focused fieldset": { borderColor: "#0ff" },
  }
};

const iconStyle = { color: "#0ff", fontSize: '20px' };

const mainBtnStyle = {
  mt: 1,
  py: 1.5,
  background: "linear-gradient(90deg, #00f2ff, #00ff9d)",
  color: "#000",
  fontWeight: "800",
  borderRadius: "12px",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(0, 255, 255, 0.3)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 255, 255, 0.5)",
    background: "linear-gradient(90deg, #00ff9d, #00f2ff)",
  },
  "&:disabled": { background: "#444" }
};

export default Login;