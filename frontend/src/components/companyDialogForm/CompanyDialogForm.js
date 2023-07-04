import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Card, Typography, Stack, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';

function CompanyDialogForm(props) {
const {  company, open, setOpen, handleUpdate} = props;
const initialValues = { name: company.name, description: company.description, employersNum: company.employersNum, location: {city:company.location.city, country: company.location.country} }
const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
        console.log('Values on submit:', values)
        handleUpdate(company._id,values)
    }
})

    return (
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogTitle id="alert-dialog-title" sx={{mt:1}}>
          {`Update company form`}
        </DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='name'
                        type='text'
                        name='name'
                        label='Company name'
                        value={formik.values['name']}
                        onChange={formik.handleChange}
                        placeholder='Enter your name'
                        error={Boolean(formik.errors['name'])}
                        helperText={formik.errors['name']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='description'
                        type='text'
                        name='description'
                        label='Description'
                        value={formik.values['description']}
                        onChange={formik.handleChange}
                        placeholder='Enter your description'
                        error={Boolean(formik.errors['description'])}
                        helperText={formik.errors['description']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='employersNum'
                        type='number'
                        name='employersNum'
                        label='Numbr of employers'
                        value={formik.values['employersNum']}
                        onChange={formik.handleChange}
                        placeholder='Enter number of employers'
                        error={Boolean(formik.errors['employersNum'])}
                        helperText={formik.errors['employersNum']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                     <TextField
                        key='location.city'
                        type='text'
                        name='location.city'
                        label='City'
                        value={formik.values['location'].city}
                        onChange={formik.handleChange}
                        placeholder='Enter city'
                        error={Boolean(formik.errors['location.city'])}
                        helperText={formik.errors['location.city']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                     <TextField
                        key='location.country'
                        type='text'
                        name='location.country'
                        label='Country'
                        value={formik.values['location'].country}
                        onChange={formik.handleChange}
                        placeholder='Enter country'
                        error={Boolean(formik.errors['location.country'])}
                        helperText={formik.errors['location.country']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>{ formik.handleSubmit();setOpen(false)}} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default CompanyDialogForm;
