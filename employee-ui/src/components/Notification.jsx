import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function Notification({ notify, setNotify }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotify({ ...notify, isOpen: false });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={notify.type} onClose={handleClose} variant="filled">
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
