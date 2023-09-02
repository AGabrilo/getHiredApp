import { Avatar, Box, Grid, Typography, Stack, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from 'react';
import { CompanyDialogForm, DeleteDialog } from '../../components';
import PictureForm from '../../components/pictureForm/PictureForm';

function ProfilePageCompany(props) {
    const { id } = props
    const [company, setCompany] = useState()
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] = useState(false);
    const [pictureForm, setPictureForm] = useState(false);
    const navigate = useNavigate();

    const handleDeleteButton = (id) => {
        fetch(`http://localhost:3001/api/company/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then((res) => {
                res.json()
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("id");
                localStorage.removeItem("name")
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const handleUpdate = (companyId, updatedCompanyObject) => {
        let headers = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        let body = JSON.stringify(updatedCompanyObject)
        let formData = {}
        if (updatedCompanyObject.resume || updatedCompanyObject.picture) {

            formData = new FormData();
            formData.append("picture", updatedCompanyObject.picture)
            headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            body = formData
        }

        fetch(`http://localhost:3001/api/company/${companyId}`, {
            method: 'PUT',
            body: body,
            headers: headers
        })
            .then(() => getData())
            .catch((err) => {
                console.log(err.message);
            });
    }

    const getData = useCallback(() => {
        fetch(`http://localhost:3001/api/company/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCompany(data)
            })
            .catch((e) => console.log('error', e));
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        company ?
            <Box sx={{ p: 5, backgroundColor: '#e9e8eb' }}>
                <Grid container spacing={2} width={'100%'} sx={{ mt: 7 }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <Stack spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src={`http://localhost:3001${company.picture}`} sx={{ width: 106, height: 106 }} />
                            <Typography variant='h5'>Hello, {company.name}</Typography>
                            <Paper sx={{ p: 2.4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Stack direction={'column'} spacing={3}>
                                    <Typography variant='h5'>Email: {company.email}</Typography>
                                    <Typography variant='h5'>Location:  {company.location && company.location.city}  {company.location && company.location.country}</Typography>
                                </Stack>
                            </Paper>
                            <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }} onClick={() => setOpen(true)}>Delete profile</Button>

                            <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }} onClick={() => setOpenForm(true)}>Update profile</Button>

                            <Button variant='contained' sx={{ width: 200, height: 60, fontSize: 16, backgroundColor: '#f2572c' }} onClick={() => setPictureForm(true)}>Add profile picture</Button>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={8} lg={8} sx={{ mt: 5 }}>
                        <Stack spacing={2}  >
                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{ color: '#f2572c' }}>My description</Typography>
                                </Box>
                                <Typography variant='h5'>{company.description}</Typography>
                            </Paper>

                            <Paper sx={{ p: 4, backgroundColor: 'white', width: '100%', borderRadius: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant='h4' sx={{ color: '#f2572c' }}>Employers number</Typography>
                                </Box>
                                <Typography variant='h5'>{company.employersNum}</Typography>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
                <DeleteDialog open={open} setOpen={setOpen} id={company._id} handleDeleteButton={handleDeleteButton} component='company' />
                <CompanyDialogForm open={openForm} setOpen={setOpenForm} company={company} handleUpdate={handleUpdate} />
                <PictureForm open={pictureForm} setOpen={setPictureForm} id={id} handleApplyButton={handleUpdate} />
            </Box>
            : null
    )
}

export default ProfilePageCompany;