import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
import { alpha } from "@mui/material/styles";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Navigation = ({ sticky }) => {
  const { isLoggedIn, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Öffnet oder schließt das mobile Drawer-Menü
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Öffnet das User-Dropdown-Menü
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Schließt das User-Dropdown-Menü
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout-Funktion
  const handleLogout = () => {
    setToken("");
    navigate("/");
  };

  const appBarPosition = sticky ? "sticky" : "static";

  // Inhalt des Drawer-Menüs (für mobile Geräte)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Logo style={{ color: "black", margin: "1rem" }} />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          disableRipple
          sx={{
            "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
          }}
        >
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/news"
          disableRipple
          sx={{
            "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
          }}
        >
          <ListItemText
            primary="News"
            primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
          />
        </ListItem>
        {isLoggedIn ? (
          <>
            <ListItem
              button
              component={Link}
              to="/blogForm"
              disableRipple
              sx={{
                "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
              }}
            >
              <ListItemText
                primary="Neuer Beitrag"
                primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              disableRipple
              sx={{
                "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
              }}
            >
              <ListItemText
                primary="Registrieren"
                primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              disableRipple
              sx={{
                "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
              />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            component={Link}
            to="/login"
            disableRipple
            sx={{
              "&:hover, &:focus, &:active": { backgroundColor: "transparent", color: "inherit" },
            }}
          >
            <ListItemText
              primary="Login"
              primaryTypographyProps={{ sx: { fontSize: { xs: "1.2rem", md: "1rem" } } }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  // Textausrichtung: Auf Mobilgeräten: wenn Drawer geöffnet -> left, sonst right; auf größeren Geräten immer left
  const logoTextAlign = isMobile ? (mobileOpen ? "left" : "right") : "left";

  return (
    <>
      <AppBar
        position={appBarPosition}
        color="primary"
        sx={{
          boxShadow: 3,
          ...(sticky && { top: 0 }),
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.8),
          backdropFilter: "blur(2px)",
        }}
      >
        <Toolbar>
          {/* Hamburger-Menü-Button für kleine Bildschirme */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textAlign: logoTextAlign,
            }}
          >
            <Logo style={{ color: "white", width: "13rem", marginTop: "0.5rem" }} />
          </Typography>
          {/* Navigationselemente für größere Bildschirme */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/news">
              News
            </Button>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleMenuClose} component={Link} to="/blogForm">
                    Neuer Beitrag
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                    Registrieren
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer für mobile Geräte */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
