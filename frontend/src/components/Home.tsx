import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const Home: React.FC = () => (
  <Container sx={{ py: 4 }}>
    <Box textAlign="center" mb={4}>
      <Typography variant="h4" gutterBottom>
        Benvenuto alla Biblioteca Comunale di Codexia
      </Typography>
      <Typography variant="body1">
        Fondata nel 1925, la nostra biblioteca offre oltre 50.000 volumi e un
        ambiente accogliente dove coltivare la passione per la lettura.
      </Typography>
    </Box>

    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        Prossimi eventi
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="12 Ottobre - Presentazione del libro 'Viaggio nel Tempo'" />
        </ListItem>
        <ListItem>
          <ListItemText primary="25 Ottobre - Laboratorio di lettura per bambini" />
        </ListItem>
        <ListItem>
          <ListItemText primary="5 Novembre - Incontro con l'autore Giovanni Rossi" />
        </ListItem>
      </List>
    </Box>

    <Box textAlign="center">
      <Button
        variant="contained"
        component={RouterLink}
        to="/registra-prestito"
        sx={{ mr: 2 }}
      >
        Gestisci prestiti
      </Button>
      <Button variant="outlined" href="mailto:info@biblioteca.it">
        Contattaci
      </Button>
    </Box>
  </Container>
);

export default Home;