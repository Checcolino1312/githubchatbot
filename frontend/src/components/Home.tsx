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
  Grid,
  CardMedia,
  Avatar,
  Chip,
  Paper,
  Stack,
  Divider,
} from '@mui/material';

import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const events = [
  { 
    date: '15 Gennaio', 
    time: '18:00',
    title: "Presentazione del libro 'Viaggio nel Tempo'", 
    author: 'Elena Rossi',
    description: 'Un romanzo che intreccia fantascienza e storia italiana',
    image: '/api/placeholder/300/200'
  },
  { 
    date: '22 Gennaio', 
    time: '16:30',
    title: 'Laboratorio di lettura per bambini (6-10 anni)', 
    author: 'Associazione Piccoli Lettori',
    description: 'Storie animate e giochi di comprensione',
    image: '/api/placeholder/300/200'
  },
  { 
    date: '5 Febbraio', 
    time: '19:00',
    title: "Incontro con l'autore Giovanni Bianchi", 
    author: 'Giovanni Bianchi',
    description: 'Dialogo sul suo ultimo romanzo "Le radici del silenzio"',
    image: '/api/placeholder/300/200'
  },
];

const news = [
  {
    title: 'Nuovi orari invernali',
    content: 'Dal 1° dicembre la biblioteca adotta gli orari invernali: apertura dalle 9:00 alle 18:00.',
    date: '28 Novembre 2024',
    type: 'info'
  },
  {
    title: 'Collezione digitale ampliata',
    content: 'Disponibili ora oltre 5.000 ebook e audiolibri nella nostra piattaforma digitale.',
    date: '15 Novembre 2024',
    type: 'update'
  },
  {
    title: 'Corso di informatica base',
    content: 'Iniziano i corsi gratuiti di alfabetizzazione digitale per over 65.',
    date: '10 Novembre 2024',
    type: 'event'
  }
];

const stats = [
  { number: '45.000+', label: 'Libri disponibili', icon: <MenuBookIcon /> },
  { number: '3.200+', label: 'Iscritti attivi', icon: <PeopleIcon /> },
  { number: '15.000+', label: 'Prestiti annuali', icon: <LocalLibraryIcon /> },
];

const Home: React.FC = () => (
  <>
    {/* Hero Section */}
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
            >
              Biblioteca Comunale
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ opacity: 0.9, mb: 3 }}
            >
              Codexia - Centro Culturale dal 1925
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
              Un luogo dove cultura, storie e persone si incontrano. 
              Scopri migliaia di libri, partecipa ai nostri eventi e vivi 
              la magia della lettura.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(10px)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                }}
                startIcon={<MenuBookIcon />}
              >
                Esplora il Catalogo
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
                startIcon={<EventIcon />}
              >
                Vedi Eventi
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/500/400"
              alt="Biblioteca"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>

    {/* Stats Section */}
    <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={8}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                borderRadius: 3
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main', 
                  width: 60, 
                  height: 60, 
                  mx: 'auto', 
                  mb: 2 
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {stat.number}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* Main Content */}
    <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
      <Container maxWidth="lg">
        {/* Events Section */}
        <Box mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <EventIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h3" component="h2" fontWeight="bold">
              Prossimi Eventi
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {events.map((event, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={6}
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1} mb={2}>
                      <Chip 
                        label={event.date} 
                        color="primary" 
                        size="small"
                        icon={<EventIcon />}
                      />
                      <Chip 
                        label={event.time} 
                        variant="outlined" 
                        size="small"
                        icon={<AccessTimeIcon />}
                      />
                    </Stack>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      {event.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 2 }}
                      endIcon={<EventIcon />}
                    >
                      Maggiori Info
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* News Section */}
        <Box mb={8}>
          <Box display="flex" alignItems="center" mb={4}>
            <AnnouncementIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
            <Typography variant="h3" component="h2" fontWeight="bold">
              Ultime Notizie
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {news.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    borderLeft: 4,
                    borderColor: item.type === 'info' ? 'info.main' : 
                                 item.type === 'update' ? 'success.main' : 'warning.main',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      elevation: 6,
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {item.content}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {item.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Info Section */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                Orari e Contatti
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={2}>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Orari di Apertura
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lun-Ven: 9:00-18:00 | Sab: 9:00-13:00
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="center">
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Indirizzo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Via della Cultura, 42 - 12345 Codexia
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="center">
                  <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Telefono
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +39 0123 456789
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="center">
                  <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@bibliotecacodexia.it
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                La Nostra Storia
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="body1" paragraph>
                Fondata nel 1925, la Biblioteca Comunale di Codexia rappresenta 
                da quasi un secolo il cuore culturale della nostra comunità.
              </Typography>
              
              <Typography variant="body1" paragraph>
                Con oltre 45.000 volumi, collezioni digitali e spazi moderni per 
                lo studio, offriamo servizi all'avanguardia mantenendo vivo 
                l'amore per la tradizione libraria.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                Scopri di più
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>

    {/* CTA Section */}
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        py: 6
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Unisciti alla Nostra Comunità
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Iscriviti gratuitamente e accedi a tutti i nostri servizi
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(10px)',
            px: 4,
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
          }}
          startIcon={<EmailIcon />}
        >
          Contattaci per l'Iscrizione
        </Button>
      </Container>
    </Box>

    <Chatbot apiUrl="http://localhost:5005" avatarUrl="/chatbot-avatar.png" />
  </>
);

export default Home;