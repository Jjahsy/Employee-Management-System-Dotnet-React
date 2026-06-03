import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Notification from './components/Notification';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './api';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });

  // 1. Fetch Data from API
  const refreshEmployeeList = async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setNotify({ isOpen: true, message: 'Failed to fetch data!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  // 2. Save or Update Operation
  const handleSave = async (employee) => {
    try {
      if (employee.id) {
        await updateEmployee(employee.id, employee);
        setNotify({ isOpen: true, message: 'Updated Successfully!', type: 'success' });
      } else {
        await createEmployee(employee);
        setNotify({ isOpen: true, message: 'Added Successfully!', type: 'success' });
      }
      setIsFormOpen(false);
      setSelectedEmployee(null);
      refreshEmployeeList();
    } catch (err) {
      setNotify({ isOpen: true, message: 'Error saving record!', type: 'error' });
    }
  };

  // 3. Delete Operation
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setNotify({ isOpen: true, message: 'Deleted Successfully!', type: 'success' });
      refreshEmployeeList();
    } catch (err) {
      setNotify({ isOpen: true, message: 'Error deleting record!', type: 'error' });
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Employee Management System</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Manage Employees</Typography>
          {!isFormOpen && (
            <Button variant="contained" color="primary" onClick={() => { setSelectedEmployee(null); setIsFormOpen(true); }}>
              Add Employee
            </Button>
          )}
        </Box>

        {isFormOpen && (
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            onSave={handleSave}
            onCancel={() => { setIsFormOpen(false); setSelectedEmployee(null); }}
          />
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
        ) : (
          <EmployeeList
            employees={employees}
            onEdit={(emp) => { setSelectedEmployee(emp); setIsFormOpen(true); }}
            onDelete={handleDelete}
          />
        )}
      </Container>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
