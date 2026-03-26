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
    Fade
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import axios from 'axios';
import { api } from "../../api/api";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const navigate = useNavigate();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        const MAX_FILE_SIZE = 900 * 1024;

        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error("File too large! Max 900KB.");
                e.target.value = "";
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleRegister = async () => {
        if (!username || !email || !password) {
            return toast.error("All fields are required");
        }

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
                navigate('/login');
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setBtnLoader(false);
        }
    };

    return (
        <Box sx={containerStyle}>
            <Container maxWidth="xs">
                <Fade in timeout={800}>
                    <Paper elevation={0} sx={glassPaperStyle}>
                        <Typography variant="h4" sx={titleStyle}>
                            CREATE ACCOUNT
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#888", textAlign: 'center', mb: 3 }}>
                            Join the digital frontier
                        </Typography>

                        {/* Profile Photo Section */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={preview || ""}
                                    sx={{ 
                                        width: 80, height: 80, mb: 1, 
                                        border: `2px solid ${preview ? '#0ff' : '#333'}`,
                                        bgcolor: '#1a1a1a' 
                                    }}
                                >
                                    {!preview && <PersonIcon sx={{ fontSize: 40, color: '#333' }} />}
                                </Avatar>
                                {preview && (
                                    <IconButton 
                                        size="small" 
                                        onClick={() => {setPreview(null); setFile(null);}}
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
                                {file ? "Change Photo" : "Upload Photo"}
                                <input hidden type="file" accept="image/*" onChange={handleFile} />
                            </Button>
                        </Box>

                        <TextField
                            fullWidth
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            {btnLoader ? <CircularProgress size={24} sx={{ color: '#000' }} /> : "INITIALIZE REGISTER"}
                        </Button>

                        <Typography mt={3} textAlign="center" fontSize="14px" sx={{ color: "#aaa" }}>
                            Already a member?{" "}
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Box component="span" sx={{ color: "#0ff", fontWeight: 'bold', "&:hover": { textDecoration: 'underline' } }}>
                                    LOGIN HERE
                                </Box>
                            </Link>
                        </Typography>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

// --- Styles ---

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

const uploadBtnStyle = {
    textTransform: 'none',
    color: '#0ff',
    fontSize: '0.8rem',
    "&:hover": { bgcolor: 'transparent', opacity: 0.8 }
};

const removeBtnStyle = {
    position: 'absolute',
    top: -5,
    right: -5,
    bgcolor: '#f44336',
    color: '#fff',
    padding: '2px',
    "&:hover": { bgcolor: '#d32f2f' }
};

const mainBtnStyle = {
    mt: 2,
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

export default Register;