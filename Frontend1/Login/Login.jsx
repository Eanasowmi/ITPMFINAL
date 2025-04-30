import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Box,
} from "@mui/material";
import axios from "axios";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      setError(null);
      const { data } = await axios.post(
        "api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      if (data.isAdmin) {
        navigate("/admin/AdminCards");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5",
      }}
    >
      <Container
        component="main"
        maxWidth="md"
        sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 4 }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {error && (
              <Box sx={{ mb: 2, width: "100%" }}>
                <ErrorMessage variant="error">{error}</ErrorMessage>
              </Box>
            )}
            {loading && <Loading />}
            <Box component="form" sx={{ mt: 1 }} onSubmit={submitHandler}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                error={!!error && !validateEmail(email)}
                helperText={error && !validateEmail(email) ? error : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                error={!!error && password.length < 6}
                helperText={error && password.length < 6 ? error : ""}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link href="/register" variant="body2">
                    Register
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
