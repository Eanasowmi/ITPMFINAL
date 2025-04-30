import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from './Typography';
import { useNavigate } from 'react-router-dom';

function ProductSmokingHero() {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleRedirect = () => {
    navigate('/feedback'); // Use navigate to redirect to the feedback page
  };

  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
        onClick={handleRedirect} // Attach the handleRedirect function to onClick
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>

      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
      {/* <Box
        component="img"
        src="/contuct.png"
        alt="Contact"
        sx={{ width: 60 }}
      /> */}
    </Container>
  );
}

export default ProductSmokingHero;
