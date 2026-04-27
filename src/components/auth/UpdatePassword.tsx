import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { motion } from "framer-motion";
import { ArrowBack, LockReset } from "@mui/icons-material";

const UpdatePassword = () => {
    const email = localStorage.getItem('resetEmail')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const navigate = useNavigate()

    const handleUpdate = async () => {
        if (newPassword) {
            setBtnLoader(true)
            try {
                await axios.post(`${api}/api/user/reset-password`, { email, newPassword })

                localStorage.removeItem('resetEmail')
                toast.success("Password updated successfully")
                navigate('/login')

            } catch (error) {
                console.log(error);
                toast.error("Something went wrong")

            } finally {
                setBtnLoader(false)
            }
        } else {
            toast.error("Please enter a new password")
        }
    }

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

                            {/* Icon */}
                            <Box sx={iconContainer}>
                                <LockReset sx={iconStyle} />
                            </Box>

                            <Typography variant="h4" sx={titleStyle}>
                                New Password
                            </Typography>
                            <Typography variant="body2" sx={subtitleStyle}>
                                Create a strong password for your account
                            </Typography>

                            {/* Password Field */}
                            <TextField
                                fullWidth
                                margin="normal"
                                label="New Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                InputLabelProps={{ style: { color: "#6B7280" } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={iconStyleField} />
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
                                    ),
                                }}
                                sx={inputFieldStyle}
                            />

                            {/* Update Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                disabled={btnLoader}
                                onClick={handleUpdate}
                                sx={mainBtnStyle}
                            >
                                {btnLoader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Update Password"}
                            </Button>

                            <Divider sx={{ my: 3, borderColor: '#E5E7EB' }}>
                                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>OR</Typography>
                            </Divider>

                            {/* Login Button */}
                            <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    sx={secondaryBtnStyle}
                                >
                                    Back to Login
                                </Button>
                            </Link>
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
    width: 420,
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

const iconContainer = {
    display: "flex",
    justifyContent: "center",
    mb: 2
};

const iconStyle = {
    fontSize: 60,
    color: "#4F46E5",
    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
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
    mb: 3,
    width: "100%",
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
        }
    },
    '& .MuiInputLabel-root': {
        color: "#6B7280"
    }
};

const iconStyleField = { 
    color: "#4F46E5", 
    fontSize: '20px' 
};

const passwordToggleStyle = {
    color: "#9CA3AF",
    '&:hover': {
        color: "#4F46E5"
    }
};

const mainBtnStyle = {
    mt: 2,
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

export default UpdatePassword;