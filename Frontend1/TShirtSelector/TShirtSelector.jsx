import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomCard = styled(Card)(({ selected }) => ({
  height: "100%",
  border: selected ? "2px solid #008080" : "1px solid #ddd",
  boxShadow: selected
    ? "0 4px 12px rgba(0, 128, 128, 0.5)"
    : "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const TShirtSelector = ({
  selectedOptions,
  setSelectedOptions,
  handleConfirm,
}) => {
  const tshirts = [
    {
      type: "Round Neck",
      collars: ["Round"],
      sleeves: ["Short", "Long"],
      fits: ["Regular", "Slim"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "1500",
    },
    {
      type: "Polo",
      collars: ["Collar"],
      sleeves: ["Short", "Long"],
      fits: ["Regular", "Slim"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "1800",
    },
    {
      type: "Henley",
      collars: ["Round"],
      sleeves: ["Short", "Long"],
      fits: ["Regular", "Slim"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "1300",
    },
  ];

  const handleTypeSelect = (type) => {
    const selectedTShirt = tshirts.find((tshirt) => tshirt.type === type);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      type,
      collar: prevOptions.collar || selectedTShirt.collars[0],
      sleeves: prevOptions.sleeves || selectedTShirt.sleeves[0],
      fits: prevOptions.fits || selectedTShirt.fits[0],
      sizes: prevOptions.sizes || selectedTShirt.sizes[0],
      price: selectedTShirt.price,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  if (!selectedOptions) {
    return <div>Loading...</div>; // Handle null or undefined selectedOptions
  }

  return (
    <Grid container spacing={2}>
      {tshirts.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.type}>
          <CustomCard
            selected={selectedOptions.type === item.type}
            onClick={() => handleTypeSelect(item.type)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.type}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Price: LKR.{item.price}
              </Typography>
              <Box mt={2}>
                <FormControl component="fieldset" fullWidth margin="normal">
                  <FormLabel component="legend">Collar Type</FormLabel>
                  <RadioGroup
                    row
                    name="collar"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.collar
                        : ""
                    }
                    onChange={handleSelectChange}
                  >
                    {item.collars.map((collar) => (
                      <FormControlLabel
                        key={collar}
                        value={collar}
                        control={<Radio />}
                        label={collar}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" fullWidth margin="normal">
                  <FormLabel component="legend">Sleeves</FormLabel>
                  <RadioGroup
                    row
                    name="sleeves"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.sleeves
                        : ""
                    }
                    onChange={handleSelectChange}
                  >
                    {item.sleeves.map((sleeve) => (
                      <FormControlLabel
                        key={sleeve}
                        value={sleeve}
                        control={<Radio />}
                        label={sleeve}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    sx={{ backgroundColor: "white", paddingRight: "8px" }}
                  >
                    Fit
                  </InputLabel>
                  <Select
                    name="fits"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.fits
                        : ""
                    }
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{
                      "& .MuiSelect-select": {
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      },
                      "& .MuiInputLabel-root": {
                        top: "-6px",
                        "&.MuiInputLabel-shrink": {
                          top: "0",
                        },
                      },
                    }}
                  >
                    {item.fits.map((fit) => (
                      <MenuItem key={fit} value={fit}>
                        {fit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    sx={{ backgroundColor: "white", paddingRight: "8px" }}
                  >
                    Size
                  </InputLabel>
                  <Select
                    name="sizes"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.sizes
                        : ""
                    }
                    onChange={handleSelectChange}
                    fullWidth
                    sx={{
                      "& .MuiSelect-select": {
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      },
                      "& .MuiInputLabel-root": {
                        top: "-6px",
                        "&.MuiInputLabel-shrink": {
                          top: "0",
                        },
                      },
                    }}
                  >
                    {item.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </CustomCard>
        </Grid>
      ))}
      <Grid item xs={12} style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleConfirm(selectedOptions)}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};

export default TShirtSelector;
