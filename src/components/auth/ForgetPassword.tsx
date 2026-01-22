import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { Send } from '@mui/icons-material'
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import { CircularProgress } from "@mui/material";

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [btnLoader, setBtnLoader] = useState(false)
    const navigate = useNavigate()



    const handleSendOtp = async () => {
        if (email) {
            localStorage.setItem("resetEmail", email);

            setBtnLoader(true)
            try {
                await axios.post(`${api}/api/user/forgot-password`, { email })
                toast.success("OTP sent successfully! Check Your Email");

                navigate('/otpverify')
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong')
            } finally {
                setBtnLoader(false)
            }
        } else {
            return toast.error('Please enter email')
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
                    Forget Password
                </Typography>

                {/* Email */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                {/* Send otp Button */}
                <Button
                    type="button"
                    endIcon={<Send />}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleSendOtp}
                >
                    {btnLoader ? <CircularProgress size={25} /> : "Send OTP"}
                </Button>

                {/* OR Divider */}
                <Divider sx={{ my: 1, color: "#777" }}>OR</Divider>

                {/* Login Button */}
                <Link to={'/register'}>
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
                        Register
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default ForgetPassword;