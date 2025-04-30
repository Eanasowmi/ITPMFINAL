import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: theme.palette.text.primary,
  zIndex: 1300,
}));

const Loading = () => {
  return (
    <StyledBox>
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" style={{ marginTop: 20, color: "grey" }}>
        Loading, please wait...
      </Typography>
    </StyledBox>
  );
};

export default Loading;
