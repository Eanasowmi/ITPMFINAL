import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://cdns.crestline.com/crestline/How-to-pick-the-best-tshirt-variety.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url('/path/to/fallback-image.jpg')", // Replace with actual fallback image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  "&.fallback::after": {
    opacity: 1,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
}));

const HighlightText = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const CtaButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontSize: "1.2rem",
  fontWeight: "bold",
 
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));

export default function ProductHero() {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
    img.onerror = () => setImageFailed(true);
  }, []);

  return (
    <HeroContainer className={imageFailed ? 'fallback' : ''}>
      <ContentContainer maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h1" color="white" fontWeight="bold" gutterBottom>
                Design Your <HighlightText>Dream</HighlightText> Tee
              </Typography>
              <Typography variant="h4" color="white" paragraph>
                Unleash your creativity with our premium customization service
              </Typography>
              <CtaButton
                variant="contained"
                color="primary"
                size="large"
                 to='/myproject'
                component={Link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Designing Now
              </CtaButton>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <FeatureBox>
                <Typography variant="h6" color="white" gutterBottom>
                  Why Choose Us:
                </Typography>
                {["Expert Designers", "Premium Materials", "Fast Turnaround", "100% Satisfaction Guaranteed"].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <Typography variant="body1" color="white">
                      ✓ {feature}
                    </Typography>
                  </motion.div>
                ))}
              </FeatureBox>
            </motion.div>
          </Grid>
        </Grid>
      </ContentContainer>
    </HeroContainer>
  );
}