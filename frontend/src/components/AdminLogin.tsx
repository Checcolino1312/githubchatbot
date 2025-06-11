import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAdminAuth } from '../context/AdminAuth';

const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, m: '2rem auto', p: 2 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Accesso Amministratore
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Accedi
      </Button>
    </Box>
  );
};

export default AdminLogin;
