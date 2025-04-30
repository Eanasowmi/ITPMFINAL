import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Example data rows
const rows = [
  { orderId: 1, customerName: 'John Doe', orderDetails: 'Lorem ipsum dolor sit amet', paymentStatus: 'Paid', date: '2024-06-21' },
  { orderId: 2, customerName: 'Jane Smith', orderDetails: 'Consectetur adipiscing elit', paymentStatus: 'Pending', date: '2024-06-20' },
  // Add more rows as needed
];

function PaymentHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order Details</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.orderId}>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.customerName}</TableCell>
                    <TableCell>{row.orderDetails}</TableCell>
                    <TableCell>{row.paymentStatus}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Print" onClick={() => handlePrint(row.orderId)}>
                        <PrintIcon />
                      </IconButton>
                      <IconButton aria-label="PDF" onClick={() => handlePdf(row.orderId)}>
                        <PictureAsPdfIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default PaymentHistory;
