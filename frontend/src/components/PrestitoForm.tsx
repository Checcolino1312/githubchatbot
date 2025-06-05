import React, { useState } from "react";
import { useCreaPrestitoMutation } from "../services/prestitoApi";
import type { SerializedError } from "@reduxjs/toolkit";
import type { PrestitoLibroDto } from "../types/PrestitoLibroDto";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PrestitoForm: React.FC = () => {
  const [creaPrestito, { isLoading, isError }] = useCreaPrestitoMutation();

  const [utente, setUtente] = useState({
    nome: "",
    cognome: "",
    indirizzo: "",
    cellulare: "",
    email: "",
    nomeVolontario: "",
  });

  const [libri, setLibri] = useState([
    { titolo: "", autore: "", numeroInventario: "", collocazione: "" },
  ]);

  const handleUtenteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUtente({ ...utente, [e.target.name]: e.target.value });
  };

  const handleLibroChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nuoviLibri = [...libri];
    nuoviLibri[index][e.target.name as keyof typeof nuoviLibri[number]] = e.target.value;

    setLibri(nuoviLibri);
  };

  const aggiungiLibro = () => {
    setLibri([...libri, { titolo: "", autore: "", numeroInventario: "", collocazione: "" }]);
  };

  const rimuoviLibro = (index: number) => {
    const nuoviLibri = libri.filter((_, i) => i !== index);
    setLibri(nuoviLibri);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PrestitoLibroDto = { ...utente, libri };

    try {
      const blob = await creaPrestito(payload).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prestito_${utente.nome}_${utente.cognome}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        (err as { data: unknown }).data instanceof Blob
      ) {
        const blob = (err as { data: Blob }).data;
        blob.text().then((text) => console.error("❌ Errore dal backend:", text));
      } else {
        console.error("⚠️ Errore sconosciuto:", err as SerializedError);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, m: '2rem auto', p: 2 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Registra un Prestito
      </Typography>

      <Box component="fieldset" sx={{ border: 'none', p: 0, mb: 2 }}>
        <Typography component="legend" variant="subtitle1" mb={1}>
          Dati Utente
        </Typography>
        <Stack spacing={2}>
          {Object.entries(utente).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              id={key}
              name={key}
              value={value}
              onChange={handleUtenteChange}
              required
            />
          ))}
        </Stack>
      </Box>

      <Box component="fieldset" sx={{ border: 'none', p: 0, mb: 2 }}>
        <Typography component="legend" variant="subtitle1" mb={1}>
          Libri
        </Typography>
        <Stack spacing={2}>
          {libri.map((libro, index) => (
            <Box key={index} sx={{ border: '1px solid', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2" mb={1}>
                Libro {index + 1}
              </Typography>
              <Stack spacing={2}>
                {Object.entries(libro).map(([key, value]) => (
                  <TextField
                    key={key}
                    label={key}
                    id={`${key}-${index}`}
                    name={key}
                    value={value}
                    onChange={(e) => handleLibroChange(index, e)}
                    required
                  />
                ))}
              </Stack>
              {libri.length > 1 && (
                <IconButton onClick={() => rimuoviLibro(index)} color="error" sx={{ mt: 1 }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button type="button" onClick={aggiungiLibro} startIcon={<span>➕</span>} sx={{ mt: 1 }}>
            Aggiungi Libro
          </Button>
        </Stack>
      </Box>

      <Button type="submit" variant="contained" disabled={isLoading} fullWidth>
        {isLoading ? 'Invio in corso...' : 'Salva e Scarica PDF'}
      </Button>

      {isError && (
        <Typography color="error" textAlign="center" mt={2}>
          Errore durante il salvataggio.
        </Typography>
      )}
    </Box>
  );
};

export default PrestitoForm;
