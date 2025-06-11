import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAdminAuth } from '../context/AdminAuth';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAdminAuth();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          📚 Biblioteca
        </Typography>
        <Button color="inherit" component={NavLink} to="/" end>
          Home
        </Button>
        {isLoggedIn && (
          <>
            <Button color="inherit" component={NavLink} to="/libri-in-giro">
              Libri in giro
            </Button>
            <Button color="inherit" component={NavLink} to="/registra-prestito">
              Registra un prestito
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <Button color="inherit" component={NavLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;