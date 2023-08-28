import React, { useState, useEffect } from 'react';
import { Box, Grid, Chip, Typography, IconButton } from '@mui/material';
import { ApplicationTable } from '../../components';
import { useSelector } from 'react-redux';
import { selectJobsConf } from '../../redux/jobsSlice';
import { selectUsersConf } from '../../redux/userSlice';

function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filter, setFilter] = useState('')
    const userId = localStorage.getItem('id')
    const role = localStorage.getItem('role')
    const users = useSelector(selectUsersConf)
    const jobs = useSelector(selectJobsConf)

    const getData = () => {
        fetch(`http://localhost:3001/api/application/${role === 'user' ? "user/" : ""}${userId}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setApplications(data)
                setFilteredApplications(data)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getFilteredData()
    }, [filter])

    const getFilteredData = () => {
        if (filter) setFilteredApplications(applications.filter((el) => el.status === filter))
        else setFilteredApplications(applications)

    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', height: '100vh' }}>
            {filteredApplications.length && users.length?
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                    <Typography variant='h4' sx={{ mb: 4 }}>My applications</Typography>
                    <Grid container direction={'row'} spacing={1} sx={{ mb: 4 }}>
                        <Grid item>
                            <Typography variant='h6' sx={{ pt: 1.3 }}>{applications.length} applications</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setFilter('')}>
                                <Chip label="All" variant="outlined" sx={{ backgroundColor: '#f2572c', color: '#fafafa' }} />
                            </IconButton>

                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => setFilter('Pending')}>
                                <Chip label="Pending" variant="outlined" sx={{ backgroundColor: '#f2572c', color: '#fafafa' }} />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => setFilter('Rejected')}>
                                <Chip label="Rejected" variant="outlined" sx={{ backgroundColor: '#f2572c', color: '#fafafa' }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setFilter('Candidate')}>
                                <Chip label="Candidate" variant="outlined" sx={{ backgroundColor: '#f2572c', color: '#fafafa' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <ApplicationTable applications={filteredApplications} users={users} jobs={jobs} getData={getData} setApplications={setApplications} />
                </Box>
                : null}
        </Box>

    )
}

export default MyApplicationsPage;