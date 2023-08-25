import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle, Autocomplete, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectJobTypesConf, selectSkillsConf, selectWorkLocationsConf } from '../../redux/configurationSlice';

function UserForm(props) {
    const { user, open, setOpen, handleUpdate } = props;
    const initialValues = {
        firstName: user.firstName, lastName: user.lastName, summary: user.summary, location: { city: user.location ? user.location.city : '', country: user.location ? user.location.country : '' }, email: user.email, skills: user.skills,
        workExperience: user.workExperience.map((el) => {
            return {
                jobTitle: el.jobTitle,
                companyName: el.companyName,
                location: {
                    country: el.location.country,
                    city: el.location.city
                },
                startDate: el.startDate,
                endDate: el.endDate,
                description: el.description
            }
        }),
        education: user.education.map((el) => {
            return {
                degreeType: el.degreeType,
                degreeName: el.degreeName,
                startDate: el.startDate,
                endDate: el.endDate,
                schoolName: el.schoolName
            }
        }),
    }
    const skills = useSelector(selectSkillsConf)

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
                    {user.workExperience.map((el, i) => {
                        return <>
                            <Typography variant='h6' sx={{ mt: 2 }}>{i + 1}. Experience</Typography>
                            <TextField
                                key='workExperience.jobTitle'
                                type='text'
                                name={`workExperience.${i}.jobTitle`}
                                label='Job title'
                                value={formik.values['workExperience'][i].jobTitle}
                                onChange={formik.handleChange}
                                placeholder='Enter job title'
                                error={Boolean(formik.errors['workExperience.jobTitle'])}
                                helperText={formik.errors['workExperience.jobTitle']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.companyName'
                                type='text'
                                name={`workExperience.${i}.companyName`}
                                label='Company name'
                                value={formik.values['workExperience'][i].companyName}
                                onChange={formik.handleChange}
                                placeholder='Enter company name'
                                error={Boolean(formik.errors['workExperience.companyName'])}
                                helperText={formik.errors['workExperience.companyName']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.location.country'
                                type='text'
                                name={`workExperience.${i}.location.country`}
                                label='Country'
                                value={formik.values['workExperience'][i].location.country}
                                onChange={formik.handleChange}
                                placeholder='Enter country'
                                error={Boolean(formik.errors['workExperience.location.country'])}
                                helperText={formik.errors['workExperience.location.country']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.location.city'
                                type='text'
                                name={`workExperience.${i}.location.city`}
                                label='City'
                                value={formik.values['workExperience'][i].location.city}
                                onChange={formik.handleChange}
                                placeholder='Enter city'
                                error={Boolean(formik.errors['workExperience.location.city'])}
                                helperText={formik.errors['workExperience.location.city']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.startDate'
                                type='text'
                                name={`workExperience.${i}.startDate`}
                                label='Start date'
                                value={formik.values['workExperience'][i].startDate}
                                onChange={formik.handleChange}
                                placeholder='Enter start date'
                                error={Boolean(formik.errors['workExperience.startDate'])}
                                helperText={formik.errors['workExperience.startDate']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.endDate'
                                type='text'
                                name={`workExperience.${i}.endDate`}
                                label='End date'
                                value={formik.values['workExperience'][i].endDate}
                                onChange={formik.handleChange}
                                placeholder='Enter end date'
                                error={Boolean(formik.errors['workExperience.endDate'])}
                                helperText={formik.errors['workExperience.endDate']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='workExperience.description'
                                type='text'
                                name={`workExperience.${i}.description`}
                                label='Description'
                                value={formik.values['workExperience'][i].description}
                                onChange={formik.handleChange}
                                placeholder='Enter description'
                                error={Boolean(formik.errors['workExperience.description'])}
                                helperText={formik.errors['workExperience.description']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                        </>
                    })}


{user.education.map((el, i) => {
                        return <>
                            <Typography variant='h6' sx={{ mt: 2 }}>{i + 1}. Education</Typography>
                            <TextField
                                key='education.degreeType'
                                type='text'
                                name={`education.${i}.degreeType`}
                                label='Degree type'
                                value={formik.values['education'][i].degreeType}
                                onChange={formik.handleChange}
                                placeholder='Enter degree type'
                                error={Boolean(formik.errors['education.degreeType'])}
                                helperText={formik.errors['education.degreeType']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='education.degreeName'
                                type='text'
                                name={`education.${i}.degreeName`}
                                label='Degree name'
                                value={formik.values['education'][i].degreeName}
                                onChange={formik.handleChange}
                                placeholder='Enter degree name'
                                error={Boolean(formik.errors['education.degreeName'])}
                                helperText={formik.errors['education.degreeName']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                             <TextField
                                key='education.schoolName'
                                type='text'
                                name={`education.${i}.schoolName`}
                                label='School name'
                                value={formik.values['education'][i].schoolName}
                                onChange={formik.handleChange}
                                placeholder='Enter school name'
                                error={Boolean(formik.errors['education.schoolName'])}
                                helperText={formik.errors['education.schoolName']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='education.startDate'
                                type='text'
                                name={`education.${i}.startDate`}
                                label='Start date'
                                value={formik.values['education'][i].startDate}
                                onChange={formik.handleChange}
                                placeholder='Enter start date'
                                error={Boolean(formik.errors['education.startDate'])}
                                helperText={formik.errors['education.startDate']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                            <TextField
                                key='education.endDate'
                                type='text'
                                name={`education.${i}.endDate`}
                                label='End date'
                                value={formik.values['education'][i].endDate}
                                onChange={formik.handleChange}
                                placeholder='Enter end date'
                                error={Boolean(formik.errors['education.endDate'])}
                                helperText={formik.errors['education.endDate']}
                                margin='normal'
                                variant='standard'
                                size='small'
                                fullWidth
                            />
                        </>
                    })}


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
                        sx={{ mb: 2, mt:2 }}
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

export default UserForm;
