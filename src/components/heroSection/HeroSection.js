import React from "react";
import { Box, Typography,Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import ulrich from "../../assets/ulrich.png"; // Pfad ggf. anpassen

// Animation für das Hereinrutschen des Textes
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

// Einfache Fade-in-Animation für das Bild
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeroSection = () => {
  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        height: "100vh", // Volle Höhe des Viewports
       
        overflow: "hidden", // Damit der Inhalt nicht über den Container hinausläuft
      }}
    >
      

      {/* Farbverlaufs-Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(13,71,161,0.8), rgba(255,111,0,0.8))",
          zIndex: 1,
        }}
      />
{/* Hintergrundbild mit langsamer Fade-in-Animation */}
<Box
        component="img"
        src={ulrich}
        alt="Ulrich"
        sx={{
          position: "absolute",
          bottom:" 0%",
          right: "0%",
          minWidth: "50%",
          maxWidth: "100%",
        
         
          objectFit: "cover",
          zIndex: 2,
          animation: `${fadeIn} 2s ease-out`,
        }}
      />
      {/* Text, der über dem Bild liegt */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "50%",
          margin: "3rem"
        }}
      >
         <Typography
      variant="h3"
      sx={{
        color: 'white',
        textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
        animation: `${fadeInUp} 1.2s ease-out`,
      }}
    >
      "Die beste Zeit, etwas zu tun, ist immer jetzt."
      <br />
      <span style={{ textAlign: 'right', display: 'block', fontStyle: 'italic', fontSize: '2rem'}}>Dalai Lama</span>
    </Typography>
        <Button variant="outlined" color="primary" size="large" component={Link} to="/contactForm">
                Network
              </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
