import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { alpha } from '@mui/material/styles';
const Footer = () => {
  return (
    <Box
      component="footer"
      
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.8),
        color: "white",
        py: 3,
        mt: 4,
        textAlign: "center",
         backdropFilter: 'blur(5px)',
      }}
    >
      <Container>
        {/* Allgemeines Copyright */}
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Ulrich Pmmerenke. Alle Rechte vorbehalten.
        </Typography>
        
        {/* Webdesign Copyright */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          Webdesign & Entwicklung von{" "}
          <Link href="https://www.deinwebdesigner.de" color="inherit" target="_blank" rel="noopener noreferrer">
            Jens Smit
          </Link>
        </Typography>

        {/* Datenschutz & Impressum Links */}
        <Box sx={{ mt: 1 }}>
          <Link component={RouterLink} to="/datenschutz" color="inherit" sx={{ mx: 1 }}>
            Datenschutz
          </Link>
          |
          <Link component={RouterLink} to="/impressum" color="inherit" sx={{ mx: 1 }}>
            Impressum
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
