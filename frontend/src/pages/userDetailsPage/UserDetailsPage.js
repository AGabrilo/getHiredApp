import { Avatar, Box, Grid, Typography, Stack, Paper, Chip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { EducationItem, ExperienceItem } from '../../components';
import { saveAs } from 'file-saver'

function UserDetailsPage(props) {
    let { userId } = useParams();
    const [userData, setUserData] = useState()


    const getData = () => {
        fetch(`http://localhost:3001/api/user/${userId}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data)

            })
            .catch((e) => console.log('error', e));
    }
    const handleDownload = (user) => {
        fetch(`http://localhost:3001/api/user/download/${user._id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then((res) => res.arrayBuffer())
            .then((data) => {
                const blob = new Blob([data], { type: 'application/pdf' })
                saveAs(blob, `Resume_${user.firstName}_${user.lastName}.pdf`)
                getData()

            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>

            {userData ?
                <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                    <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                                <Avatar alt="Remy Sharp" src={`http://localhost:3001${userData.picture}`} sx={{ width: 108, height: 108 }} />
                                <Typography variant='h5'>{userData.firstName}  {userData.lastName}</Typography>
                                <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Stack direction={'column'} spacing={3}>
                                        <Typography variant='h5'>Email: {userData.email}</Typography>
                                        <Typography variant='h5'>Location: {userData.location && userData.location.city}, {userData.location && userData.location.country}</Typography>
                                    </Stack>
                                </Paper>
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

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My resume</Typography>
                                    </Box>
                                    <Typography variant='h5'>{userData.resume}</Typography>
                                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleDownload(userData)}>Download resume</Button>
                                </Paper>

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My skills</Typography>

                                    </Box>
                                    <Grid container spacing={2}>
                                        {userData.skills && userData.skills.length ?
                                            userData.skills.map((skill) => <Grid item>
                                                <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: '#ccccff' }} />
                                            </Grid>)
                                            : null}
                                    </Grid>

                                </Paper>

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My education</Typography>
                                    </Box>
                                    {userData.education && userData.education.length ?
                                        userData.education.map((educ, i) => <EducationItem education={educ} userData={userData} getData={getData} i={i} details />)
                                        : null}
                                </Paper>

                                <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant='h4' sx={{ color: '#f2572c' }}>My work experience</Typography>
                                    </Box>
                                    {userData.workExperience && userData.workExperience.length ?
                                        userData.workExperience.map((exp, i) => <ExperienceItem experience={exp} userData={userData} getData={getData} i={i} details />)
                                        : null}

                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
                : null}

        </Box>


    )
}

export default UserDetailsPage;