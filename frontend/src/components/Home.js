import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
const Home = () => (_jsxs(Container, { sx: { py: 4, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Benvenuto nella Biblioteca Comunale" }), _jsx(Typography, { variant: "body1", sx: { mb: 2 }, children: "Gestisci i tuoi prestiti e consulta i libri disponibili con facilit\u00E0." }), _jsx(Button, { variant: "contained", component: RouterLink, to: "/registra-prestito", children: "Inizia ora" })] }));
export default Home;
