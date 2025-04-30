import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#131842", // Teal color
    },
    secondary: {
      main: "#E68369", // Pink color for secondary actions
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
export default theme;
