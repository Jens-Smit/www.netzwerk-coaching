// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";

import BlogForm from "./components/blogForm/BlogForm";
import Login from "./components/login/Login";
import News from "./components/news/News";
import Registration from "./components/registration/Registration";
import Datenschutz from "./components/datenschutz/Datenschutz";
import Impressum from "./components/impressum/Impressum";
import Footer from "./components/footer/Footer";
import ContactForm from "./components/contactForm/ContactForm";
import { AuthProvider } from "./components/authContext/AuthContext";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D47A1",
    },
    secondary: {
      main: "#FF6F00",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});

// Layout-Komponente, die die Navigation nur anzeigt, wenn der Pfad nicht "/" ist
const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogForm" element={<BlogForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/contactForm/" element={<ContactForm />} />
      </Routes>
      <Footer /> {/* Footer wird global eingebunden */}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
