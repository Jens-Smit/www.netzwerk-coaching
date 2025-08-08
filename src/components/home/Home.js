// Home.js
import React from "react"; 
import { Container, Box } from "@mui/material";
import HeroSection from "../heroSection/HeroSection";
import Navigation from "../navigation/Navigation"; // Navigation importieren
import About from "../about/About";
import Lebenslauf from "../lebenslauf/Lebenslauf";
import Skills from "../skills/Skills";
import Services from "../services/Services";
import Blog from "../blog/Blog";
import ContactForm from "../contactForm/ContactForm";


const Home = () => {
  return (
    <>
      <HeroSection />
      {/* Navigation direkt unter der HeroSection mit sticky-Option */}
      <Navigation sticky />
      <Container sx={{ my: 4 }}>
        <Services />
        <Lebenslauf />
        <Skills />
        <About />
        
        <Box id="blog" sx={{ my: 4 }}>
          <Blog />
        </Box>
        <ContactForm />
      </Container>
    </>
  );
};

export default Home;
