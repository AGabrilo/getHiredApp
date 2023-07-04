import React, {useEffect, useState} from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { JobFilters, JobCard, SearchComponent } from '../../components';
import { useSelector } from 'react-redux';
import { selectJobTypesConf, selectSkillsConf, selectWorkLocationsConf } from '../../redux/configurationSlice';

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [filteredData, setFilteredData] = useState([])
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredWorkLocation, setFilteredWorkLocation] = useState([]);
    const [filteredJobType, setFilteredJobType] = useState([]);
    const jobTypes = useSelector(selectJobTypesConf)
    const skills = useSelector(selectSkillsConf)
    const workLocations = useSelector(selectWorkLocationsConf)

    console.log('JOBBB TYPE', filteredJobType)

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

    const getSearchedData = () => {
        if (!name && !location) {
            setFilteredData(jobs);
        } else if (name && !location) {
            setFilteredData(jobs.filter((d) => d.jobTitle.toLowerCase().includes(name)));
        }
        else if (!name && location) {
            setFilteredData(jobs.filter((d) => d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)));
        }
        else {
            setFilteredData(jobs.filter((d) => (d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)) && d.jobTitle.toLowerCase().includes(name)));
        }
    }

    const getFilteredData = () =>{

    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getSearchedData()
    }, [name, location])

    useEffect(() => {
        getFilteredData()
    }, [filteredJobType, filteredSkills, filteredWorkLocation])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>
                <SearchComponent setLocation={setLocation} setName={setName} component='Job' />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'no-wrap' }}>
                    <Grid container spacing={2} item xs={12} md={9} lg={9} >
                        {filteredData.map((job, i)=>{
                            return <Grid item md={4} lg={4} key={i}>
                            <JobCard job={job}/>
                        </Grid>
                        })}
                        
                        
                    </Grid>

                    <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        {jobTypes && skills && workLocations ?<Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                            <JobFilters title={'Job type'} data={jobTypes.map((el)=>el.key)} setFilter={setFilteredJobType} filter={filteredJobType} />
                            <JobFilters title={'Skills'} data={skills.map((el)=>el.key)} setFilter={setFilteredSkills}/>
                            <JobFilters title={'Work location'} data={workLocations.map((el)=>el.key)} setFilter={setFilteredWorkLocation}/>
                        </Stack> : null}
                        
                    </Grid>
                </Box>
            </Box>
        </Box>

    )
}

export default JobsPage;