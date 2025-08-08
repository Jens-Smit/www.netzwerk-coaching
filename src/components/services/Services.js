import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { keyframes } from "@emotion/react";

// Icons aus der Material-UI-Icons-Bibliothek
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import GroupsIcon from "@mui/icons-material/Groups";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Services = () => {
  return (
    <Box
      id="services"
      sx={{
        my: 4,
        animation: `${fadeInUp} 1s ease-out`,
        animationDelay: "0.5s",
        animationFillMode: "both",
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        
      </Typography>
      <Grid container spacing={3}>
        {/* Individuelles Coaching */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <SelfImprovementIcon sx={{ fontSize: "4rem", color: "primary.main" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Individuelles Coaching
            </Typography>
            <Typography variant="body2">
              Persönliche Begleitung und Beratung für Ihre berufliche und private Entwicklung.
            </Typography>
          </Paper>
        </Grid>
        {/* Workshops */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <GroupsIcon sx={{ fontSize: "4rem", color: "primary.main" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Workshops
            </Typography>
            <Typography variant="body2">
              Interaktive Sessions zur Förderung von Teamarbeit und Kreativität.
            </Typography>
          </Paper>
        </Grid>
        {/* Speaking */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <RecordVoiceOverIcon sx={{ fontSize: "4rem", color: "primary.main" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Speaking
            </Typography>
            <Typography variant="body2">
              Inspirierende Vorträge zu Themen wie Führung, Motivation und persönlicher Weiterentwicklung, die Ihr Publikum begeistern und zum Nachdenken anregen.
            </Typography>
          </Paper>
        </Grid>
        {/* Consulting */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <BusinessCenterIcon sx={{ fontSize: "4rem", color: "primary.main" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Consulting
            </Typography>
            <Typography variant="body2">
              Individuelle Beratungsdienste zur Entwicklung persönlicher Fähigkeiten und zur Optimierung der persönlichen und beruflichen Zielerreichung.
            </Typography>
          </Paper>
        </Grid>
        {/* Seminare */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <SchoolIcon sx={{ fontSize: "4rem", color: "primary.main" }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Seminare
            </Typography>
            <Typography variant="body2">
              Vertiefende Seminare für Führungskräfte und Fachkräfte.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
