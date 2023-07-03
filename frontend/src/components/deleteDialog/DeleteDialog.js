import React from 'react';
import { Box, Button, CardContent, Card, Typography, Stack, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';

function DeleteDialog(props) {
const {component, handleDeleteButton, open, id, setOpen} = props;

    return (
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogTitle id="alert-dialog-title" sx={{mt:1}}>
          {`Are you sure you want to delete this ${component}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>{handleDeleteButton(id); setOpen(false)}} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default DeleteDialog;
