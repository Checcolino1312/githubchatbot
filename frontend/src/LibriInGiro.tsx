import React from 'react';
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
} from '@mui/material';

const LibriInGiro = () => {
  const { data: libri, isLoading, isError } = useGetLibriInGiroQuery();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        📚 Libri attualmente in prestito
      </Typography>

      {isLoading && <Typography>Caricamento in corso...</Typography>}
      {isError && <Typography color="error">Errore durante il caricamento.</Typography>}

      {!isLoading && !isError && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titolo</TableCell>
              <TableCell>Autore</TableCell>
              <TableCell>Inventario</TableCell>
              <TableCell>Collocazione</TableCell>
              <TableCell>Lettore</TableCell>
              <TableCell>Data Inizio</TableCell>
              <TableCell>Data Fine</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libri?.map((libro: Libro, index: number) => (
              <TableRow key={index}>
                <TableCell>{libro.titolo}</TableCell>
                <TableCell>{libro.autore}</TableCell>
                <TableCell>{libro.numeroInventario}</TableCell>
                <TableCell>{libro.collocazione}</TableCell>
                <TableCell>{libro.nome} {libro.cognome}</TableCell>
                <TableCell>{new Date(libro.dataInizioPrestito).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(libro.dataFinePrestito).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default LibriInGiro;
