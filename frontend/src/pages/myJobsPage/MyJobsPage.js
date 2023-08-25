import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import { JobFilters, JobCard, SearchComponent, JobDialogForm } from '../../components';
import { useSelector } from 'react-redux';
import { selectJobsConf } from '../../redux/jobsSlice';

function MyJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const id = localStorage.getItem('id')
    const allJobs = useSelector(selectJobsConf).filter((el)=>el.companyId === '649e8ba0f92c6b347d394b15' )
    const [filteredData, setFilteredData] = useState(allJobs)
    const [open, setOpen] = useState(false);

    const handleAddJob= ()=>{

    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', minHeight:'100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', mb:3 }}>
                    <SearchComponent setLocation={setLocation} setName={setName} component='Job' />
                    <Button variant='contained' sx={{ mr: 2, backgroundColor: '#f2572c', color: '#fafafa' }} onClick={()=>setOpen(true)}>Add new job</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c', color: '#fafafa' }}>Show expired jobs</Button>
                </Box>

                <Grid container spacing={2} item xs={12} md={9} lg={9} >
                    {allJobs.map((job, i) => {
                        return <Grid item md={4} lg={4} key={i}>
                            <JobCard job={job} handleApplyButton />
                        </Grid>
                    })}
                </Grid>
            </Box>
            <JobDialogForm open={open} setOpen={setOpen} handleSubmit={handleAddJob} />
        </Box>

    )
}

export default MyJobsPage;