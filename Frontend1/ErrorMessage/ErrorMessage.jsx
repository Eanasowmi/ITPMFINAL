import React from "react";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const StyledAlert = styled(Alert)({
  fontSize: 12,
  color: (theme) => theme.palette.error.main,
  display: "flex",
  justifyContent: "center",
});

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <StyledAlert severity={variant}>
      <strong>{children}</strong>
    </StyledAlert>
  );
};

export default ErrorMessage;
