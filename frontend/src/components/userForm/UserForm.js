import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSkillsConf } from '../../redux/configurationSlice';

function UserForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const skills = useSelector(selectSkillsConf)
    const initialValues = {
        firstName: user.firstName, lastName: user.lastName, summary: user.summary, location: { city: user.location ? user.location.city : '', country: user.location ? user.location.country : '' }, email: user.email, skills: user.skills
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            handleUpdate(user._id, values)
        }
    })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
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
                        key='summary'
                        type='text'
                        name='summary'
                        label='summary'
                        value={formik.values['summary']}
                        onChange={formik.handleChange}
                        placeholder='Enter your summary'
                        error={Boolean(formik.errors['summary'])}
                        helperText={formik.errors['summary']}
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

                    <Autocomplete
                        multiple
                        size='small'
                        limitTags={4}
                        name='skills'
                        defaultValue={formik.values['skills']}
                        value={formik.values['skills']}
                        onChange={(e, value) => formik.setFieldValue("skills", value)}
                        options={skills.map((skill) => skill.key)}
                        renderInput={(params) => (
                            <TextField {...params} label={'Skills'} />
                        )}
                        sx={{ mb: 2, mt: 2 }}
                    />
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

export default UserForm;