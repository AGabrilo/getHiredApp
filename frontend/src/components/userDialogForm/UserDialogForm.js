import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';

function UserDialogForm(props) {
const {  user, open, setOpen, handleUpdate} = props;
const initialValues = { firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email}
const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
        console.log('Values on submit:', values)
        handleUpdate(user._id,values)
    }
})
console.log(initialValues)

    return (
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DialogTitle sx={{mt:1}}>
          {`Update user form`}
        </DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='lastName'
                        type='text'
                        name='lastName'
                        label='Last name'
                        value={formik.values['lastName']}
                        onChange={formik.handleChange}
                        placeholder='Enter your last name'
                        error={Boolean(formik.errors['lastName'])}
                        helperText={formik.errors['lastName']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='firstName'
                        type='text'
                        name='firstName'
                        label='First name'
                        value={formik.values['firstName']}
                        onChange={formik.handleChange}
                        placeholder='Enter your first name'
                        error={Boolean(formik.errors['firstName'])}
                        helperText={formik.errors['firstName']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
               <TextField
                        key='username'
                        type='text'
                        name='username'
                        label='Username'
                        value={formik.values['username']}
                        onChange={formik.handleChange}
                        placeholder='Enter your username'
                        error={Boolean(formik.errors['username'])}
                        helperText={formik.errors['username']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                     <TextField
                        key='email'
                        type='text'
                        name='email'
                        label='Email'
                        value={formik.values['email']}
                        onChange={formik.handleChange}
                        placeholder='Enter your email'
                        error={Boolean(formik.errors['email'])}
                        helperText={formik.errors['email']}
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

export default UserDialogForm;
