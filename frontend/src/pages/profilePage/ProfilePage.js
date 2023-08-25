import { Avatar, Box, Grid, Typography, Stack, Paper, Chip, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserConf } from '../../redux/userSlice';
import { DeleteDialog, EducationForm, EducationItem, ExperienceForm, ExperienceItem, UserForm } from '../../components';

function ProfilePage() {
    const id = localStorage.getItem('id');
    const user = useSelector(selectUserConf)
    const [userData, setUserData] = useState()
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] = useState(false);
    const [educationForm, setEducationForm] = useState(false)
    const [experienceForm, setExperienceForm] = useState(false);
    const [fileList, setFileList] = useState([]);

    console.log("helooooooooooo", user)
    const handleDeleteButton = (id) => {
        fetch(`http://localhost:3001/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // body: JSON.stringify({ role: localStorage.getItem('role') })
        })
            .then((res) => {
                res.json()
                getData()
            })
            .catch((err) => {
                console.log(err.message);
            });


    }

    const handleUpdate = (userId, updatedUserObject) => {
        fetch(`http://localhost:3001/api/user/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUserObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((data) => {
                getData()
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    const getData = () => {
        fetch(`http://localhost:3001/api/user/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('dataa', data)
                setUserData(data)

            })
            .catch((e) => console.log('error', e));
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('userData', userData)

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', height:'100vh' }}>

            {userData ?
                <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                    <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56 }} />
                                <Typography variant='h5'>Hello, {userData.firstName} {userData.lastName}</Typography>
                                <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Stack direction={'column'} spacing={3}>
                                        <Typography variant='h5'>Email: {userData.email}</Typography>
                                        {userData.location ? <>
                                            <Typography variant='h5'>Location: {userData.location.city}, {userData.location.country}</Typography>
                                        </> : null}
                                        <Typography variant='h5'>GitHub: {userData.gitHubProfile}</Typography>
                                    </Stack>
                                </Paper>
                                <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }} onClick={() => setOpen(true)}>Delete profile</Button>

                                <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }} onClick={() => setOpenForm(true)}>Update profile</Button>

                                <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }}>Add profile picture</Button>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={8} lg={8} sx={{ mt: 5 }}>
                            <Stack spacing={2}  >
                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My summary</Typography>
                                    </Box>
                                    <Typography variant='h5'>{userData.summary}</Typography>
                                </Paper>

                                {/* <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My resume</Typography>
                                    </Box>
                                    <Typography variant='h5'>{userData.resume}</Typography>
                                    <input type="file" name='resume' onChange={(e) => handleUpdate(id, { resume: e.target.files[0] })} multiple />
                                </Paper> */}

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My skills</Typography>

                                    </Box>
                                    <Grid container spacing={2}>
                                        {userData.skills && userData.skills.length ?
                                            userData.skills.map((skill) => <Grid item>
                                                <Chip label={skill} variant="outlined" size='medium' />
                                            </Grid>)
                                            : null}
                                    </Grid>

                                </Paper>

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My education</Typography>
                                        <IconButton onClick={() => setEducationForm(true)}> <AddIcon /></IconButton>
                                    </Box>
                                    {userData.education && userData.education.length ?
                                        userData.education.map((educ, i) => <EducationItem education={educ} userData={userData} getData={getData} i={i} />)
                                        : null}
                                </Paper>

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My work experience</Typography>
                                        <IconButton onClick={() => setExperienceForm(true)}> <AddIcon /></IconButton>
                                    </Box>
                                    {userData.workExperience && userData.workExperience.length ?
                                        userData.workExperience.map((exp, i) => <ExperienceItem experience={exp} userData={userData} getData={getData} i={i} />)
                                        : null}

                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                    <DeleteDialog open={open} setOpen={setOpen} id={user._id} handleDeleteButton={handleDeleteButton} component='user' />
                    {openForm ? <UserForm open={openForm} setOpen={setOpenForm} user={userData} handleUpdate={handleUpdate} /> : null}
                    {experienceForm ? <ExperienceForm open={experienceForm} setOpen={setExperienceForm} user={userData} handleUpdate={handleUpdate} /> : null}
                    {educationForm ? <EducationForm open={educationForm} setOpen={setEducationForm} user={userData} handleUpdate={handleUpdate} /> : null}
                </Box>
                : null}

        </Box>


    )
}

export default ProfilePage;