import React, { useRef, useState, useLayoutEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    title: "Geburt",
    date: "1985",
    description: "Geboren in Musterstadt – der Anfang einer spannenden Reise.",
  },
  {
    title: "Schulabschluss",
    date: "2003",
    description:
      "Abschluss an der Musterschule. Erste Erfahrungen in sozialer Interaktion.",
  },
  {
    title: "Studium der Psychologie",
    date: "2004 – 2008",
    description:
      "Studium an der Universität Musterstadt mit Schwerpunkt auf Persönlichkeitsentwicklung.",
  },
  {
    title: "Beruflicher Einstieg",
    date: "2009",
    description:
      "Beginn der beruflichen Laufbahn im Bereich Beratung und Coaching.",
  },
  {
    title: "Zertifizierter Coach",
    date: "2012",
    description:
      "Erfolgreiche Zertifizierung als Coach – ein Meilenstein in der beruflichen Entwicklung.",
  },
  {
    title: "Gründung der Coachingpraxis",
    date: "2015",
    description:
      "Aufbau einer eigenen Praxis zur Förderung von persönlichem Wachstum und Entwicklung.",
  },
];

const TimelineItem = ({ event, scaleY, lineHeight, containerRef }) => {
  const highlightRef = useRef(null);
  const [active, setActive] = useState(false);
  const [offsetTop, setOffsetTop] = useState(0);

  // Ermittle den Mittelpunkt des Highlight-Punktes relativ zum Container
  useLayoutEffect(() => {
    if (containerRef.current && highlightRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const highlightRect = highlightRef.current.getBoundingClientRect();
      setOffsetTop(
        highlightRect.top - containerRect.top + highlightRect.height / 2
      );
    }
  }, [containerRef]);

  // Prüfe, ob der gefüllte Anteil der Linie den Mittelpunkt erreicht oder überschritten hat
  useLayoutEffect(() => {
    const unsubscribe = scaleY.onChange((latest) => {
      if (lineHeight) {
        const effectiveHeight = latest * lineHeight;
        setActive(effectiveHeight >= offsetTop);
      }
    });
    return unsubscribe;
  }, [scaleY, lineHeight, offsetTop]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.8 }}
      style={{ position: "relative", marginBottom: "2rem" }}
    >
      {/* Timeline-Punkt als "Highlight" – bleibt eingefärbt, wenn die Linie darüber ist */}
      <Box
        ref={highlightRef}
        sx={{
          position: "absolute",
          left: -28, // Mittelpunkt des Kreises liegt dann bei (-28 + 8 = -20)
          top: 0,
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: active ? "rgba(13,71,161,1)" : "transparent",
          border: "4px solid rgba(13,71,161,0.8)",
          boxShadow: "0px 0px 8px rgba(33,203,243,0.8)",
          transition: "background-color 0.3s ease",
        }}
      />
      <Box sx={{ ml: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
          {event.date}
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          {event.description}
        </Typography>
      </Box>
    </motion.div>
  );
};

const Lebenslauf = () => {
  const containerRef = useRef(null);
  const lastEventRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Berechne die Höhe der animierten Linie: von oben bis zur Mitte des letzten Kreises
  useLayoutEffect(() => {
    if (containerRef.current && lastEventRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const lastEventRect = lastEventRef.current.getBoundingClientRect();
      const lastEventCenter = lastEventRect.top + lastEventRect.height / 2;
      setLineHeight(lastEventCenter - containerRect.top);
    }
  }, []);

  // Ermittelt den Scrollfortschritt relativ zum Container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // Der Animationseffekt startet 25 % später und endet 25 % früher
  const scaleY = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);

  return (
    <Box
      sx={{
        
        p: 4,
        borderRadius: 3,
       
        maxWidth: 800,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
      >
       
      </Typography>
      <Box ref={containerRef} sx={{ position: "relative", pl: 4 }}>
        {/* Animierte vertikale Linie – Höhe bis zur Mitte des letzten Kreises */}
        <motion.div
          style={{
            position: "absolute",
            left: 15, // Positioniert so, dass die Linie mittig durch die Kreise verläuft
            top: 0,
            width: 4,
            height: lineHeight,
            background:
              "linear-gradient(135deg, rgba(13,71,161,0.5), rgba(13,71,161,1))",
            transformOrigin: "top",
            scaleY, // Skaliert basierend auf dem Scroll-Fortschritt
          }}
        />
        {timelineEvents.map((event, index) => {
          const isLast = index === timelineEvents.length - 1;
          return (
            <div key={index} ref={isLast ? lastEventRef : null}>
              <TimelineItem
                event={event}
                scaleY={scaleY}
                lineHeight={lineHeight}
                containerRef={containerRef}
              />
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Lebenslauf;
