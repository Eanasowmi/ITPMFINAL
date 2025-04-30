import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Grid,
  Typography,
  Paper,
  Rating as MuiRating,
  CssBaseline,
  Button,
  Container,
} from "@mui/material";
import { FormatQuote } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
  borderRadius: "20px",
  padding: theme.spacing(4),
  textAlign: "center",
  boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "25px 25px 75px #c1c1c1, -25px -25px 75px #ffffff",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: "auto",
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: "0 0 15px rgba(0,0,0,0.2)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "10px 30px",
  borderRadius: "30px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.05)",
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  fontSize: "4rem",
  color: theme.palette.primary.main,
  opacity: 0.2,
  position: "absolute",
  top: "-20px",
  left: "10px",
}));

const reviews = [
  {
    id: 1,
    rating: 5,
    review: "Excellent! The craftsmanship exceeded my expectations. A true work of art!",
    userName: "Jane Smith",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    rating: 4,
    review: "Impeccable service and stunning designs. Can't wait for my next custom piece!",
    userName: "John Doe",
    userImage: "https://cdn.britannica.com/29/215029-050-84AA8F39/British-actress-Emma-Watson-2017.jpg",
  },
  {
    id: 3,
    rating: 5,
    review: "Absolutely transformative experience. The attention to detail is unparalleled.",
    userName: "Bob Johnson",
    userImage: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const ReviewCard = ({ review }) => (
  <Grid item xs={12} sm={6} md={4}>
    <StyledPaper>
      <QuoteIcon />
      <StyledAvatar alt={review.userName} src={review.userImage} />
      <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: "bold", color: "#333" }}>
        {review.userName}
      </Typography>
      <MuiRating value={review.rating} readOnly size="large" sx={{ my: 2 }} />
      <Typography variant="body1" sx={{ fontStyle: "italic", color: "#555" }}>
        "{review.review}"
      </Typography>
    </StyledPaper>
  </Grid>
);

const Rate = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.name) {
      setUserName(userInfo.name);
    }
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 6,
            fontWeight: "bold",
            color: "#4B001E",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Client Testimonials
        </Typography>
        {userName && (
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: "#4B001E",
            }}
          >
            Welcome, {userName}!
          </Typography>
        )}
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 6 }}>
          <StyledButton variant="contained" component={Link} to="/ratings">
            View More Testimonials
          </StyledButton>
          <StyledButton variant="contained" component={Link} to="/addrate">
            Add Your Review
          </StyledButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Rate;