import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
// import Divider from "@mui/material/Divider";

const UpdatePassword = () => {
    const email = localStorage.getItem('resetEmail')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()


    const handleUpdate = async () => {

        if (newPassword) {
            try {
                await axios.post(`${api}/api/user/reset-password`, { email, newPassword })

                localStorage.removeItem('resetEmail')
                toast.success("Password updated successfully")
                navigate('/login')

            } catch (error) {
                console.log(error);
                toast.error("Something went wrong")

            }
        } else {
            toast.error("Please enter a new password")
        }
    }


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 380,
                    p: 4,
                    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    mb={3}
                    sx={{ color: "#fff" }}
                >
                    New Password
                </Typography>

                {/* Email */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}

                    InputLabelProps={{ style: { color: "#aaa" } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon sx={{ color: "#aaa" }} />
                            </InputAdornment>
                        ),
                        style: { color: "#fff" },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#444" },
                            "&:hover fieldset": { borderColor: "#666" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                    }}
                />

                {/* Register Button */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleUpdate}
                >
                    Update
                </Button>

                <Divider>OR</Divider>
                {/* Login Button */}
                <Link to={'/login'}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderColor: "#555",
                            color: "#fff",
                            "&:hover": {
                                borderColor: "#1976d2",
                                backgroundColor: "rgba(25,118,210,0.1)",
                            },
                        }}
                    >
                        Login
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default UpdatePassword;