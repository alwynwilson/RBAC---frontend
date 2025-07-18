import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderAuth";
import { registerAdminAPI } from "../services/allAPI";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
  try {
    const response = await registerAdminAPI(form);
    console.log(response.message);
    if (response.status === 201 || response.status === 200) {
      setError("Super admin registered successfully");
      setForm({ username: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (response.status === 403) {
      setError("Super Admin already exists");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setError("Unexpected response from server");
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      <Header />
      <Container maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 8 }}>
          <Typography variant="h5">Register Portal</Typography>
          {error && (
            <Typography
              sx={{ mt: 1 }}
              color={
                error === "Super admin registered successfully"
                  ? "success.main"
                  : "error"
              }
            >
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
            name="username"
            onChange={handleChange}
            fullWidth
          />
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
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RegisterAdmin;
