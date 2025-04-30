import * as React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Define the root layout styling
const ProductHeroLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "100vh", // Ensure it takes full view height
  minHeight: 500,
  maxHeight: 1300,
  paddingTop: theme.spacing(10), // Add padding to the top
}));

// Define the Background styled component
const Background = styled("div")(({ sx }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -1, // Ensure background is behind all content
  ...sx, // Spread sx styles into the background styles
}));

// Define the main layout component
function ProductHeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
        <Background
          sx={{
            ...sxBackground,
            backgroundColor: sxBackground.backgroundColor || "defaultColor",
          }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

export default ProductHeroLayout;
