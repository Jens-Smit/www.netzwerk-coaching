import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import personality from "../../assets/personality.png";

const personalityItems = [
  {
    title: "Selbstbewusstsein",
    text: "Herausforderungen annehmen und Risiken eingehen.",
    style: { transform: "translateX(10%)" },
  },
  {
    title: "Emotionale Intelligenz",
    text: "Eigene und fremde Emotionen verstehen.",
    style: { transform: "translateX(10%)" },
  },
  {
    title: "Resilienz",
    text: "Rückschläge überwinden und gestärkt hervorgehen.",
    style: { transform: "translateX(10%)" },
  },
  {
    title: "Kommunikations-fähigkeiten",
    text: "Ideen klar und überzeugend vermitteln.",
    style: { transform: "translateX(130%)" },
  },
  {
    title: "Zielorientierung",
    text: "Klare Ziele setzen und konsequent verfolgen.",
    style: { transform: "translateX(130%)" },
  },
  {
    title: "Authentizität",
    text: "Echte Werte leben und Vertrauen schaffen.",
    style: { transform: "translateX(130%)" },
  },
];

// Variante für die Items (Fade-in mit leichter Verschiebung)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.3 + i * 0.2 },
  }),
};

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        position: "relative",
        width: "100%",
        height: "max-content",
        borderRadius: 2,
        paddingTop: "2rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        my: 4,
      }}
    >
      {/* Zentrales Icon mit Rotationseffekt */}
      <motion.img
        src={personality}
        alt="personality"
        style={{
          position: "absolute",
          bottom: "0%",
          left: "4%",
          width: "40%",
          objectFit: "cover",
          zIndex: 2,
        }}
        whileInView={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        viewport={{ amount: 0.25, once: false }}
      />

      {/* Beschriftung mit Puls-Effekt */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          right: "6%",
          width: "40%",
          textAlign: "center",
          zIndex: 2,
        }}
        whileInView={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        viewport={{ amount: 0.25, once: false }}
      >
        <Typography
          gutterBottom
          color="primary"
          sx={{ fontSize: { xs: "25px", md: "35px" } }}
        >
          Persönlichkeit <br />
          verbindet
        </Typography>
      </motion.div>

      {/* Rendern der Items */}
      {personalityItems.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25, once: false }}
        >
          <Box
            sx={{
              ...item.style,
              width: "33%",
              height: "100px",
              background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
              margin: "1rem",
              padding: "1rem",
              overflow: "hidden",
              boxShadow: "3px 3px 15px rgba(13, 71, 161, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="body2">{item.text}</Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

export default About;
