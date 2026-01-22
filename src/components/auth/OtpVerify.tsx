import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "@mui/icons-material";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";
import Countdown from 'react-countdown'

const OtpVerify = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem("resetEmail");


    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleOtpVerify = async () => {
        try {
            await axios.post(`${api}/api/user/otpVerify`, { email, otp: otp.join("") })
            navigate('/updatepassword')

            toast.success("OTP Verified Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Invalid OTP");

        }
    };

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
                <Typography variant="h5" align="center" mb={3} color="#fff">
                    OTP Verification
                </Typography>

                {/* OTP Inputs */}
                <Box display="flex" justifyContent="space-between">
                    {otp.map((digit, index) => (
                        <TextField
                            key={index}
                            inputRef={(el) => (inputsRef.current[index] = el)}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            inputProps={{
                                maxLength: 1,
                                style: {
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#fff",
                                },
                            }}
                            sx={{
                                width: 48,
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#444" },
                                    "&:hover fieldset": { borderColor: "#666" },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#1976d2",
                                    },
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Verify Button */}
                <Button
                    disabled={otp.some((digit) => digit === "")}
                    endIcon={<Send />}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleOtpVerify}
                >
                    Verify
                </Button>

                <Divider sx={{ my: 2, color: "#777" }}>OR</Divider>

                <Link to="/login" style={{ textDecoration: "none" }}>
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

                <Countdown
                    renderer={({ minutes, seconds, completed }) => {
                        if (completed) {
                            return <Button variant="text">resend</Button>
                        } else {
                            return <span>
                                {minutes} : {seconds < 10 ? `0${seconds}` : seconds}{""}
                            </span>
                        }
                    }}
                    date={new Date().getTime() + 10 * 60 * 1000}
                />

            </Box>
        </Box>
    );
};

export default OtpVerify;