import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const initialValues = { firstName: '', lastName: '', email: '', phone: '', department: '' };

export default function EmployeeForm({ selectedEmployee, onSave, onCancel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) setValues(selectedEmployee);
    else setValues(initialValues);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.firstName = values.firstName ? "" : "First Name is required.";
    temp.lastName = values.lastName ? "" : "Last Name is required.";
    temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid.";
    temp.phone = values.phone.length > 9 ? "" : "Minimum 10 digits required.";
    temp.department = values.department ? "" : "Department is required.";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(values);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>{values.id ? 'Edit Employee' : 'Add New Employee'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField name="firstName" label="First Name" value={values.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} fullWidth />
        <TextField name="lastName" label="Last Name" value={values.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} fullWidth />
        <TextField name="email" label="Email" value={values.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth />
        <TextField name="phone" label="Phone" value={values.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth />
        <TextField name="department" label="Department" value={values.department} onChange={handleChange} error={!!errors.department} helperText={errors.department} fullWidth />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </Box>
      </Box>
    </Paper>
  );
}

