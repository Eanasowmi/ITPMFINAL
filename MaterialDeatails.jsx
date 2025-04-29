import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const headCells = [
  { id: 'materialId', numeric: true, disablePadding: true, label: 'Material ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Material Name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

// Function to stabilize sorting order
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const MaterialDetails = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('materialId');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    materialId: '',
    name: '',
    price: '',
    quantity: '',
  });
  const [currentMaterial, setCurrentMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get('/api/materials'); 
        setRows(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row._id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/materials/${deleteId}`);
      setRows(rows.filter(row => row._id !== deleteId));
      setSelected(selected.filter(selectedId => selectedId !== deleteId));
      console.log(`Material with id ${deleteId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting material:', error);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Material ID', 'Material Name', 'Price', 'Quantity']],
      body: rows.map(row => [row.materialId, row.name, row.price, row.quantity])
    });
    doc.save('materials.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddCancel = () => {
    setAddDialogOpen(false);
    setNewMaterial({ materialId: '', name: '', price: '', quantity: '' });
  };

  const handleAddConfirm = async () => {
    try {
      const { data } = await axios.post('/api/materials', newMaterial);
      setRows([...rows, data]);
      setAddDialogOpen(false);
      setNewMaterial({ materialId: '', name: '', price: '', quantity: '' });
      console.log('Material added successfully.');
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({
      ...newMaterial,
      [name]: value,
    });
  };

  const handleUpdateClick = (material) => {
    setCurrentMaterial(material);
    setUpdateDialogOpen(true);
  };

  const handleUpdateCancel = () => {
    setUpdateDialogOpen(false);
    setCurrentMaterial(null);
  };

  const handleUpdateConfirm = async () => {
    try {
      const { data } = await axios.put(`/api/materials/${currentMaterial._id}`, currentMaterial);
      setRows(rows.map(row => row._id === data._id ? data : row));
      setUpdateDialogOpen(false);
      setCurrentMaterial(null);
      console.log('Material updated successfully.');
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMaterial({
      ...currentMaterial,
      [name]: value,
    });
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                theme.palette.primary.secoundry,
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Material Details
            </Typography>
          )}
          {selected.length > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteClick(selected[0])}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <IconButton onClick={handleAddClick}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download PDF">
                <IconButton onClick={handleDownload}>
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Print">
                <IconButton onClick={handlePrint}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': row.materialId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.materialId}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => handleUpdateClick(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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

      {/* Add Material Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddCancel}>
        <DialogTitle>Add Material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="materialId"
            label="Material ID"
            type="text"
            fullWidth
            variant="standard"
            value={newMaterial.materialId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Material Name"
            type="text"
            fullWidth
            variant="standard"
            value={newMaterial.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={newMaterial.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            value={newMaterial.quantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCancel}>Cancel</Button>
          <Button onClick={handleAddConfirm}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Update Material Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleUpdateCancel}>
        <DialogTitle>Update Material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="materialId"
            label="Material ID"
            type="text"
            fullWidth
            variant="standard"
            value={currentMaterial?.materialId || ''}
            onChange={handleUpdateInputChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Material Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentMaterial?.name || ''}
            onChange={handleUpdateInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={currentMaterial?.price || ''}
            onChange={handleUpdateInputChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            value={currentMaterial?.quantity || ''}
            onChange={handleUpdateInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCancel}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this material?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialDetails;
