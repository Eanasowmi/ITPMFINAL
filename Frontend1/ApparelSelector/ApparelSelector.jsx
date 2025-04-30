import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TShirtSelector from "../TShirtSelector/TShirtSelector";
import JerseySelector from "../JerseySelector/JerseySelector";
import BottomSelector from "../BottomSelector/BottomSelector";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";

const ApparelSelector = ({
  onApparelSelect,
  selectedOptions,
  setSelectedOptions,
  handleConfirm,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedOptions({
      type: null,
      collar: "",
      sleeves: "",
      fits: "",
      sizes: "",
      price: "",
    });
  };

  const handleFinalConfirm = () => {
    handleConfirm(selectedOptions);
    toggleDialog();
  };

  return (
    <ThemeProvider theme={theme}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleDialog}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          transition: "all 0.3s",
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={isDialogOpen}
        onClose={toggleDialog}
        maxWidth="md"
        fullWidth
        TransitionProps={{ timeout: 300 }}
      >
        <DialogTitle>Select Apparel</DialogTitle>
        <DialogContent>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="T-Shirts" />
            <Tab label="Jerseys" />
            <Tab label="Bottoms" />
          </Tabs>
          <Box p={2}>
            {selectedTab === 0 && (
              <TShirtSelector
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                handleConfirm={handleFinalConfirm}
              />
            )}
            {selectedTab === 1 && (
              <JerseySelector
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                handleConfirm={handleFinalConfirm}
              />
            )}
            {selectedTab === 2 && (
              <BottomSelector
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                handleConfirm={handleFinalConfirm}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ApparelSelector;
