import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import { Link, useNavigate } from "react-router-dom";
import { Send, ArrowBack, LockReset } from '@mui/icons-material';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSendOtp = async () => {
        if (!email) {
            setError("Please enter your email address");
            return toast.error('Please enter email');
        }
        
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return toast.error('Invalid email format');
        }
        
        setError('');
        localStorage.setItem("resetEmail", email);

        setBtnLoader(true);
        try {
            await axios.post(`${api}/api/user/forgot-password`, { email });
            toast.success("OTP sent successfully! Check your email");
            setTimeout(() => navigate('/otpverify'), 1500);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setBtnLoader(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendOtp();
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

                            {/* Icon */}
                            <Box sx={iconContainer}>
                                <LockReset sx={lockIconStyle} />
                            </Box>

                            <Typography variant="h4" sx={titleStyle}>
                                Forgot Password?
                            </Typography>
                            <Typography variant="body2" sx={subtitleStyle}>
                                Enter your email address and we'll send you a verification code to reset your password
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={alertStyle}>
                                    {error}
                                </Alert>
                            )}

                            {/* Email Field */}
                            <TextField
                                fullWidth
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                onKeyPress={handleKeyPress}
                                error={!!error}
                                helperText={error}
                                sx={inputFieldStyle}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={iconStyle} />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* Send OTP Button */}
                            <Button
                                type="button"
                                endIcon={!btnLoader && <Send />}
                                fullWidth
                                variant="contained"
                                disabled={btnLoader}
                                onClick={handleSendOtp}
                                sx={mainBtnStyle}
                            >
                                {btnLoader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Send Verification Code"}
                            </Button>

                            <Divider sx={{ my: 3, borderColor: '#E5E7EB' }}>
                                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>Remember your password?</Typography>
                            </Divider>

                            {/* Back to Login Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<ArrowBack />}
                                onClick={() => navigate('/login')}
                                sx={secondaryBtnStyle}
                            >
                                Back to Login
                            </Button>

                            {/* Register Link */}
                            <Typography mt={3} textAlign="center" fontSize="13px" sx={{ color: "#6B7280" }}>
                                Don't have an account?{" "}
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Box component="span" sx={registerLinkStyle}>
                                        Create Account
                                    </Box>
                                </Link>
                            </Typography>
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

const iconContainer = {
    display: "flex",
    justifyContent: "center",
    mb: 2
};

const lockIconStyle = {
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
    mb: 1.5,
    fontSize: { xs: '28px', sm: '32px' }
};

const subtitleStyle = {
    color: "#6B7280",
    textAlign: 'center',
    mb: 4,
    fontSize: '14px',
    maxWidth: "400px",
    margin: "0 auto 32px auto"
};

const alertStyle = {
    mb: 3,
    borderRadius: "12px"
};

const inputFieldStyle = {
    mb: 3,
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
        fontSize: "11px",
        color: "#EF4444"
    }
};

const iconStyle = { 
    color: "#4F46E5", 
    fontSize: '20px' 
};

const mainBtnStyle = {
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

const registerLinkStyle = {
    color: "#4F46E5",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    '&:hover': { 
        textDecoration: 'underline',
        opacity: 0.8
    }
};

export default ForgetPassword;