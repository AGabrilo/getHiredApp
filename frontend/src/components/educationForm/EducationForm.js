import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {  selectSkillsConf } from '../../redux/configurationSlice';

function EducationForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const initialValues = {
                degreeType: '',
                degreeName: '',
                startDate: '',
                endDate: '',
                schoolName: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            let newArray = user.education
            newArray.push(values)
            console.log('newArray', newArray)
            handleUpdate(user._id, {education: newArray})
        }
    })

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
                        key='startDate'
                        type='text'
                        name='startDate'
                        label='start Date'
                        value={formik.values['startDate']}
                        onChange={formik.handleChange}
                        placeholder='Enter your start Date'
                        error={Boolean(formik.errors['startDate'])}
                        helperText={formik.errors['startDate']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='endDate'
                        type='text'
                        name='endDate'
                        label='end Date'
                        value={formik.values['endDate']}
                        onChange={formik.handleChange}
                        placeholder='Enter your end Date'
                        error={Boolean(formik.errors['endDate'])}
                        helperText={formik.errors['endDate']}
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
                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => { formik.handleSubmit(); setOpen(false) }} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EducationForm;
