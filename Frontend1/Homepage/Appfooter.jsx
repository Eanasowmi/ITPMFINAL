import React from 'react';
import { Container, Box, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: '#1A2A40', // Dark Blue
        color: 'white',
        borderTop: '4px solid #FFD700', // Gold border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding and Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Unique Creation
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              © {new Date().getFullYear()} T-Shirt Customizer UniqueCreation. All rights reserved.
            </Typography>
            <Typography variant="body2">
              Explore unique designs and find the perfect custom tee for every occasion.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="/" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Home</a></li>
              <li><a href="/about" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>About Us</a></li>
              <li><a href="/contact" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Contact</a></li>
            </ul>
          </Grid>

          {/* Social Media and Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton component="a" href="https://facebook.com" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href="https://twitter.com" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton component="a" href="https://instagram.com" color="inherit">
                <InstagramIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Box component="form" noValidate>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
