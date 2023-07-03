import React, {useEffect, useState} from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { JobFilters, JobCard, JobSearch } from '../../components';

const locationFilter = ["on-site", "remote"]
const jobTypeFilter = ["full-time", "part-time", "internship"]
const datePostedFilter = ["any", "last 24 hours", "last 3 days", "last week", "last month"]

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [filteredData, setFilteredData] = useState([])

    const getData = () => {
        fetch('http://localhost:3001/api/job', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJobs(data)
                setFilteredData(data)
            });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>
                <JobSearch />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'no-wrap' }}>
                    <Grid container spacing={2} item xs={12} md={9} lg={9} >
                        {filteredData.map((job, i)=>{
                            return <Grid item md={4} lg={4} key={i}>
                            <JobCard job={job}/>
                        </Grid>
                        })}
                        
                        
                    </Grid>

                    <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                            <JobFilters title={'Location'} data={locationFilter} />
                            <JobFilters title={'Job type'} data={jobTypeFilter} />
                            <JobFilters title={'Date posted'} data={datePostedFilter} />
                        </Stack>
                    </Grid>
                </Box>
            </Box>
        </Box>

    )
}

export default JobsPage;