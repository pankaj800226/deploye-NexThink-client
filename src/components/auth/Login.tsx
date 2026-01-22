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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoader, setBtnLoader] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {

    if (email && password) {
      setBtnLoader(true)
      try {
        const res = await axios.post(`${api}/api/user/login`, { email, password })

        if (res.data.code === 404) {
          toast("User Not Found")
        } else if (res.data.code === 405) {
          toast("Password Invilid")
        } else if (res.data.code === 200) {
          window.localStorage.setItem('USERNAME', res.data.username)
          window.localStorage.setItem('EMAIL', res.data.email)
          window.localStorage.setItem('USERID', res.data.userId)
          window.localStorage.setItem('TOKEN', res.data.token)
          window.localStorage.setItem('AVATAR', res.data.avatar)
          navigate('/')
        }
      } catch (error) {
        console.log(error);
        toast.error("Error")

      } finally {
        setBtnLoader(false)
      }

    } else {
      toast.error("All Field are required")
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
            Login
          </Typography>


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

          <Button
            fullWidth
            onClick={handleLogin}
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
            {btnLoader ? <CircularProgress size={20} /> : "Login"}
          </Button>

          <Typography
            mt={2}
            textAlign="center"
            fontSize="14px"
            sx={{ color: "#aaa" }}
          >
            Already have an account?{" "}
            <Link to={'/register'}>
              <span style={{ color: "#0ff", cursor: "pointer" }}>Register</span>
            </Link>
          </Typography>

          <Typography
            mt={2}
            textAlign="center"
            fontSize="14px"
            sx={{ color: "#aaa" }}
          >
            Forget Password?{" "}
            <Link to={'/forgetpassword'}>
              <span style={{ color: "#0ff", cursor: "pointer" }}>Forget Password</span>
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

export default Login;
