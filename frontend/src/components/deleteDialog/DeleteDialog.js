import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteDialog(props) {
  const { component, handleDeleteButton, open, id, setOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
        {`Are you sure you want to delete this ${component}?`}
      </DialogTitle>
      <DialogActions>
        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { handleDeleteButton(id); setOpen(false) }} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog;