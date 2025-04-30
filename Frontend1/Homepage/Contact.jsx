import React from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';

function Contact() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Box component="form">
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: '20px',
            backgroundColor: '#D32F2F',
            '&:hover': {
              backgroundColor: '#FF0000',
            },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
}

export default Contact;
