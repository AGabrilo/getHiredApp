import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@mui/material';

function PictureForm(props) {
  const { open, setOpen, id, handleApplyButton } = props;
  const [fileList, setFileList] = useState([]);
  const initialValues = { picture: '' }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      handleApplyButton(id, { picture: fileList[0] })
    }
  })

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
        {`Change profile picture`}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant='h6'>My profile picture</Typography>
          <input type="file" name='picture' onChange={(e) => setFileList(e.target.files)} multiple />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { formik.handleSubmit(); setOpen(false) }} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PictureForm;
