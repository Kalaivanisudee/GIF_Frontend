import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';

const Logout = ({ setAuth }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4"></Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;