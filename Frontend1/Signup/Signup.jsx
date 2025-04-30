import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  VpnKey,
  UploadFile,
  Person,
} from "@mui/icons-material";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!terms) {
      setMessage("You must agree to the terms and conditions");
      return;
    }

    setMessage(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "/api/users",
        { name, pic, email, password },
        config
      );
      console.log(data);
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/registration-success");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      setPicMessage("Please Select an Image");
      return;
    }
    setPicMessage(null);
  
    const data = new FormData();
    data.append("file", pics);
  
    fetch("/api/cloudinary/uploadimage", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPic(data.imageUrl);
      })
      .catch((err) => {
        console.error("Error uploading image: ", err.message);
        setPicMessage("Failed to upload image: " + err.message);
      });
  };
  

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          REGISTER
        </Typography>
        {error && <ErrorMessage variant="error">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="error">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Your Name"
                fullWidth
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="email"
                label="Your Email"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                error={!!message && !validateEmail(email)}
                helperText={message && !validateEmail(email) ? message : ""}
              />
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!message && !validatePassword(password)}
                helperText={
                  message && !validatePassword(password) ? message : ""
                }
              />
              <TextField
                name="confirmPassword"
                label="Repeat your password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!message && password !== confirmPassword}
                helperText={
                  message && password !== confirmPassword ? message : ""
                }
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadFile />}
                  sx={{
                    backgroundColor: "grey",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "darkgrey",
                      color: "black",
                    },
                  }}
                >
                  {picMessage && (
                    <ErrorMessage variant="error">{picMessage}</ErrorMessage>
                  )}
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg,image/png"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Button>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <span>
                    I agree to all statements in{" "}
                    <Link
                      href="/terms-of-service"
                      target="_blank"
                      rel="noopener"
                    >
                      Terms of Service
                    </Link>
                  </span>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Register
              </Button>

              <Typography variant="body2" color="textSecondary" align="center">
                Have already an account?{" "}
                <Link href="/login" variant="body2">
                  Login here
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src="/images/Login.png"
                alt="Signup illustration"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
