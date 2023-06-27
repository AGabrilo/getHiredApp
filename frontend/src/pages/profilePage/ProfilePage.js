import { Avatar, Box, Grid, Typography, Stack, Paper, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import data from './user.json';
import { EducationItem, ExperienceItem } from '../../components';

function ProfilePage() {
    const handleDelete = () => {
        console.log('Delete skill')
    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56 }} />
                            <Typography variant='h5'>Hello, {data.username}</Typography>
                            <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Stack direction={'column'} spacing={3}>
                                    <Typography variant='h5'>Email: {data.email}</Typography>
                                <Typography variant='h5'>Location: {data.location.city}, {data.location.country}</Typography>
                                <Typography variant='h5'>GitHub: {data.gitHubProfile}</Typography>
                                </Stack>
                                
                            </Paper>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={8} lg={8} sx={{ mt: 5 }}>
                        <Stack spacing={2}  >
                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>My summary</Typography>
                                    <Avatar>{data.summary ? <EditIcon /> : <AddIcon />}</Avatar>
                                </Box>
                                <Typography variant='h5'>{data.summary}</Typography>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>My resume</Typography>
                                    <Avatar>{data.resume ? <EditIcon /> : <AddIcon />}</Avatar>
                                </Box>
                                <Typography variant='h5'>{data.resume}</Typography>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My skills</Typography>
                                    <Avatar>{data.resume ? <EditIcon /> : <AddIcon />}</Avatar>
                                </Box>
                                <Grid container spacing={2}>
                                    {data.skills.length ?
                                        data.skills.map((skill) => <Grid item>
                                            <Chip label={skill} variant="outlined" onDelete={handleDelete} size='medium' />
                                        </Grid>)
                                        : null}
                                </Grid>

                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My education</Typography>
                                    <Avatar>{data.resume ? <EditIcon /> : <AddIcon />}</Avatar>
                                </Box>
                                {data.education.length ?
                                    data.education.map((educ) => <EducationItem education={educ} />)
                                    : null}
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My work experience</Typography>
                                    <Avatar>{data.resume ? <EditIcon /> : <AddIcon />}</Avatar>
                                </Box>
                                {data.workExperience.length ?
                                    data.workExperience.map((exp) => <ExperienceItem experience={exp} />)
                                    : null}

                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

            </Box>
        </Box>


    )
}

export default ProfilePage;