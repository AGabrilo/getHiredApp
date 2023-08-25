import { Avatar, Box, Grid, Typography, Stack, Paper, Chip, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from 'react';
import { DeleteDialog, EducationForm, EducationItem, ExperienceForm, ExperienceItem, UserForm } from '../../components';

function UserDetailsPage(props) {
    const {userId}= props
const id = '649e9c19f92c6b347d394b33';
const [userData, setUserData] = useState()
const [open, setOpen] = useState(false)
const [openForm, setOpenForm] =useState(false);
const [educationForm, setEducationForm] = useState(false)
const [experienceForm, setExperienceForm] =useState(false);



    const getData = () => {
        fetch(`http://localhost:3001/api/user/649e9c19f92c6b347d394b33`, {
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
            .catch((e)=>console.log('error',e));
    }
    
    useEffect(() => {
      getData()
    }, [])

console.log('userData', userData)

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            
               {userData ? 
               <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                 <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56 }} />
                            <Typography variant='h5'>John Smith</Typography>
                            <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Stack direction={'column'} spacing={3}>
                                    <Typography variant='h5'>Email: {userData.email}</Typography>
                                <Typography variant='h5'>Location: {userData.location.city}, {userData.location.country}</Typography>
                                <Typography variant='h5'>GitHub: {userData.gitHubProfile}</Typography>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={8} lg={8} sx={{ mt: 5 }}>
                        <Stack spacing={2}  >
                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>My summary</Typography>
                                </Box>
                                <Typography variant='h5'>{userData.summary}</Typography>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>My resume</Typography>
                                </Box>
                                <Typography variant='h5'>{userData.resume}</Typography>
                                <Button variant='contained' sx={{backgroundColor: '#f2572c'}}>Download resume</Button>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My skills</Typography>
                                   
                                </Box>
                                <Grid container spacing={2}>
                                    {userData.skills.length ?
                                        userData.skills.map((skill) => <Grid item>
                                            <Chip label={skill} variant="outlined" size='medium' />
                                        </Grid>)
                                        : null}
                                </Grid>

                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My education</Typography>
                                </Box>
                                {userData.education.length ?
                                    userData.education.map((educ, i) => <EducationItem education={educ} userData={userData} getData={getData} i={i} details/>)
                                    : null}
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{color:'#f2572c'}}>My work experience</Typography>
                                </Box>
                                {userData.workExperience.length ?
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