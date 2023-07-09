import React, { useState, useEffect } from 'react';
import { Box, Grid, Chip, Typography, IconButton } from '@mui/material';
import { ApplicationTable } from '../../components';

function MyApplicationsPage() {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filter, setFilter] = useState('')



    const getData = () => {
        fetch('http://localhost:3001/api/application/649e9c19f92c6b347d394b33', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setApplications(data)
                setFilteredApplications(data)
            });

        fetch('http://localhost:3001/api/user', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data)
            });

        fetch('http://localhost:3001/api/job', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJobs(data)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getFilteredData()
    }, [filter])

    const getFilteredData = () => {
console.log('hehee', applications.filter((el) => el.status === filter))
        if (filter) setFilteredApplications(applications.filter((el) => el.status === filter))
        else setFilteredApplications(applications)

    }


    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            {filteredApplications.length ?
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                    <Typography variant='h4' sx={{ mb: 4 }}>My applications</Typography>
                    <Grid container direction={'row'} spacing={1} sx={{ mb: 4 }}>
                        <Grid item>
                            <Typography variant='h6' sx={{ pt: 1.3 }}>{applications.length} applications</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setFilter('')}>
                                <Chip label="All" variant="outlined" />
                            </IconButton>

                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => setFilter('Pending')}>
                                <Chip label="Pending" variant="outlined" />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => setFilter('On hold')}>
                                <Chip label="On hold" variant="outlined" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setFilter('Candidate')}>
                                <Chip label="Candidate" variant="outlined" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {users.length && jobs.length ? <ApplicationTable applications={filteredApplications} users={users} jobs={jobs} getData={getData} setApplications={setApplications} /> : null}
                </Box>
                : null}



        </Box>

    )
}

export default MyApplicationsPage;