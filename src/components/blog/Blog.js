// src/components/blog/Blog.js
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../authContext/AuthContext";
import { jwtDecode } from "jwt-decode";

// Basis-URL aus der Umgebungsvariable
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Hilfsfunktion: Schätzt den Medientyp anhand der Dateiendung
const getMimeType = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
    return "image";
  }
  if (["mp4", "webm", "ogg"].includes(extension)) {
    return "video";
  }
  return "";
};

// Extrahiert den Titelbildpfad (als String) aus post.titleImage,
// egal ob es ein String oder ein Array ist.
const getTitleImagePath = (titleImage) => {
  if (!titleImage) return null;
  if (typeof titleImage === "string") return titleImage;
  if (Array.isArray(titleImage) && titleImage.length > 0) return titleImage[0];
  return null;
};

// Prüft, ob der Token abgelaufen ist
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

// Beispiel für eine Refresh-Funktion – passe den Endpoint und die Logik ggf. an
const refreshToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Refresh fehlgeschlagen");
    }
    const data = await response.json();
    return data.newToken;
  } catch (err) {
    console.error("Token-Refresh fehlgeschlagen:", err);
    return null;
  }
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { token, isLoggedIn, setToken } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) =>
        console.error("Fehler beim Laden der Beiträge:", err)
      );
  }, []);

  const handleDelete = async (id) => {
    let currentToken = token;
    if (!currentToken) {
      console.error("Kein Token vorhanden");
      return;
    }
    // Prüfe, ob der Token abgelaufen ist
    if (isTokenExpired(currentToken)) {
      console.warn("Token abgelaufen, versuche zu erneuern...");
      const newToken = await refreshToken();
      if (newToken) {
        currentToken = newToken;
        setToken(newToken);
      } else {
        console.error("Authentifizierung fehlgeschlagen, bitte melde dich neu an.");
        return;
      }
    }

    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Löschfehler:", errorData);
        throw new Error("Fehler beim Löschen");
      }
      // Entferne den gelöschten Beitrag aus dem State
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des Beitrags:", error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
        }}
      >
        News
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(posts) &&
          posts.map((post, index) => {
            // Extrahiere den Bildpfad (als String)
            const titleImagePath = getTitleImagePath(post.titleImage);

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ position: "relative" }}>
                  {/* Löschen-Icon nur bei eingeloggtem User */}
                  {isLoggedIn && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        color: "red",
                      }}
                      onClick={() => handleDelete(post.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}

                  {/* Anzeige des Titelbildes bzw. Videos */}
                  {titleImagePath &&
                    getMimeType(titleImagePath) === "image" && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${API_URL}${titleImagePath}`}
                        alt={post.title}
                      />
                    )}
                  {titleImagePath &&
                    getMimeType(titleImagePath) === "video" && (
                      <video width="100%" controls>
                        <source
                          src={`${API_URL}${titleImagePath}`}
                          type={`video/${titleImagePath.split(".").pop()}`}
                        />
                        Dein Browser unterstützt kein Video-Tag.
                      </video>
                    )}

                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    {/* Der Inhalt wird als HTML gerendert */}
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        "& img": {
                          width: "100%",
                        },
                      }}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    {post.author && post.createdAt && (
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                         {new Date(post.createdAt).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Blog;
