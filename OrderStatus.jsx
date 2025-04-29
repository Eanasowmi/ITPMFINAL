import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const handleUpdateState = async (orderId, newState) => {
    console.log(`Updating order ${orderId} to state ${newState}`); // Debugging line
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: newState }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update order state");
      }
  
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? updatedOrder : order))
      );
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      handleUpdateState(selectedOrder._id, "rejected");
    }
  };
  

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order Tracking
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.state}</TableCell>
                  <TableCell>
                    {order.state === "processing" ? (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleUpdateState(order._id, "accepted")}
                          sx={{ m: 0.5 }}
                        >
                          Accept Order
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => handleClickOpen(order)}
                          sx={{ m: 0.5 }}
                        >
                          Reject Order
                        </Button>
                      </>
                    ) :  (
                      <>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "conduct")}
                          disabled={order.state !== "accepted"}
                          sx={{ m: 0.5 }}
                        >
                          Conduct Customer
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "finalizing")}
                          disabled={order.state !== "conduct"}
                          sx={{ m: 0.5 }}
                        >
                          Finalizing
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "process")}
                          disabled={order.state !== "finalizing"}
                          sx={{ m: 0.5 }}
                        >
                          Processing
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "finished")}
                          disabled={order.state !== "process"}
                          sx={{ m: 0.5 }}
                        >
                          Finished
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "shipped")}
                          disabled={order.state !== "finished"}
                          sx={{ m: 0.5 }}
                        >
                          Shipped
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateState(order._id, "delivered")}
                          disabled={order.state !== "shipped"}
                          sx={{ m: 0.5 }}
                        >
                          Deliver
                        </Button>
                      </>
                    ) }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Reject"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject the order {selectedOrder?.orderNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Reject Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderStatus;
