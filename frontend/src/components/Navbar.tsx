import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  LocalLibrary as LocalLibraryIcon,
} from '@mui/icons-material';
import { useAdminAuth } from '../hooks/useAdminAuth';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon />, public: true },
    ...(isLoggedIn ? [
      { text: 'Libri in Giro', path: '/libri-in-giro', icon: <LibraryBooksIcon />, public: false },
      { text: 'Registra Prestito', path: '/registra-prestito', icon: <AddIcon />, public: false },
    ] : []),
  ];

  const NavButton: React.FC<{ 
    to: string; 
    children: React.ReactNode; 
    icon?: React.ReactNode;
    onClick?: () => void;
  }> = ({ to, children, icon, onClick }) => (
    <Button
      color="inherit"
      component={to ? NavLink : 'button'}
      to={to}
      onClick={onClick}
      startIcon={icon}
      sx={{
        mx: 1,
        borderRadius: 2,
        px: 2,
        transition: 'all 0.3s ease',
        position: 'relative',
        '&.active': {
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: 2,
            bgcolor: 'white',
            borderRadius: 1,
          }
        },
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-1px)',
        }
      }}
    >
      {children}
    </Button>
  );

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box display="flex" alignItems="center">
          <LocalLibraryIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            Biblioteca
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={isActive(item.path)}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Box sx={{ mt: 'auto', p: 2, borderTop: 1, borderColor: 'divider' }}>
          {isLoggedIn ? (
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                  A
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Amministratore
                  </Typography>
                  <Chip 
                    label="Online" 
                    size="small" 
                    color="success" 
                    sx={{ height: 16, fontSize: '0.7rem' }}
                  />
                </Box>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  logout();
                  handleDrawerToggle();
                }}
                sx={{ mt: 1 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="contained"
              component={NavLink}
              to="/login"
              startIcon={<LoginIcon />}
              onClick={handleDrawerToggle}
            >
              Accedi
            </Button>
          )}
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo and Title */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ flexGrow: isMobile ? 1 : 0, mr: 4 }}
            component={NavLink}
            to="/"
            color="inherit"
            style={{ textDecoration: 'none' }}
          >
            <LocalLibraryIcon sx={{ mr: 1, fontSize: 32 }} />
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Biblioteca Codexia
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
                {menuItems.map((item) => (
                  <NavButton
                    key={item.text}
                    to={item.path}
                    icon={item.icon}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>

              {/* Desktop Auth Section */}
              <Box display="flex" alignItems="center">
                {isLoggedIn ? (
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'rgba(255,255,255,0.2)' }}>
                      A
                    </Avatar>
                    <Typography variant="body2" sx={{ mr: 2, opacity: 0.9 }}>
                      Admin
                    </Typography>
                    <NavButton to="" icon={<LogoutIcon />} onClick={logout}>
                      Logout
                    </NavButton>
                  </Box>
                ) : (
                  <NavButton to="/login" icon={<LoginIcon />}>
                    Accedi
                  </NavButton>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;