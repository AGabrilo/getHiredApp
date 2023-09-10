import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function ExperienceForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const initialValues = {
        jobTitle: '',
        companyName: '',
        location: {
            country: '',
            city: ''
        },
        startDate: '',
        endDate: '',
        description: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            values.startDate = convertToISOString(values.startDate)
            values.endDate = convertToISOString(values.endDate)
            let newArray = user.workExperience
            newArray.push(values)
            handleUpdate(user._id, { workExperience: newArray })
        }
    })

    const convertToISOString = (stringDate) => {
        const test = stringDate.format('DD-MM-YYYY')
        const [day, month, year] = test.split('-');
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.toISOString();
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle sx={{ mt: 1 }}>
                {`Add new experience`}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='jobTitle'
                        type='text'
                        name={`jobTitle`}
                        label='Job title'
                        value={formik.values['jobTitle']}
                        onChange={formik.handleChange}
                        placeholder='Enter job title'
                        error={Boolean(formik.errors['jobTitle'])}
                        helperText={formik.errors['jobTitle']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='companyName'
                        type='text'
                        name={`companyName`}
                        label='Company name'
                        value={formik.values['companyName']}
                        onChange={formik.handleChange}
                        placeholder='Enter company name'
                        error={Boolean(formik.errors['companyName'])}
                        helperText={formik.errors['companyName']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='location.country'
                        type='text'
                        name={`location.country`}
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
                    <TextField
                        key='location.city'
                        type='text'
                        name={`location.city`}
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
                        key='description'
                        type='text'
                        name={`description`}
                        label='Description'
                        value={formik.values['description']}
                        onChange={formik.handleChange}
                        placeholder='Enter description'
                        error={Boolean(formik.errors['description'])}
                        helperText={formik.errors['description']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <DatePicker
                        label='Start date'
                        onChange={(value) => formik.setFieldValue("startDate", value)}
                        error={Boolean(formik.errors['startDate'])}
                        helperText={formik.errors['startDate']}
                        inputFormat="DD-MM-YYYY"
                        sx={{ mr: 1, mb: 1 }}
                        fullWidth />

                    <DatePicker
                        label='End date'
                        onChange={(value) => formik.setFieldValue("endDate", value)}
                        error={Boolean(formik.errors['endDate'])}
                        helperText={formik.errors['endDate']}
                        inputFormat="DD-MM-YYYY"
                        sx={{ mb: 1 }}
                        fullWidth />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => setOpen(false)} sx={{ backgroundColor: '#f2572c' }}>Cancel</Button>
                <Button variant='contained' onClick={() => { formik.handleSubmit(); setOpen(false) }} autoFocus sx={{ backgroundColor: '#f2572c' }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExperienceForm;