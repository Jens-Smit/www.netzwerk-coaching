import React, { useRef } from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { motion, useInView } from "framer-motion";
import beratungImage from "../../assets/beratung.png";

const skills = [
  { name: "Selbstreflexion", level: 95 },
  { name: "Kommunikation", level: 90 },
  { name: "Empathie", level: 85 },
  { name: "Motivation", level: 80 },
  { name: "Resilienz", level: 75 },
];

// Animationsvarianten
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const skillVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: (custom) => ({
    opacity: 1,
    width: `${custom}%`,
    transition: { duration: 1, ease: "easeOut" },
  }),
};

const Skills = () => {
  // Refs für die Beobachtung
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const skillsRef = useRef(null);

  // useInView: Animationen nur starten, wenn das Element zu 25% sichtbar ist
  const imgInView = useInView(imgRef, { triggerOnce: true, threshold: 0.25 });
  const textInView = useInView(textRef, { triggerOnce: true, threshold: 0.25 });
  const skillsInView = useInView(skillsRef, { triggerOnce: true, threshold: 0.25 });

  return (
    <motion.div>
      {/* Sektion: Bild & Beschreibung */}
      <Box sx={{ p: 4, maxWidth: 1600, mx: "auto" }}>
        <motion.div ref={imgRef} initial="hidden" animate={imgInView ? "visible" : "hidden"} variants={zoomIn}>
          <CardMedia
            component="img"
            image={beratungImage}
            alt="Beratung"
            sx={{
              maxWidth: 600,
              width: "100%",
              display: "block",
              mx: "auto",
              mb: 3,
              borderRadius: 2,
              boxShadow: 5,
            }}
          />
        </motion.div>

        <motion.div ref={textRef} initial="hidden" animate={textInView ? "visible" : "hidden"} variants={fadeInUp}>
          <Typography
            variant="body1"
            sx={{ textAlign: "left", color: "#555", mb: 4, fontWeight: "bold" }}
          >
            Als erfahrener Coach biete ich Ihnen maßgeschneiderte Beratung und
            praxisorientierte Trainings, die auf Ihre individuellen Bedürfnisse
            zugeschnitten sind. Mit meiner Expertise unterstütze ich Sie dabei,
            persönliche und berufliche Herausforderungen erfolgreich zu meistern
            und nachhaltige Lösungen zu entwickeln. Gemeinsam arbeiten wir an der
            Entfaltung Ihres vollen Potenzials und der Erreichung Ihrer Ziele.
          </Typography>
        </motion.div>
      </Box>

      {/* Sektion: Skills */}
      <motion.div ref={skillsRef} initial="hidden" animate={skillsInView ? "visible" : "hidden"} variants={fadeInUp}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
            p: 4,
            borderRadius: 2,
            boxShadow: 10,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              textAlign: "center",
              mb: 4,
              fontWeight: "bold",
            }}
          >
            Skills
          </Typography>

          <motion.div variants={containerVariants} initial="hidden" animate={skillsInView ? "visible" : "hidden"}>
            {skills.map((skill, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                  {skill.name}
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    height: 10,
                    borderRadius: 5,
                    background: "#555",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    custom={skill.level}
                    variants={skillVariants}
                    initial="hidden"
                    animate={skillsInView ? "visible" : "hidden"}
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(13,71,161,0.8), rgba(255,111,0,0.8))",
                      borderRadius: 5,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </motion.div>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
