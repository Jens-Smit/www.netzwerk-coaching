// src/components/registration/Registration.js
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, Avatar } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

// API URL aus der Umgebungsvariablen (Fallback: http://127.0.0.1:8000)
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const Registration = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Registrierung erfolgreich. Bitte logge dich ein.");
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Fehler bei der Registrierung.");
        setSuccess("");
      }
    } catch (err) {
      setError("Serverfehler");
      setSuccess("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 1 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" component="h1">
            Registrieren
          </Typography>
        </Box>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <TextField
          label="E-Mail"
          fullWidth
          margin="normal"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <TextField
          label="Passwort"
          fullWidth
          margin="normal"
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
          Registrieren
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" sx={{ mt: 2, textAlign: "center" }}>
            {success}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Registration;
