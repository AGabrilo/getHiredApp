import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import {  JobCard, SearchComponent, JobDialogForm } from '../../components';
import { useSelector } from 'react-redux';
import { selectJobsConf } from '../../redux/jobsSlice';

function MyJobsPage() {
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const id = localStorage.getItem('id')
    const allJobs = useSelector(selectJobsConf).filter((el) => el.companyId === id)
    const [filteredData, setFilteredData] = useState([])
    const [open, setOpen] = useState(false);
    const noDataWidth = window.innerWidth - 300

    const handleAddJob = (jobObject) => {
        fetch(`http://localhost:3001/api/job`, {
            method: 'POST',
            body: JSON.stringify({...jobObject, companyId: id}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          })
            .then(() => getData())
            .catch((err) => {
              console.log(err.message);
            });
    }

    const handleModifyButton = (jobObject) => {
        fetch(`http://localhost:3001/api/job/${jobObject._id}`, {
            method: 'PUT',
            body: JSON.stringify(jobObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
        })
            .then(() =>  getData() )
            .catch((err) => {
                console.log(err.message);
            });

    }

    const handleDeleteButton = (jobId) => {
        fetch(`http://localhost:3001/api/job/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
        })
            .then(() =>  getData() )
            .catch((err) => {
                console.log(err.message);
            });

    }

    const getData = useCallback(() => {
        fetch(`http://localhost:3001/api/job`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFilteredData(data.filter((el) => el.companyId === id))
            });
    }, [id])

    useEffect(() => {
        getData()
    }, [getData])

    const getSearchedData = useCallback(() => {
        if (!name && !location) {
            setFilteredData(allJobs);
        } else if (name && !location) {
            setFilteredData(allJobs.filter((d) => d.jobTitle.toLowerCase().includes(name)));
        }
        else if (!name && location) {
            setFilteredData(allJobs.filter((d) => d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)));
        }
        else {
            setFilteredData(allJobs.filter((d) => (d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)) && d.jobTitle.toLowerCase().includes(name)));
        }
    }, [allJobs, location, name])

    useEffect(() => {
        getSearchedData()
    }, [name, location])

    const getExpiredData = () => {
        fetch(`http://localhost:3001/api/job/expired/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFilteredData(data)
            });
    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', minHeight: '100vh', width:'100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                <Stack direction={{ md: 'row', xs: 'column' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ width: '100%', mb: 3, justifyContent:'center' }}>
                    <SearchComponent setLocation={setLocation} setName={setName} component='Job' />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant='contained' sx={{ mr: 2, backgroundColor: '#f2572c', color: '#fafafa', height: 55 }} onClick={() => setOpen(true)}>Add new job</Button>
                        <Button variant='contained' sx={{ backgroundColor: '#f2572c', color: '#fafafa', height: 55 }} onClick={()=>getExpiredData(id)}>Expired jobs</Button>
                    </Box>
                </Stack>
                <Grid item container spacing={2} xs={12} md={9} lg={9} sx={{ height: 'fit-content', width: '100%', justifyContent:'flex-start' }}>
                    {filteredData.length ?
                        filteredData.map((job, i) => {
                            return <Grid container item sm={12} md={6} lg={6} xl={4} key={i}>
                                <JobCard job={job} handleApplyButton handleModifyButton={handleModifyButton} handleDeleteButton={handleDeleteButton}/>
                            </Grid>
                        })
                        : <Grid item sm={12} md={12} lg={12} xl={12} key={'No data'} sx={{ width: noDataWidth, }}>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant='h5'> No data</Typography>
                            </Box>

                        </Grid>
                    }

                </Grid>
            </Box>
            <JobDialogForm open={open} setOpen={setOpen} handleSubmit={handleAddJob} />
        </Box>

    )
}

export default MyJobsPage;