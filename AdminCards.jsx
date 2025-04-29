import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const cardData = [
  {
    title: "CUSTOMERS",
    value: "45",
    icon: (
      <PeopleIcon
        sx={{ width: "100%", height: "auto", color: "text.secondary" }}
      />
    ),
  },
  {
    title: "ORDERS",
    value: "128",
    icon: (
      <ShoppingCartIcon
        sx={{ width: "100%", height: "auto", color: "text.secondary" }}
      />
    ),
  },
  {
    title: "MATERIALS",
    value: "200",
    icon: (
      <InventoryIcon
        sx={{ width: "100%", height: "auto", color: "text.secondary" }}
      />
    ),
  },
  {
    title: "PURCHASES",
    value: "75",
    icon: (
      <AttachMoneyIcon
        sx={{ width: "100%", height: "auto", color: "text.secondary" }}
      />
    ),
  },
];

function AdminCard({ title, value, icon }) {
  return (
    <Card sx={{ maxWidth: 250, m: 2, flex: "1 1 auto" }}>
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 140,
          }}
        >
          <Box sx={{ width: "50%" }}>{icon}</Box>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function AdminCards() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cardData.map((card, index) => (
        <AdminCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </Box>
  );
}

export default AdminCards;
