import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectJobTypesConf, selectSkillsConf, selectWorkLocationsConf } from '../../redux/configurationSlice';

function JobDialogForm(props) {
    const { job, open, setOpen, handleUpdate } = props;
    const initialValues = { jobTitle: job.jobTitle, description: job.description, hiringNum: job.hiringNum, location: { city: job.location.city, country: job.location.country }, jobType: job.jobType, skills: job.skills, workLocation: job.workLocation, deadline: job.deadline }
    const jobTypes = useSelector(selectJobTypesConf)
    const skills = useSelector(selectSkillsConf)
    const workLocations = useSelector(selectWorkLocationsConf)

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            handleUpdate(job._id, values)
        }
    })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
                {`Update job form`}
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='jobTitle'
                        type='text'
                        name='jobTitle'
                        label='Job Title'
                        value={formik.values['jobTitle']}
                        onChange={formik.handleChange}
                        placeholder='Enter your jobTitle'
                        error={Boolean(formik.errors['jobTitle'])}
                        helperText={formik.errors['jobTitle']}
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
                        key='hiringNum'
                        type='number'
                        name='hiringNum'
                        label='Hiring number'
                        value={formik.values['hiringNum']}
                        onChange={formik.handleChange}
                        placeholder='Enter hiring number'
                        error={Boolean(formik.errors['hiringNum'])}
                        helperText={formik.errors['hiringNum']}
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
                        size='small'
                        name='jobType'
                        defaultValue={formik.values['jobType']}
                        value={formik.values['jobType']}
                        onChange={(e, value) => formik.setFieldValue("jobType", value)}
                        options={jobTypes.map((type) => type.key)}
                        renderInput={(params) => (
                            <TextField {...params} label={'Job type'} />
                        )}
                        sx={{ mb: 2 }}
                    />
                    <Autocomplete
                        size='small'
                        name='workLocation'
                        defaultValue={formik.values['workLocation']}
                        value={formik.values['workLocation']}
                        onChange={(e, value) => formik.setFieldValue("workLocation", value)}
                        options={workLocations.map((type) => type.key)}
                        renderInput={(params) => (
                            <TextField {...params} label={'Work location'} />
                        )}
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 2 }}
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

export default JobDialogForm;
