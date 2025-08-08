import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Datenschutz = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Datenschutzerklärung
      </Typography>

      <Typography variant="body1" paragraph>
        Hinweis: Diese Datenschutzerklärung stellt keine Rechtsberatung dar. Für eine
        individuelle Beratung wenden Sie sich bitte an einen Fachanwalt.
      </Typography>

      <Typography variant="body1" paragraph>
        Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Der Schutz Ihrer
        persönlichen Daten hat für uns einen hohen Stellenwert. Im Folgenden informieren wir
        Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten im Rahmen der Nutzung unserer
        Website.
      </Typography>

      {/* 1. Verantwortliche Stelle */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">1. Verantwortliche Stelle</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          [Ihr Unternehmen] <br />
          Musterstraße 1 <br />
          12345 Musterstadt <br />
          Telefon: [Telefonnummer] <br />
          E-Mail: [E-Mail-Adresse]
        </Typography>
      </Box>

      {/* 2. Erhebung und Speicherung personenbezogener Daten */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">
          2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck der Verarbeitung
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Beim Besuch unserer Website werden automatisch Informationen in sogenannten Server-
          Logfiles erhoben. Diese Daten umfassen:
        </Typography>
        <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 1 }}>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Diese Daten können keiner bestimmten Person zugeordnet werden. Eine Zusammenführung
          dieser Daten mit anderen Datenquellen findet nicht statt.
        </Typography>
      </Box>

      {/* 3. Nutzung und Weitergabe personenbezogener Daten */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">3. Nutzung und Weitergabe personenbezogener Daten</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Personenbezogene Daten werden von uns nur dann erhoben, wenn Sie uns diese
          freiwillig, beispielsweise im Rahmen einer Anfrage, Registrierung oder Bestellung,
          zur Verfügung stellen. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer
          Anfrage bzw. zur Durchführung der vereinbarten Leistungen. Eine Weitergabe an Dritte
          erfolgt nur, wenn dies zur Vertragserfüllung erforderlich ist oder wir gesetzlich
          dazu verpflichtet sind.
        </Typography>
      </Box>

      {/* 4. Cookies */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">4. Cookies</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Unsere Website verwendet sogenannte Cookies. Cookies sind kleine Textdateien, die auf
          Ihrem Endgerät gespeichert werden. Sie dienen dazu, unser Angebot nutzerfreundlicher,
          effektiver und sicherer zu machen. Einige Cookies bleiben auf Ihrem Endgerät gespeichert,
          bis Sie diese löschen. Andere werden nach dem Schließen Ihres Browsers wieder gelöscht.
        </Typography>
      </Box>

      {/* 5. Social Media Plugins */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">5. Social Media Plugins</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Wir binden auf unserer Website Plugins von sozialen Netzwerken ein. Diese Plugins
          ermöglichen Ihnen, Inhalte mit Ihren Freunden zu teilen oder uns zu folgen. Beim
          Besuch unserer Website können Daten an die Server der jeweiligen Anbieter übermittelt
          werden. Bitte informieren Sie sich in den Datenschutzerklärungen der jeweiligen Anbieter.
        </Typography>
      </Box>

      {/* 6. Datensicherheit */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">6. Datensicherheit</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre
          durch uns verwalteten Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust,
          Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheits-
          Maßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
        </Typography>
      </Box>

      {/* 7. Ihre Rechte */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">7. Ihre Rechte</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Sie haben das Recht, jederzeit Auskunft über Ihre bei uns gespeicherten personenbezogenen
          Daten zu erhalten. Zudem haben Sie das Recht auf Berichtigung, Sperrung oder, abgesehen von
          der vorgeschriebenen Datenspeicherung, Löschung Ihrer personenbezogenen Daten. Bitte wenden Sie
          sich hierzu an die im Abschnitt "1. Verantwortliche Stelle" genannten Kontaktdaten.
        </Typography>
      </Box>

      {/* 8. Kontakt zum Datenschutzbeauftragten */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">8. Kontakt zum Datenschutzbeauftragten</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Bei Fragen zum Datenschutz wenden Sie sich bitte an unseren Datenschutzbeauftragten:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          E-Mail: [Datenschutz@IhrUnternehmen.de]
        </Typography>
      </Box>

      {/* 9. Aktualität der Datenschutzerklärung */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Stand: [Datum der Erstellung bzw. letzten Aktualisierung]
        </Typography>
      </Box>
    </Container>
  );
};

export default Datenschutz;
