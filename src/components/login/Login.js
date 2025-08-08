// src/components/login/Login.js
import React, { useState, useContext } from "react";
import { Container, Box, Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";

// API URL aus der Umgebungsvariablen (Fallback: http://127.0.0.1:8000)
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Login = () => {
  const { isLoggedIn, setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      setError("Bitte E-Mail und Passwort eingeben.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        navigate("/blogForm");
      } else {
        setError(data.message || "Fehler beim Einloggen");
      }
    } catch (err) {
      setError("Serverfehler");
    }
  };

  const handleLogout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {isLoggedIn ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Du bist bereits eingeloggt!
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 1 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Einloggen
            </Typography>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Einloggen
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Login;
