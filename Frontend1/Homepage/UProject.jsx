import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from './Typography';
import { useNavigate } from 'react-router-dom';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://5.imimg.com/data5/SELLER/Default/2020/8/ZY/RR/VR/20499095/sublimation-all-over-printed-t-shirts.jpg',
    title: 'Gave',
    width: '38%',
    path: '/voting'  // Path for navigation
  },
  {
    url: 'https://static.vecteezy.com/system/resources/previews/025/120/446/non_2x/multi-colored-abstract-pattern-on-fashionable-t-shirt-generated-by-ai-photo.jpg',
    title: 'your',
    width: '38%',
    path: '/voting'  // Path for navigation
  },
  {
    url: 'https://t4.ftcdn.net/jpg/07/13/97/53/360_F_713975382_qzXFQBWRMbn5fDJi5jMvVDyRDZA0c36U.jpg',
    title: 'voting',
    width: '24%',
    path: '/voting'  // Path for navigation
  },
];

export default function ProductCategories() {
  const navigate = useNavigate();  // Hook for navigation

  const handleClick = (path) => {
    navigate(path);  // Navigate to the provided path
  };

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h3" marked="center" align="center" component="h2" sx={{ textShadow: '2px 2px 4px black', mb: 5, mt: 15 }}>
        Your Projects
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => handleClick(image.path)}  // Handle click
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
