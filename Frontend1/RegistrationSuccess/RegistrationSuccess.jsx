import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";

function RegistrationSuccess() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 8, textAlign: "center" }}
    >
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="subtitle1">
          Your account has been created successfully. You can now{" "}
          <Link
            href="/login"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            log in
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}

export default RegistrationSuccess;
