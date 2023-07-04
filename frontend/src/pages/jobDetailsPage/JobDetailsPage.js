import React, { useState, useEffect } from 'react';
import { Box, Button, CardContent, Card, Typography, Stack, Grid, Paper, IconButton, Divider, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DeleteCompanyButton, DeleteJobButton, PostedJob, TopCompanies } from '../../components';
import { palette } from '../../utils/palette'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import UpdateJobButton from '../../components/updateJobButton/UpdateJobButton';

function JobDetailsPage() {
    let { jobId } = useParams();
    const isCompany = true
    const [job, setJob] = useState();

    const getData = () => {
        fetch(`http://localhost:3001/api/job/${jobId}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJob(data)
            });
    }

    useEffect(() => {
        getData()

    }, [jobId])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>

                <Typography variant='h3' >Job Details</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'wrap' }}>
                    <Grid container spacing={2} item xs={12} md={9} lg={9} sx={{ height: 'fit-content', mb: 3 }}>
                        {job ?
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
                                                src={require("../../components/companyCard/company.jpeg")}
                                                alt=""
                                            />
                                            <Box>
                                                <Typography variant='h4' sx={{ fontWeight: 700 }}>
                                                    {job.jobTitle}
                                                </Typography>
                                                <Typography variant='h6'>
                                                    {job.companyId}
                                                </Typography>
                                                <Typography>
                                                    {job.location.city}, {job.location.country}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Box>
                                            <Button variant='contained' sx={{ width: '120px', height: '60px', backgroundColor: '#f2572c', fontSize:20 }}>Apply</Button>
                                            <IconButton variant="outlined" color="neutral" sx={{ flexGrow: 0 }}>
                                                <FavoriteBorder />
                                            </IconButton>
                                        </Box>

                                    </Box>
                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <WorkOutlineOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>JOB TYPE: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.jobType}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <LocationOnOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>LOCATION: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.workLocation}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <CalendarMonthOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>POSTED: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.datePosted}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <PeopleAltOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>HIRING NUMBER: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.hiringNum}</Typography>
                                    </Stack>
                                    <Divider />

                                    <Stack direction="row" spacing={2} sx={{ ml: 1, my: 1 }} flexWrap={'wrap'}>
                                        <ChecklistOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>SKILLS: </Typography>
                                        {job.skills.length ? job.skills.map((skill, i) => {
                                            return <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: palette[i] }} key={i} />
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
                                        <CalendarMonthOutlinedIcon />
                                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>DEADLINE: </Typography>
                                        <Typography variant='h5' sx={{ color: '#303030' }}>{job.deadline}</Typography>
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
                            : <Typography variant='h5' >No Data</Typography>}
                    </Grid>

                    <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content' }}>
                        <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                            <Paper sx={{ p: 3, minWidth: 150 }}>
                                <Typography variant='h5' >Other jobs</Typography>
                            </Paper>
                            <TopCompanies />
                        </Stack>
                    </Grid>
                </Box>

            </Box>
        </Box >
    )
}

export default JobDetailsPage;