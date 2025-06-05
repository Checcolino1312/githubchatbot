import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const Navbar = () => (_jsx(AppBar, { position: "sticky", color: "primary", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", sx: { flexGrow: 1 }, children: "\uD83D\uDCDA Biblioteca" }), _jsx(Button, { color: "inherit", component: NavLink, to: "/", end: true, children: "Home" }), _jsx(Button, { color: "inherit", component: NavLink, to: "/libri-in-giro", children: "Libri in giro" }), _jsx(Button, { color: "inherit", component: NavLink, to: "/registra-prestito", children: "Registra un prestito" })] }) }));
export default Navbar;
