import {
    Box,
    Button,
    CircularProgress,
    Container,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { api } from "../../api/api";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [btnLoader, setBtnLoader] = useState(false)
    const navigate = useNavigate()

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };


    const handleRegister = async () => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)

        if (file) {
            formData.append('file', file)
        }

        if (username && email && password) {
            setBtnLoader(true)
            try {
                const res = await axios.post(`${api}/api/user/register`, formData)
                console.log(res);

                if (res.data.code === 401) {
                    toast.error("User allready exist")
                } else if (res.data.code === 200) {
                    toast.success("Register Sucessfull")
                    navigate('/login')
                }

            } catch (error) {
                console.log(error);
                toast.error("error")

            } finally {
                setBtnLoader(false)
            }
        } else {
            toast.error("All field are required")
        }
    }

    return (
        <Box
            sx={{
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        background: "#111",
                        borderRadius: "14px",
                        boxShadow: "0 0 25px rgba(0,255,255,0.15)"
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        mb={3}
                        sx={{ color: "#0ff", fontWeight: "bold" }}
                    >
                        Register
                    </Typography>

                    {/* Username */}
                    <TextField
                        fullWidth
                        placeholder="Username"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: "#0ff" }} />
                                </InputAdornment>
                            )
                        }}
                        sx={inputStyle}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        placeholder="Email Address"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: "#0ff" }} />
                                </InputAdornment>
                            )
                        }}
                        sx={inputStyle}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        placeholder="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: "#0ff" }} />
                                </InputAdornment>
                            )
                        }}
                        sx={inputStyle}
                    />

                    {/* Upload Profile Image */}
                    <Button
                        fullWidth
                        component="label"
                        sx={{
                            mt: 2,
                            py: 1.2,
                            border: "1px dashed #0ff",
                            color: "#0ff",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "rgba(0,255,255,0.08)"
                            }
                        }}
                    >
                        {file ? file.name : "Upload Profile Photo"}
                        <input hidden type="file" accept="image/*" onChange={handleFile} />
                    </Button>


                    {/* Register Button */}
                    <Button
                        fullWidth
                        onClick={handleRegister}
                        sx={{
                            mt: 3,
                            py: 1.3,
                            background: "linear-gradient(45deg, #00f2ff, #00ff9d)",
                            color: "#000",
                            fontWeight: "bold",
                            "&:hover": {
                                background: "linear-gradient(45deg, #00ff9d, #00f2ff)"
                            }
                        }}
                    >
                        {btnLoader ? <CircularProgress size={20} /> : "Register Now"}
                    </Button>

                    <Typography
                        mt={2}
                        textAlign="center"
                        fontSize="14px"
                        sx={{ color: "#aaa" }}
                    >
                        Already have an account?{" "}
                        <Link to="/login">
                            <span style={{ color: "#0ff", cursor: "pointer" }}>
                                Login
                            </span>
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

const inputStyle = {
    input: { color: "#fff" },
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#333"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0ff"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00ffea"
    }
};

export default Register;
