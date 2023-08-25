import { Avatar, Box, Grid, Typography, Stack, Paper, Chip, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from 'react';
import { DeleteDialog, EducationForm, EducationItem, ExperienceForm, ExperienceItem, UserForm } from '../../components';

function ProfilePageCompany() {
const id = '649e8ba0f92c6b347d394b15';
const [userData, setUserData] = useState()
const [open, setOpen] = useState(false)
const [openForm, setOpenForm] =useState(false);
const [educationForm, setEducationForm] = useState(false)
const [experienceForm, setExperienceForm] =useState(false);

const handleDeleteButton = (id) => {
    fetch(`http://localhost:3001/api/company/${id}`, {
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

    const handleUpdate = (userId, updatedCompanyObject) => {

        fetch(`http://localhost:3001/api/company/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCompanyObject),
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
        fetch(`http://localhost:3001/api/company/${id}`, {
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
        <Box sx={{ backgroundColor: '#e9e8eb', minHeight:'100vh' }}>
            
               {userData ? 
               <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                 <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                            <Avatar alt="Company" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56 }} />
                            <Typography variant='h5'>Hello, {userData.name}</Typography>
                            <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Stack direction={'column'} spacing={3}>
                                    <Typography variant='h5'>Email: {userData.email} ericsson@gmail.com</Typography>
                                <Typography variant='h5'>Location: {userData.location.city}, {userData.location.country}</Typography>
                                </Stack>
                            </Paper>
                            <Button variant='contained' sx={{width: 200, height:60, fontSize:16, backgroundColor: '#f2572c'}} onClick={()=> setOpen(true)}>Delete profile</Button>

                            <Button variant='contained' sx={{width: 200, height:60, fontSize:16, backgroundColor: '#f2572c'}} onClick={()=> setOpenForm(true)}>Update profile</Button>

                            <Button variant='contained' sx={{width: 200, height:60, fontSize:16, backgroundColor: '#f2572c'}}>Add profile picture</Button>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={8} lg={8} sx={{ mt: 5 }}>
                        <Stack spacing={2}  >
                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>My description</Typography>
                                </Box>
                                <Typography variant='h5'>{userData.description}</Typography>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4'sx={{color:'#f2572c'}}>Employers number</Typography>
                                </Box>
                                <Typography variant='h5'>{userData.employersNum}</Typography>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
                <DeleteDialog open={open} setOpen={setOpen} id={userData._id} handleDeleteButton={handleDeleteButton} component='user' />
           {openForm ? <UserForm open={openForm} setOpen={setOpenForm} user={userData} handleUpdate={handleUpdate} /> : null}
 </Box>
               : null}
           
        </Box>


    )
}

export default ProfilePageCompany;