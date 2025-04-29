import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const handleViewProfile = async (customerId) => {
    try {
      const response = await axios.get(`/api/users/${customerId}`);
      setSelectedCustomer(response.data);
      setProfileOpen(true);
    } catch (err) {
      setError("Error fetching customer details.");
    }
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  const handleProcess = (orderId) => {
    setSelectedOrder(orderId);
    navigate("/admin/orders/OrderStatus");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(value) ||
        order.orderNumber.toString().includes(value)
    );
    setFilteredOrders(filtered);
  };

  const downloadPDF = () => {
    const input = tableRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("orders.pdf");
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (orders.length === 0) return <Typography>No orders available.</Typography>;

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Search by Order Number or Customer Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: "60%" }}
        />
        <Button variant="contained" color="secondary" onClick={downloadPDF}>
          Download as PDF
        </Button>
      </Box>

      <TableContainer component={Paper} ref={tableRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDetails}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewProfile(order.userId)}
                    sx={{ mr: 2 }}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleProcess(order.orderNumber)}
                  >
                    Process
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={profileOpen} onClose={handleCloseProfile}>
        <DialogTitle>Customer Profile</DialogTitle>
        <DialogContent>
          {selectedCustomer ? (
            <Box>
              <Typography>
                <strong>Name:</strong> {selectedCustomer.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedCustomer.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedCustomer.mobileNo}
              </Typography>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderDetails;
