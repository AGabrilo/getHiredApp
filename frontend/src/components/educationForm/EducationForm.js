import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function EducationForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const initialValues = {
        degreeType: '',
        degreeName: '',
        schoolName: '',
        startDate: '',
        endDate: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            values.startDate = convertToISOString(values.startDate)
            values.endDate = convertToISOString(values.endDate)
            let newArray = user.education
            newArray.push(values)
            handleUpdate(user._id, { education: newArray })
        }
    })

    const convertToISOString = (stringDate) => {
        stringDate = stringDate.format('DD-MM-YYYY')
        const [month, day, year] = stringDate.split('-');
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.toISOString();
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle sx={{ mt: 1 }}>
                {`Add new education`}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='degreeType'
                        type='text'
                        name='degreeType'
                        label='Degree type'
                        value={formik.values['degreeType']}
                        onChange={formik.handleChange}
                        placeholder='Enter degree type'
                        error={Boolean(formik.errors['degreeType'])}
                        helperText={formik.errors['degreeType']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='degreeName'
                        type='text'
                        name='degreeName'
                        label='Degree name'
                        value={formik.values['degreeName']}
                        onChange={formik.handleChange}
                        placeholder='Enter degree name'
                        error={Boolean(formik.errors['degreeName'])}
                        helperText={formik.errors['degreeName']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='schoolName'
                        type='text'
                        name='schoolName'
                        label='School name'
                        value={formik.values['schoolName']}
                        onChange={formik.handleChange}
                        placeholder='Enter school name'
                        error={Boolean(formik.errors['schoolName'])}
                        helperText={formik.errors['schoolName']}
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
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { formik.handleSubmit(); setOpen(false) }} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EducationForm;
