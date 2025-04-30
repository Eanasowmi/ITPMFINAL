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

const BottomSelector = ({
  selectedOptions,
  setSelectedOptions,
  handleOptionChange,
}) => {
  const bottoms = [
    {
      type: "Shorts",
      lengths: ["Above Knee", "Knee Length"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "1500",
    },
    {
      type: "Jeans",
      lengths: ["Regular", "Ankle"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "2500",
    },
    {
      type: "Sweatpants",
      lengths: ["Regular", "Ankle"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: "800",
    },
  ];

  const handleTypeSelect = (type) => {
    const selectedBottom = bottoms.find((bottom) => bottom.type === type);
    setSelectedOptions({
      type,
      length: selectedBottom.lengths[0] || "",
      size: selectedBottom.sizes[0] || "",
      price: selectedBottom.price,
    });
  };

  const handleTypeOptionChange = (type, event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      type,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      {bottoms.map((item) => (
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
                  <FormLabel component="legend">Length</FormLabel>
                  <RadioGroup
                    row
                    name="length"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.length
                        : ""
                    }
                    onChange={(event) =>
                      handleTypeOptionChange(item.type, event)
                    }
                  >
                    {item.lengths.map((length) => (
                      <FormControlLabel
                        key={length}
                        value={length}
                        control={<Radio />}
                        label={length}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" fullWidth margin="normal">
                  <FormLabel component="legend">Size</FormLabel>
                  <RadioGroup
                    row
                    name="size"
                    value={
                      selectedOptions.type === item.type
                        ? selectedOptions.size
                        : ""
                    }
                    onChange={(event) =>
                      handleTypeOptionChange(item.type, event)
                    }
                  >
                    {item.sizes.map((size) => (
                      <FormControlLabel
                        key={size}
                        value={size}
                        control={<Radio />}
                        label={size}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
          </CustomCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default BottomSelector;
