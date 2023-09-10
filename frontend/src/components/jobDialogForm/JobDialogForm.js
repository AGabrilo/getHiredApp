import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectJobTypesConf, selectSkillsConf, selectWorkLocationsConf } from '../../redux/configurationSlice';
import { DatePicker } from '@mui/x-date-pickers';

function JobDialogForm(props) {
    const { job, open, setOpen, handleSubmit } = props;
    const jobTypes = useSelector(selectJobTypesConf)
    const skills = useSelector(selectSkillsConf)
    const workLocations = useSelector(selectWorkLocationsConf)
    const initialValues = job ? { _id: job._id, jobTitle: job.jobTitle, description: job.description, hiringNum: job.hiringNum, location: { city: job.location && job.location.city, country: job.location && job.location.country }, jobType: job.jobType, skills: job.skills, workLocation: job.workLocation, deadline: job.deadline }
        : { jobTitle: '', description: '', hiringNum: '', location: { city: '', country: '' }, jobType: '', skills: [], workLocation: '', deadline: '' }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            values.deadline = convertToISOString(values.deadline)
            handleSubmit(values)
        }
    })

    const convertToISOString = (stringDate) => {
        const test = stringDate.format('DD-MM-YYYY')
        const [day, month, year] = test.split('-');
        const date = new Date(year, month - 1, day);
        return date.toISOString();
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle id="alert-dialog-title" sx={{ mt: 1 }}>
                {`Add job form`}
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
                        options={jobTypes ? jobTypes.map((type) => type.key) : []}
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
                        options={workLocations ? workLocations.map((type) => type.key) : []}
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
                        options={skills ? skills.map((skill) => skill.key) : []}
                        renderInput={(params) => (
                            <TextField {...params} label={'Skills'} />
                        )}
                        sx={{ mb: 2 }}
                    />
                    <DatePicker label="Expiring date"
                        sx={{ width: '100%' }}
                        onChange={(value) => formik.setFieldValue("deadline", value)}
                        error={Boolean(formik.errors['deadline'])}
                        helperText={formik.errors['deadline']}
                        inputFormat="DD-MM-YYYY" />

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

export default JobDialogForm;
