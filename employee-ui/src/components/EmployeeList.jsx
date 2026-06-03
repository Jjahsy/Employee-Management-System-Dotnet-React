import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function EmployeeList({ employees, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteId);
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>Employee Records</Typography>
      <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{`${emp.firstName} ${emp.lastName}`}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.phone}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell align="center">
                <Button size="small" color="primary" onClick={() => onEdit(emp)} sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDeleteClick(emp.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">No employees found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this employee record permanently?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
