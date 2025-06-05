import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home: React.FC = () => (
  <Container sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Benvenuto nella Biblioteca Comunale
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Gestisci i tuoi prestiti e consulta i libri disponibili con facilità.
    </Typography>
    <Button variant="contained" component={RouterLink} to="/registra-prestito">
      Inizia ora
    </Button>
  </Container>
);

export default Home;