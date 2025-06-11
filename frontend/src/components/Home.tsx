import React from 'react';
import { Chatbot } from 'chatbot-widget';
import 'chatbot-widget/dist/Chatbot.css';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid, // Usiamo il Grid normale
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';

const events = [
  { date: '12 Ottobre', title: "Presentazione del libro 'Viaggio nel Tempo'" },
  { date: '25 Ottobre', title: 'Laboratorio di lettura per bambini' },
  { date: '5 Novembre', title: "Incontro con l'autore Giovanni Rossi" },
];

const Home: React.FC = () => (
  <>
    <Box sx={{ backgroundColor: '#fdfcf8', minHeight: '100vh', py: 6 }}>
    <Container>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Biblioteca Comunale di Codexia
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Dal 1925 un luogo dove cultura, storie e persone si incontrano.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom textAlign="center">
        <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Prossimi eventi
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {events.map((event, index) => (
          // @ts-expect-error: MUI Grid typing bug in v7
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {event.date}
                </Typography>
                <Typography variant="body1">{event.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={6}>
        <Typography variant="body1" mb={2}>
          Per informazioni, prenotazioni o richieste:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmailIcon />}
          href="mailto:info@biblioteca.it"
        >
          Contattaci
        </Button>
      </Box>
    </Container>
    </Box>
    <Chatbot apiUrl="http://localhost:5005" avatarUrl="/chatbot-avatar.png" />
  </>
);

export default Home;
