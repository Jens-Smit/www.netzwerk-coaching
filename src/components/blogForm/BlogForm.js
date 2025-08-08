// src/components/blog/BlogForm.js
import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";

// Basis-URL aus der Umgebungsvariablen (Default: http://127.0.0.1:8000)
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const BlogForm = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  // Hier speichern wir Objekte { name, type, dataUrl } – niemals Blob-URLs!
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isMediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, token } = useContext(AuthContext);

  // Hilfsfunktion: Datei in einen DataURL-String umwandeln
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei"));
      reader.readAsDataURL(file);
    });
  };

  // Hilfsfunktion: DataURL zurück in ein File-Objekt konvertieren
  const dataUrlToFile = async (dataUrl, fileName, mimeType) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  // Beim Mounten: Dateien aus localStorage laden (als DataURL)
  useEffect(() => {
    const savedFiles = localStorage.getItem("blogFormFiles");
    if (savedFiles) {
      setSelectedFiles(JSON.parse(savedFiles));
    }
  }, []);

  // Bei jeder Änderung in selectedFiles diese im localStorage speichern
  useEffect(() => {
    localStorage.setItem("blogFormFiles", JSON.stringify(selectedFiles));
  }, [selectedFiles]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      Promise.all(
        acceptedFiles.map(async (file) => {
          const dataUrl = await fileToDataUrl(file);
          return { name: file.name, type: file.type, dataUrl };
        })
      )
        .then((filesData) => {
          setSelectedFiles((prev) => [...prev, ...filesData]);
          console.log("Dateien hinzugefügt:", filesData);
        })
        .catch((err) => {
          console.error("Fehler beim Konvertieren der Dateien:", err);
        });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleMoveMedia = (index, direction) => {
    const newFiles = [...selectedFiles];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newFiles.length) return;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setSelectedFiles(newFiles);
    console.log("Neue Reihenfolge:", newFiles);
  };

  const handleInsertLink = () => {
    const url = window.prompt("Bitte die URL eingeben:");
    if (!url) return;
    const linkText = window.prompt("Bitte den Linktext eingeben:");
    if (!linkText) return;
    const linkMarkup = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    setNewPost((prev) => ({
      ...prev,
      content: prev.content + linkMarkup,
    }));
  };

  const handleOpenMediaDialog = () => {
    if (selectedFiles.length <= 1) {
      window.alert("Bitte lade zuerst zusätzliche Medien hoch.");
      return;
    }
    setMediaDialogOpen(true);
  };

  // Diese Funktion lädt ein einzelnes Medium hoch und gibt eine permanente URL zurück.
  const uploadMedia = async (file) => {
    if (!token) {
      console.error("Kein Token vorhanden, bitte melde dich an.");
      throw new Error("Nicht authentifiziert");
    }
    
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/posts/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload-Fehler:", errorData);
      throw new Error(errorData.error || "Upload fehlgeschlagen");
    }
    const data = await response.json();
    return data.url;
  };

  // Statt eines temporären Blob-URLs wird das Medium hochgeladen und die permanente URL genutzt.
  const handleMediaInsert = async (fileData) => {
    try {
      const file = await dataUrlToFile(fileData.dataUrl, fileData.name, fileData.type);
      console.log(file);
      const permanentUrl = await uploadMedia(file);
      let mediaMarkup = "";
      if (fileData.type.startsWith("image")) {
        mediaMarkup = `<img src="${permanentUrl}" alt="Bild" style="max-width:100%;" />`;
      } else if (fileData.type.startsWith("video")) {
        mediaMarkup = `<video controls style="width:100%"><source src="${permanentUrl}" type="${fileData.type}">Dein Browser unterstützt kein Video-Tag.</video>`;
      }
      setNewPost((prev) => ({
        ...prev,
        content: prev.content + mediaMarkup,
      }));
      setMediaDialogOpen(false);
    } catch (err) {
      console.error("Fehler beim Hochladen des Mediums:", err);
      setError("Medium konnte nicht hochgeladen werden.");
    }
  };

  const handlePostSubmit = async () => {
    if (!newPost.title || !newPost.content) {
      setError("Titel und Inhalt sind erforderlich.");
      return;
    }
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);

    if (selectedFiles.length > 0) {
      try {
        const titleImageFile = await dataUrlToFile(
          selectedFiles[0].dataUrl,
          selectedFiles[0].name,
          selectedFiles[0].type
        );
        formData.append("titleImage", titleImageFile);
        for (let i = 1; i < selectedFiles.length; i++) {
          const file = await dataUrlToFile(
            selectedFiles[i].dataUrl,
            selectedFiles[i].name,
            selectedFiles[i].type
          );
          formData.append("images", file);
        }
      } catch (err) {
        console.error("Fehler beim Konvertieren der Dateien:", err);
        setError("Fehler beim Verarbeiten der Mediendateien.");
        return;
      }
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          // Bei FormData NICHT den Content-Type setzen!
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Beitrag erfolgreich erstellt!");
        setError("");
        setNewPost({ title: "", content: "" });
        setSelectedFiles([]);
        localStorage.removeItem("blogFormFiles");
        console.log("Hochgeladene Dateien zurückgesetzt und LocalStorage geleert");
      } else {
        setError(data.message || "Fehler beim Erstellen des Beitrags.");
        setMessage("");
      }
    } catch (err) {
      setError("Serverfehler");
      setMessage("");
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ color: "primary.main", textAlign: "center", mb: 4, fontWeight: "bold" }}
        >
          Beitrag verfassen
        </Typography>
        <TextField
          label="Titel"
          fullWidth
          margin="normal"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          label="Inhalt"
          fullWidth
          multiline
          rows={6}
          margin="normal"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />

        {/* Drag & Drop-Bereich */}
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: isDragActive ? "grey.200" : "inherit",
            mt: 2,
            mb: 2,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body1">Lass die Dateien hier fallen ...</Typography>
          ) : (
            <Typography variant="body1">
              Ziehe deine Medien hierher oder klicke, um Dateien auszuwählen
            </Typography>
          )}
        </Box>

        {/* Vorschau der ausgewählten Medien */}
        {selectedFiles.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Reihenfolge der Medien (das erste Medium wird als Titelbild/-video verwendet):
            </Typography>
            <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
              {selectedFiles.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    border: "1px solid #ccc",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {file.type.startsWith("video") ? (
                    <video style={{ width: 100, height: 100, objectFit: "cover" }} muted>
                      <source src={file.dataUrl} type={file.type} />
                    </video>
                  ) : (
                    <img
                      src={file.dataUrl}
                      alt={`Vorschau ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {index > 0 && (
                      <IconButton size="small" onClick={() => handleMoveMedia(index, -1)}>
                        <ArrowUpwardIcon fontSize="inherit" />
                      </IconButton>
                    )}
                    {index < selectedFiles.length - 1 && (
                      <IconButton size="small" onClick={() => handleMoveMedia(index, 1)}>
                        <ArrowDownwardIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={handleInsertLink}>
            Link einfügen
          </Button>
          <Button variant="outlined" onClick={handleOpenMediaDialog}>
            Medium einfügen
          </Button>
          <Button variant="contained" color="primary" onClick={handlePostSubmit}>
            Posten
          </Button>
        </Box>

        {message && (
          <Typography color="primary" sx={{ mt: 2, textAlign: "center" }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}
      </Paper>

      <Dialog open={isMediaDialogOpen} onClose={() => setMediaDialogOpen(false)}>
        <DialogTitle>Medium auswählen</DialogTitle>
        <DialogContent>
          {selectedFiles.length > 1 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedFiles.slice(1).map((file, index) => (
                <Box key={index} sx={{ cursor: "pointer" }} onClick={() => handleMediaInsert(file)}>
                  {file.type.startsWith("video") ? (
                    <video style={{ width: 100, height: 100 }} muted>
                      <source src={file.dataUrl} type={file.type} />
                    </video>
                  ) : (
                    <img
                      src={file.dataUrl}
                      alt={`Medium ${index + 2}`}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>Keine Medien zum Einfügen verfügbar.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMediaDialogOpen(false)}>Abbrechen</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogForm;
