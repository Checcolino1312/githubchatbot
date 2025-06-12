import React, { useState } from 'react';
import { useGetLibriInGiroQuery } from './services/prestitoApi';
import { Libro } from './types/Libro';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Container,
  Paper,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  TableContainer,
  Fade,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  MenuBook as MenuBookIcon,
  CalendarToday as CalendarIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const LibriInGiro: React.FC = () => {
  const { data: libri, isLoading, isError } = useGetLibriInGiroQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLibri = libri?.filter((libro: Libro) =>
    libro.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.autore.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.numeroInventario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (dataFine: string) => {
    const today = new Date();
    const endDate = new Date(dataFine);
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysLeft < 0) return 'error';
    if (daysLeft <= 3) return 'warning';
    return 'success';
  };

  const getStatusText = (dataFine: string) => {
    const today = new Date();
    const endDate = new Date(dataFine);
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysLeft < 0) return `Scaduto da ${Math.abs(daysLeft)} giorni`;
    if (daysLeft === 0) return 'Scade oggi';
    if (daysLeft <= 3) return `Scade tra ${daysLeft} giorni`;
    return `${daysLeft} giorni rimanenti`;
  };

  const getStatusIcon = (dataFine: string) => {
    const today = new Date();
    const endDate = new Date(dataFine);
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysLeft < 0) return <WarningIcon />;
    if (daysLeft <= 3) return <WarningIcon />;
    return <CheckCircleIcon />;
  };

  const scaduti = libri?.filter(libro => {
    const today = new Date();
    const endDate = new Date(libro.dataFinePrestito);
    return endDate < today;
  }).length || 0;

  const inScadenza = libri?.filter(libro => {
    const today = new Date();
    const endDate = new Date(libro.dataFinePrestito);
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysLeft >= 0 && daysLeft <= 3;
  }).length || 0;

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }} color="text.secondary">
          Caricamento libri in corso...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ borderRadius: 2 }}
          icon={<WarningIcon fontSize="large" />}
        >
          <Typography variant="h6">Errore durante il caricamento</Typography>
          <Typography>
            Non è stato possibile recuperare l'elenco dei libri in prestito. 
            Riprova più tardi o contatta l'amministratore.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <MenuBookIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h3" fontWeight="bold" color="primary.main">
            Libri in Prestito
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Monitora tutti i prestiti attivi e le relative scadenze
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card 
            elevation={4}
            sx={{ 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <MenuBookIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {libri?.length || 0}
              </Typography>
              <Typography variant="h6">
                Prestiti Attivi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card 
            elevation={4}
            sx={{ 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              color: 'white'
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <WarningIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {inScadenza}
              </Typography>
              <Typography variant="h6">
                In Scadenza
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card 
            elevation={4}
            sx={{ 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)',
              color: 'white'
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <WarningIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h3" fontWeight="bold">
                {scaduti}
              </Typography>
              <Typography variant="h6">
                Scaduti
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Cerca per titolo, autore, lettore o numero inventario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
        />
        {searchTerm && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {filteredLibri?.length} risultati trovati
          </Typography>
        )}
      </Paper>

      {/* Table */}
      <Fade in timeout={500}>
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead 
                sx={{ 
                  background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)'
                }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Libro
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Dettagli
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Lettore
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Date Prestito
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Stato
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLibri?.map((libro: Libro, index: number) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'action.hover',
                        transform: 'scale(1.001)',
                        transition: 'all 0.2s ease'
                      },
                      '&:nth-of-type(odd)': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary">
                          {libro.titolo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          di {libro.autore}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          <strong>Inv:</strong> {libro.numeroInventario}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Coll:</strong> {libro.collocazione}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            width: 36, 
                            height: 36, 
                            mr: 2,
                            fontSize: '0.9rem'
                          }}
                        >
                          {libro.nome.charAt(0)}{libro.cognome.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {libro.nome} {libro.cognome}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box display="flex" alignItems="center" mb={1}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {new Date(libro.dataInizioPrestito).toLocaleDateString('it-IT')}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {new Date(libro.dataFinePrestito).toLocaleDateString('it-IT')}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(libro.dataFinePrestito)}
                        label={getStatusText(libro.dataFinePrestito)}
                        color={getStatusColor(libro.dataFinePrestito)}
                        variant="filled"
                        sx={{ 
                          fontWeight: 'bold',
                          '& .MuiChip-icon': {
                            fontSize: '1rem'
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {(!libri || libri.length === 0) && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <MenuBookIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Nessun prestito attivo
              </Typography>
              <Typography variant="body1" color="text.disabled">
                Al momento non ci sono libri in prestito
              </Typography>
            </Box>
          )}
          
          {filteredLibri?.length === 0 && libri && libri.length > 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <SearchIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Nessun risultato trovato
              </Typography>
              <Typography variant="body1" color="text.disabled">
                Prova a modificare i termini di ricerca
              </Typography>
            </Box>
          )}
        </Paper>
      </Fade>
    </Container>
  );
};

export default LibriInGiro;