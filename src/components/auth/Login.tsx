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
  Fade,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

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
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setBtnLoader(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={containerStyle}>
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={0} sx={glassPaperStyle}>
              {/* Decorative Elements */}
              <Box sx={decorativeTop} />
              <Box sx={decorativeBottom} />
              <Box sx={decorativeCircle1} />
              <Box sx={decorativeCircle2} />

              <Typography variant="h4" sx={titleStyle}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={subtitleStyle}>
                Sign in to continue to your account
              </Typography>

              <TextField
                fullWidth
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                error={!!errors.email}
                helperText={errors.email}
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
                onKeyPress={handleKeyPress}
                error={!!errors.password}
                helperText={errors.password}
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
                        sx={passwordToggleStyle}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link to='/forgetpassword' style={{ textDecoration: 'none' }}>
                  <Typography sx={forgotPasswordStyle}>
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
                {btnLoader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Sign In"}
              </Button>

              <Divider sx={{ my: 3, borderColor: '#E5E7EB' }}>
                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>New to our platform?</Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/register')}
                sx={secondaryBtnStyle}
                startIcon={<FingerprintIcon />}
              >
                Create New Account
              </Button>
            </Paper>
          </motion.div>
        </Fade>
      </Container>
    </Box>
  );
};

// --- White Theme Styles ---

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F3E8FF 100%)",
  position: "relative",
  overflow: "hidden",
  '&::before': {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "300px",
    background: "radial-gradient(circle at 0% 0%, rgba(79, 70, 229, 0.08) 0%, transparent 50%)",
    pointerEvents: "none"
  },
  '&::after': {
    content: '""',
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)",
    pointerEvents: "none"
  }
};

const glassPaperStyle = {
  p: 4,
  background: "white",
  borderRadius: "32px",
  border: "1px solid rgba(229, 231, 235, 0.8)",
  boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  '&:hover': {
    transform: "translateY(-4px)",
    boxShadow: "0 25px 40px -12px rgba(79, 70, 229, 0.2)"
  }
};

const decorativeTop = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "4px",
  background: "linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899)",
  borderRadius: "32px 32px 0 0"
};

const decorativeBottom = {
  position: "absolute",
  bottom: 20,
  right: 20,
  width: "100px",
  height: "100px",
  background: "radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%)",
  borderRadius: "50%",
  pointerEvents: "none"
};

const decorativeCircle1 = {
  position: "absolute",
  top: -50,
  left: -50,
  width: "150px",
  height: "150px",
  background: "radial-gradient(circle, rgba(79, 70, 229, 0.03) 0%, transparent 70%)",
  borderRadius: "50%",
  pointerEvents: "none"
};

const decorativeCircle2 = {
  position: "absolute",
  bottom: -30,
  left: -30,
  width: "120px",
  height: "120px",
  background: "radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)",
  borderRadius: "50%",
  pointerEvents: "none"
};

const titleStyle = {
  fontWeight: 800,
  letterSpacing: '-0.5px',
  textAlign: 'center',
  background: "linear-gradient(135deg, #1F2937, #4F46E5)",
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  mb: 1,
  fontSize: { xs: '28px', sm: '32px' }
};

const subtitleStyle = {
  color: "#6B7280",
  textAlign: 'center',
  mb: 4,
  fontSize: '14px'
};

const inputFieldStyle = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    color: "#1F2937",
    backgroundColor: "#F9FAFB",
    borderRadius: "14px",
    transition: "all 0.2s ease",
    '& fieldset': { 
      borderColor: "#E5E7EB",
      borderWidth: "1px"
    },
    '&:hover fieldset': { 
      borderColor: "#4F46E5",
      borderWidth: "1px"
    },
    '&.Mui-focused fieldset': { 
      borderColor: "#4F46E5",
      borderWidth: "2px"
    },
    '&.Mui-error fieldset': {
      borderColor: "#EF4444"
    }
  },
  '& .MuiInputLabel-root': {
    color: "#6B7280"
  },
  '& .MuiFormHelperText-root': {
    marginLeft: "14px",
    fontSize: "11px"
  }
};

const iconStyle = { 
  color: "#4F46E5", 
  fontSize: '20px' 
};

const passwordToggleStyle = {
  color: "#9CA3AF",
  '&:hover': {
    color: "#4F46E5"
  }
};

const forgotPasswordStyle = {
  color: "#4F46E5",
  fontSize: '12px',
  fontWeight: 500,
  transition: "all 0.2s ease",
  '&:hover': { 
    textDecoration: 'underline',
    opacity: 0.8
  }
};

const mainBtnStyle = {
  mt: 1,
  py: 1.5,
  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "16px",
  borderRadius: "14px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
  textTransform: "none",
  '&:hover': {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(79, 70, 229, 0.4)",
    background: "linear-gradient(135deg, #4338CA, #6D28D9)"
  },
  '&:disabled': { 
    background: "#D1D5DB",
    boxShadow: "none"
  }
};

const secondaryBtnStyle = {
  py: 1.2,
  borderRadius: "14px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  color: "#4F46E5",
  borderColor: "#E5E7EB",
  '&:hover': {
    borderColor: "#4F46E5",
    backgroundColor: "#EEF2FF",
    transform: "translateY(-1px)"
  }
};

export default Login;