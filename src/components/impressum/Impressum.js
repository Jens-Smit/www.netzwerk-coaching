import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Impressum = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Impressum
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Angaben gemäß § 5 TMG</Typography>
        <Typography variant="body2">
          Dein Unternehmen <br />
          Musterstraße 1 <br />
          12345 Musterstadt <br />
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Vertreten durch:</Typography>
        <Typography variant="body2">Max Mustermann</Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Kontakt:</Typography>
        <Typography variant="body2">
          Telefon: 01234 / 567890 <br />
          E-Mail: info@deinunternehmen.de
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Umsatzsteuer-ID:</Typography>
        <Typography variant="body2">DE123456789</Typography>
      </Box>
    </Container>
  );
};

export default Impressum;
