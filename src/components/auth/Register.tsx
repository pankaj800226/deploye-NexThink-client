import {
    Box,
    Button,
    CircularProgress,
    Container,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    Avatar,
    IconButton,
    Fade,
    Divider
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { api } from "../../api/api";
import { motion } from "framer-motion";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const [errors, setErrors] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error("File too large! Max 2MB.");
                e.target.value = "";
                return;
            }
            if (!selectedFile.type.includes('image')) {
                toast.error("Please upload an image file");
                e.target.value = "";
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleRegister = async () => {
        let hasError = false;
        const newErrors = { username: "", email: "", password: "" };

        if (!username.trim()) {
            newErrors.username = "Username is required";
            hasError = true;
        } else if (username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
            hasError = true;
        }

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
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 6 characters";
            hasError = true;
        }

        setErrors(newErrors);
        if (hasError) return;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (file) formData.append('file', file);

        setBtnLoader(true);
        try {
            const res = await axios.post(`${api}/api/user/register`, formData);
            if (res.data.code === 401) {
                toast.error("User already exists");
            } else {
                toast.success("Registration Successful!");
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setBtnLoader(false);
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

                            <Typography variant="h4" sx={titleStyle}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" sx={subtitleStyle}>
                                Join us and start your journey
                            </Typography>

                            {/* Profile Photo Section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        src={preview || ""}
                                        sx={avatarStyle}
                                    >
                                        {!preview && <PersonIcon sx={{ fontSize: 40, color: '#9CA3AF' }} />}
                                    </Avatar>
                                    {preview && (
                                        <IconButton
                                            size="small"
                                            onClick={() => { setPreview(null); setFile(null); }}
                                            sx={removeBtnStyle}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                                <Button
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    sx={uploadBtnStyle}
                                >
                                    {file ? "Change Photo" : "Upload Profile Photo"}
                                    <input hidden type="file" accept="image/*" onChange={handleFile} />
                                </Button>
                                <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 0.5 }}>
                                    Max 2MB, JPG or PNG
                                </Typography>
                            </Box>

                            <TextField
                                fullWidth
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username}
                                sx={inputFieldStyle}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><PersonIcon sx={iconStyle} /></InputAdornment>
                                }}
                            />

                            <TextField
                                fullWidth
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={inputFieldStyle}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><EmailIcon sx={iconStyle} /></InputAdornment>
                                }}
                            />

                            <TextField
                                fullWidth
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                sx={inputFieldStyle}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon sx={iconStyle} /></InputAdornment>
                                }}
                            />

                            <Button
                                fullWidth
                                disabled={btnLoader}
                                onClick={handleRegister}
                                sx={mainBtnStyle}
                            >
                                {btnLoader ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Sign Up"}
                            </Button>

                            <Divider sx={{ my: 3, borderColor: '#E5E7EB' }}>
                                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>Already have an account?</Typography>
                            </Divider>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => navigate('/login')}
                                sx={secondaryBtnStyle}
                            >
                                Sign In
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
    mb: 3,
    fontSize: '14px'
};

const avatarStyle = {
    width: 100,
    height: 100,
    mb: 1.5,
    border: "3px solid #4F46E5",
    bgcolor: "#F9FAFB",
    boxShadow: "0 4px 14px rgba(79, 70, 229, 0.2)",
    transition: "all 0.3s ease",
    '&:hover': {
        transform: "scale(1.05)",
        boxShadow: "0 6px 20px rgba(79, 70, 229, 0.3)"
    }
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

const uploadBtnStyle = {
    textTransform: 'none',
    color: '#4F46E5',
    fontSize: '0.8rem',
    fontWeight: 600,
    mt: 1,
    '&:hover': {
        bgcolor: 'transparent',
        opacity: 0.8,
        transform: 'translateY(-1px)'
    }
};

const removeBtnStyle = {
    position: 'absolute',
    top: -8,
    right: -8,
    bgcolor: '#EF4444',
    color: '#fff',
    padding: '6px',
    width: 28,
    height: 28,
    '&:hover': {
        bgcolor: '#DC2626',
        transform: 'scale(1.1)'
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

export default Register;