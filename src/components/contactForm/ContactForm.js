import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setStatus("Bitte bestätigen Sie, dass Sie kein Bot sind.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captcha: captchaValue }),
      });

      if (response.ok) {
        setStatus("Ihre Nachricht wurde erfolgreich gesendet.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Beim Senden der Nachricht ist ein Fehler aufgetreten.");
      }
    } catch (error) {
      setStatus("Serverfehler. Bitte versuchen Sie es später erneut.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", p: 2 }}
    >
     
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="E-Mail"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Betreff"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Nachricht"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={handleCaptchaChange}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Absenden
      </Button>
      {status && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;
