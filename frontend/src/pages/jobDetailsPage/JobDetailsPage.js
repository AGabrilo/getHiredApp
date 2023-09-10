import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, CardContent, Card, Typography, Stack, Grid, Paper, IconButton, Divider, Chip, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ApplyForm, DeleteJobButton, TopCompanies } from '../../components';
import { useSelector } from 'react-redux';
import { selectCompaniesConf } from '../../redux/companiesSlice';
import dateFormat from 'dateformat';
import { PeopleAltOutlined, WorkOutlineOutlined, LocationOnOutlined, CalendarMonthOutlined, ChecklistOutlined, Favorite } from '@mui/icons-material';
import UpdateJobButton from '../../components/updateJobButton/UpdateJobButton';

function JobDetailsPage() {
    let { jobId } = useParams();
    const isCompany = localStorage.getItem('role') === 'company' ? true : false
    const [job, setJob] = useState();
    const companies = useSelector(selectCompaniesConf)
    const [company, setCompany] = useState({})
    const [favourite, setFavourite] = useState([])
    const [open, setOpen] = useState(false);
    const id = localStorage.getItem('id')

    const getFavourites = useCallback(() => {
        fetch(`http://localhost:3001/api/favourite/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFavourite(data)
            });
    },[id])

    const checkIfFavourite = (jobId) => {
        let check = favourite.filter((el) => el.jobId === jobId)
        if (check.length) return check
        else return false
    }

    const handleFavouriteButton = (jobId) => {
        let check = checkIfFavourite(jobId)
        if (checkIfFavourite(jobId)) {
            fetch(`http://localhost:3001/api/favourite/${check[0]._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then((res) => {
                    res.json()
                    getFavourites()
                })
                .catch((err) => {
                    console.log(err.message);
                });

        }
        else {
            fetch(`http://localhost:3001/api/favourite`, {
                method: 'POST',
                body: JSON.stringify({ userId: id, jobId: jobId }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    getFavourites()
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }

    useEffect(() => {
        getFavourites()
    }, [getFavourites])

    const getData = useCallback(() => {
        fetch(`http://localhost:3001/api/job/${jobId}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJob(data)
                setCompany(companies.filter((company) => company._id === data.companyId)[0])
            })
    }, [jobId, companies])

    useEffect(() => {
        getData()

    }, [jobId, getData])

    const handleApplyButton = (formData) => {
        fetch(`http://localhost:3001/api/application`, {
            method: 'POST',
            body: formData
        })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>

                <Typography variant='h3' >Job Details</Typography>
                {job && company ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'wrap' }}>
                        <Grid container spacing={2} item xs={12} md={9} lg={9} sx={{ height: 'fit-content', mb: 3 }}>
                            <Card
                                orientation="horizontal"
                                sx={{
                                    width: '100%',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <CardContent sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                                        <Stack direction={{ md: 'row', xs: 'column' }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ alignItems: 'center', mb: 2 }} >
                                            <img
                                                src={`http://localhost:3001${company.picture}`}
                                                alt=""
                                                width={200}
                                                height={200}
                                            />
                                            <Box>
                                                <Typography variant='h4' sx={{ fontWeight: 700 }}>
                                                    {job.jobTitle}
                                                </Typography>
                                                <Typography variant='h6'>
                                                    {company.name}
                                                </Typography>
                                                <Typography>
                                                    {job.location && job.location.city}  {job.location&& job.location.country}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        {!isCompany ?
                                            <Box>
                                                <Button variant='contained' sx={{ width: '120px', height: '60px', backgroundColor: '#f2572c', fontSize: 20 }} onClick={() => setOpen(true)}>Apply</Button>
                                                <IconButton variant="outlined" color={checkIfFavourite(job._id) ? "error" : "neutral"} sx={{ mr: 'auto', flexGrow: 0 }} onClick={() => handleFavouriteButton(job._id)}>
                                                    <Favorite />
                                                </IconButton>
                                                <ApplyForm open={open} setOpen={setOpen} id={job._id} handleApplyButton={handleApplyButton} />
                                            </Box>
                                            : null
                                        }

                                    </Box>
                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <WorkOutlineOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>JOB TYPE: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.jobType}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <LocationOnOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>LOCATION: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.workLocation}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <CalendarMonthOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>POSTED: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}> {dateFormat(job.datePosted, "mmmm dS, yyyy")}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <PeopleAltOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>HIRING NUMBER: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.hiringNum}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <ChecklistOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>SKILLS: </Typography>
                                        {job.skills.length ? job.skills.map((skill, i) => {
                                            return <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: '#ccccff' }} key={i} />
                                        }) : null}
                                    </Stack>
                                    <Divider />
                                    <Stack direction="column" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <Typography variant='h5' sx={{ fontWeight: 700, color: '#f2572c', mt: 2 }}>Description</Typography>
                                        <Typography variant='h6' sx={{ mt: 1 }}>
                                            {job.description}
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <CalendarMonthOutlined />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>DEADLINE: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}> {dateFormat(job.deadline, "mmmm dS, yyyy")}</Typography>
                                    </Stack>
                                    <Divider />

                                    {isCompany ?
                                        <Box sx={{ mt: 3 }}>
                                            <DeleteJobButton job={job} />
                                            <UpdateJobButton job={job} getData={getData} />
                                        </Box>
                                        : null}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content' }}>
                            <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                                <Paper sx={{ p: 3, minWidth: 150 }}>
                                    <Typography variant='h5' >Other companies</Typography>
                                </Paper>
                                <TopCompanies />
                            </Stack>
                        </Grid>
                    </Box>
                    : <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
            </Box>
        </Box >
    )
}

export default JobDetailsPage;