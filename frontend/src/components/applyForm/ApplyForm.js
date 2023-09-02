import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@mui/material';

function ApplyForm(props) {
  const { open, setOpen, id, handleApplyButton } = props;
  const [fileList, setFileList] = useState([]);
  const initialValues = { resume: '' }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      const formData = new FormData();
      let userId = localStorage.getItem('id')
      formData.append("resume", fileList[0])
      formData.append("userId", userId)
      formData.append("jobId", id)
      handleApplyButton(formData)
    }
  })

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
        {`Apply for job`}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant='h6'>My resume document</Typography>
          <input type="file" name='resume' onChange={(e) => setFileList(e.target.files)} multiple />
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

export default ApplyForm;