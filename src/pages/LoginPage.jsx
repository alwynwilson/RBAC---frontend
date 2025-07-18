import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Header from "../components/HeaderAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loginAPI } from "../services/allAPI";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
    
  };

  const handleLogin = async () => {
    try {
      const res = await loginAPI(form);
      
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      setError(message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 8,
          }}
        >
          <Typography variant="h5">Login Portal</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <p>
            For admins registration. Click
            <Link to={"/register-admin"}> here</Link>
          </p>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
