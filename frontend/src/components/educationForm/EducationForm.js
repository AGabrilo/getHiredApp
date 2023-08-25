import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function EducationForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const initialValues = {
        degreeType: '',
        degreeName: '',
        schoolName: '',
        startDate: dayjs('2022-04-17'),
        endDate: dayjs('2022-04-17')
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            values.startDate = convertToISOString(values.startDate)
            values.endDate = convertToISOString(values.endDate)
            console.log('tessssst', values.startDate)
            let newArray = user.education
            newArray.push(values)
            handleUpdate(user._id, { education: newArray })
        }
    })

    const convertToISOString = (stringDate) => {
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
                        value={formik.values['startDate']}
                        onChange={(value) => formik.setFieldValue("startDate", value.format("DD-MM-YYYY"))}
                        error={Boolean(formik.errors['startDate'])}
                        helperText={formik.errors['startDate']}
                        inputFormat="DD-MM-YYYY"
                        sx={{ mt: 1, mb: 1 }} />

                    <DatePicker
                        label='End date'
                        value={formik.values['endDate']}
                        onChange={(value) => formik.setFieldValue("endDate", value.format("DD-MM-YYYY"))}
                        error={Boolean(formik.errors['endDate'])}
                        helperText={formik.errors['endDate']}
                        inputFormat="DD-MM-YYYY"
                        sx={{ mb: 1 }} />
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
