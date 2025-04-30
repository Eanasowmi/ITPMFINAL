import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import TextField from './TextField';
import Snackbar from './Snackbar';
import Button from './Button';

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#1A2A40', // Dark Blue
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography 
                variant="h2" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: 'white', 
                  textShadow: '3px 3px 5px rgba(0,0,0,0.6)', 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  textAlign: 'center'
                }} 
              >
                Stay Updated with Us
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  color: '#E0E0E0',
                  fontWeight: 500,
                  letterSpacing: '0.15rem',
                  lineHeight: 1.5,
                  mb: 3
                }}
              >
                Get the latest trends and exclusive offers for your custom tees directly to your inbox!
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{
                  width: '100%',
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#FFFFFF', // White background for input
                  '& .MuiInputBase-input': {
                    color: '#1A2A40', // Dark Blue text
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  minWidth: 400,
                  backgroundColor: '#FFD700', // Gold for the button
                  color: '#1A2A40', // Dark Blue text
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  '&:hover': {
                    backgroundColor: '#FFB700', // Slightly darker Gold
                  },
                }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://t4.ftcdn.net/jpg/02/91/46/07/360_F_291460782_3QpzJ1pmcYilUVCKYKKgCoIUbUR4eTBY.webp"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: 45,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default ProductCTA;
