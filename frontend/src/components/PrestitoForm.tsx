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
  Paper,
  Stepper,
  Step,
  StepLabel,
  Container,
  Alert,
  Collapse,
  Fade,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  MenuBook as MenuBookIcon,
  Save as SaveIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

const PrestitoForm: React.FC = () => {
  const [creaPrestito, { isLoading, isError }] = useCreaPrestitoMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const steps = ['Dati Utente', 'Libri da Prestare', 'Conferma'];

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

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return Object.values(utente).every(value => value.trim() !== '');
      case 1:
        return libri.every(libro => 
          Object.values(libro).every(value => value.trim() !== '')
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = async () => {
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
      setShowSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setUtente({
          nome: "",
          cognome: "",
          indirizzo: "",
          cellulare: "",
          email: "",
          nomeVolontario: "",
        });
        setLibri([{ titolo: "", autore: "", numeroInventario: "", collocazione: "" }]);
        setActiveStep(0);
        setShowSuccess(false);
      }, 3000);
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fade in timeout={500}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Informazioni Utente
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {Object.entries(utente).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      name={key}
                      value={value}
                      onChange={handleUtenteChange}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          }
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
        );

      case 1:
        return (
          <Fade in timeout={500}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center">
                  <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Libri da Prestare
                  </Typography>
                </Box>
                <Chip 
                  label={`${libri.length} libro${libri.length !== 1 ? 'i' : ''}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <Stack spacing={3}>
                {libri.map((libro, index) => (
                  <Paper 
                    key={index} 
                    elevation={2}
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        Libro {index + 1}
                      </Typography>
                      {libri.length > 1 && (
                        <IconButton 
                          onClick={() => rimuoviLibro(index)} 
                          color="error"
                          sx={{
                            '&:hover': {
                              bgcolor: 'error.light',
                              color: 'white'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Grid container spacing={2}>
                      {Object.entries(libro).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <TextField
                            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            name={key}
                            value={value}
                            onChange={(e) => handleLibroChange(index, e)}
                            required
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                              }
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                ))}
                
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={aggiungiLibro}
                  sx={{
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    borderStyle: 'dashed',
                    '&:hover': {
                      borderStyle: 'solid',
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Aggiungi Libro
                </Button>
              </Stack>
            </Paper>
          </Fade>
        );

      case 2:
        return (
          <Fade in timeout={500}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Riepilogo Prestito
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Dati Utente
                  </Typography>
                  <Stack spacing={1}>
                    <Typography><strong>Nome:</strong> {utente.nome} {utente.cognome}</Typography>
                    <Typography><strong>Indirizzo:</strong> {utente.indirizzo}</Typography>
                    <Typography><strong>Cellulare:</strong> {utente.cellulare}</Typography>
                    <Typography><strong>Email:</strong> {utente.email}</Typography>
                    <Typography><strong>Volontario:</strong> {utente.nomeVolontario}</Typography>
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Libri ({libri.length})
                  </Typography>
                  <Stack spacing={2}>
                    {libri.map((libro, index) => (
                      <Paper 
                        key={index} 
                        elevation={1} 
                        sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" color="primary">
                          {libro.titolo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          di {libro.autore}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Inv. {libro.numeroInventario} - {libro.collocazione}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Collapse in={showSuccess}>
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <IconButton size="small" onClick={() => setShowSuccess(false)}>
              ×
            </IconButton>
          }
        >
          Prestito registrato con successo! Il PDF è stato scaricato automaticamente.
        </Alert>
      </Collapse>

      <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {/* Header */}
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Registra Prestito
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Compila i dati dell'utente e aggiungi i libri da prestare
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      fontSize: '1.5rem',
                      '&.Mui-active': {
                        color: 'primary.main',
                      },
                      '&.Mui-completed': {
                        color: 'success.main',
                      }
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={activeStep === index ? 'bold' : 'normal'}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4, pt: 2 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Actions */}
        <Box sx={{ p: 4, pt: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Indietro
            </Button>

            <Box>
              {activeStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(activeStep)}
                  variant="contained"
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Avanti
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !isStepValid(activeStep)}
                  variant="contained"
                  size="large"
                  startIcon={isLoading ? <SaveIcon /> : <DownloadIcon />}
                  sx={{ 
                    borderRadius: 2, 
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                    }
                  }}
                >
                  {isLoading ? 'Elaborazione...' : 'Salva e Scarica PDF'}
                </Button>
              )}
            </Box>
          </Stack>

          {isError && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
              Si è verificato un errore durante il salvataggio del prestito.
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PrestitoForm;