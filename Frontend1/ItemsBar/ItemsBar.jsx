import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaletteIcon from "@mui/icons-material/Palette";
import TextIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CirclePicker } from "react-color";
import axios from 'axios'; // Import axios for API requests
import "./ItemsBar.css";

const ItemsBar = ({ onToggleSidebar, onColorChange, onTextChange, onImageUpload , onMaterialSelect }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState("None");
  const [color, setColor] = useState("#ffffff");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialOptions, setMaterialOptions] = useState([]);

  useEffect(() => {
    axios.get('/api/materials') 
      .then(response => {
        setMaterialOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching materials:', error);
      });
  }, []);

  const clickHandler = (view) => {
    setIsSidebarOpen(true);
    setSidebarView(view);
    onToggleSidebar(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSidebarView("None");
    onToggleSidebar(false);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    onColorChange(color.hex);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      onImageUpload(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleMaterialChange = (event) => {
    const selected = materialOptions.find(material => material.name === event.target.value);
    setSelectedMaterial(selected.name);
    onMaterialSelect(selected);
  };

  return (
    <Box className="sidebar-container">
      <Drawer variant="permanent" className="sidebar">
        <List>
          <ListItem onClick={() => clickHandler("Material")}>
            <ListItemIcon>
              <LocalMallIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Material" className="icon-text" />
          </ListItem>
          <ListItem onClick={() => clickHandler("Color")}>
            <ListItemIcon>
              <PaletteIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Color" className="icon-text" />
          </ListItem>
          <ListItem onClick={() => clickHandler("Text")}>
            <ListItemIcon>
              <TextIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Text" className="icon-text" />
          </ListItem>
          <ListItem onClick={() => clickHandler("Image")}>
            <ListItemIcon>
              <ImageIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Image" className="icon-text" />
          </ListItem>
        </List>
      </Drawer>

      {isSidebarOpen && (
        <Box className="sidebar-content">
          <Box className="sidebar-view">
            {sidebarView === "Material" && (
              <div>
                <h2>Material Options</h2>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Material</FormLabel>
                  <RadioGroup value={selectedMaterial} onChange={handleMaterialChange}>
                    {materialOptions.map((material) => (
                      <FormControlLabel
                        key={material.name}
                        value={material.name}
                        control={<Radio />}
                        label={`${material.name} - LKR.${material.price}.00`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )}
            {sidebarView === "Color" && (
              <div>
                <h2>Color Options</h2>
                <CirclePicker color={color} onChangeComplete={handleColorChange} />
              </div>
            )}
            {sidebarView === "Text" && (
              <div>
                <h2>Text Options</h2>
                <TextField
      label="Enter Text"
      value={text}
      onChange={handleTextChange}
      InputProps={{
        style: {
          backgroundColor: "white",
        },
      }}
    />
              </div>
            )}
            {sidebarView === "Image" && (
              <div>
                <h2>Image Options</h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </Box>

          <Box className="close-button-container">
            <IconButton className="close-button" onClick={closeSidebar}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ItemsBar;
