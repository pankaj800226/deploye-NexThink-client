import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import {  useNavigate } from "react-router-dom";
import { Send, ArrowBack, VerifiedUser, Refresh } from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import Countdown from 'react-countdown';
import { motion } from "framer-motion";

const OtpVerify = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [countdownKey, setCountdownKey] = useState(Date.now());
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            navigate('/forgetpassword');
        }
        // Auto-focus first input on mount
        setTimeout(() => {
            inputsRef.current[0]?.focus();
        }, 100);
    }, [email, navigate]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === 'Enter') {
            handleOtpVerify();
        }
    };

    const handleOtpVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter complete 6-digit OTP");
            return;
        }

        setBtnLoader(true);
        try {
            await axios.post(`${api}/api/user/otpVerify`, { email, otp: otpValue });
            toast.success("OTP Verified Successfully");
            setTimeout(() => navigate('/updatepassword'), 1000);
        } catch (error) {
            console.log(error);
            toast.error("Invalid OTP");
            setError("Invalid OTP. Please try again.");
        } finally {
            setBtnLoader(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoader(true);
        try {
            await axios.post(`${api}/api/user/forgot-password`, { email });
            toast.success("OTP resent successfully!");
            setCountdownKey(Date.now());
            setOtp(["", "", "", "", "", ""]);
            inputsRef.current[0]?.focus();
        } catch (error) {
            console.log(error);
            toast.error("Failed to resend OTP");
        } finally {
            setResendLoader(false);
        }
    };

    const Completionist = () => (
        <Button
            variant="text"
            onClick={handleResendOtp}
            disabled={resendLoader}
            sx={{
                color: "#4F46E5",
                fontSize: "13px",
                textTransform: "none",
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: "#EEF2FF"
                }
            }}
        >
            {resendLoader ? "Sending..." : "Resend Code"}
        </Button>
    );

    const renderer = ({ minutes, seconds, completed }: any) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Refresh sx={{ fontSize: 14, color: "#6B7280" }} />
                    <Typography variant="caption" sx={{ color: "#6B7280", fontFamily: 'monospace' }}>
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </Typography>
                </Box>
            );
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
                                <VerifiedUser sx={iconStyle} />
                            </Box>

                            <Typography variant="h4" sx={titleStyle}>
                                Verify OTP
                            </Typography>
                            <Typography variant="body2" sx={subtitleStyle}>
                                We've sent a 6-digit verification code to
                                <Box component="span" sx={{ display: 'block', color: "#4F46E5", fontWeight: 600, mt: 0.5 }}>
                                    {email || "your email"}
                                </Box>
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={alertStyle}>
                                    {error}
                                </Alert>
                            )}

                            {/* OTP Inputs */}
                            <Box sx={otpContainerStyle}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        inputRef={(el) => (inputsRef.current[index] = el)}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: "center",
                                                fontSize: "24px",
                                                fontWeight: 600,
                                                color: "#1F2937",
                                                padding: "12px 0"
                                            }
                                        }}
                                        sx={otpInputStyle}
                                    />
                                ))}
                            </Box>

                            {/* Verify Button */}
                            <Button
                                disabled={otp.some((digit) => digit === "") || btnLoader}
                                endIcon={!btnLoader && <Send />}
                                fullWidth
                                variant="contained"
                                onClick={handleOtpVerify}
                                sx={mainBtnStyle}
                            >
                                {btnLoader ? "Verifying..." : "Verify Code"}
                            </Button>

                            {/* Countdown Timer */}
                            <Box sx={timerContainerStyle}>
                                <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                    Code expires in:
                                </Typography>
                                <Countdown
                                    key={countdownKey}
                                    renderer={renderer}
                                    date={Date.now() + 10 * 60 * 1000}
                                />
                            </Box>

                            <Divider sx={{ my: 3, borderColor: '#E5E7EB' }}>
                                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>Need help?</Typography>
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

const otpContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: { xs: 1, sm: 2 },
    mb: 3
};

const otpInputStyle = {
    width: { xs: 45, sm: 55 },
    '& .MuiOutlinedInput-root': {
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
    }
};

const timerContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    mt: 3,
    mb: 1,
    p: 1,
    borderRadius: "20px",
    backgroundColor: "#F9FAFB"
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

export default OtpVerify;