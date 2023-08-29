import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { JobFilters, JobCard, SearchComponent } from '../../components';
import { useSelector } from 'react-redux';
import { selectJobsConf } from '../../redux/jobsSlice';
import { selectJobTypesConf, selectSkillsConf, selectWorkLocationsConf } from '../../redux/configurationSlice';

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [filteredData, setFilteredData] = useState(useSelector(selectJobsConf))
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredWorkLocation, setFilteredWorkLocation] = useState([]);
    const [filteredJobType, setFilteredJobType] = useState([]);
    const jobTypes = useSelector(selectJobTypesConf)
    const skills = useSelector(selectSkillsConf)
    const workLocations = useSelector(selectWorkLocationsConf)
    const allJobs = useSelector(selectJobsConf)
    const noDataWidth = window.innerWidth - 300
    const queryParams = new URLSearchParams()

    const getData = () => {
        fetch(`http://localhost:3001/api/job?` + queryParams.toString(), {
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
    console.log(allJobs)
    const getSearchedData = () => {
        console.log(location, name)
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
    }

    const getFilteredData = () => {
        if (filteredJobType.length) {
            for (let jobType of filteredJobType) {
                queryParams.append('jobType', jobType)
            }
        } else {
            queryParams.delete("jobType")
        }
        if (filteredSkills.length) {
            for (let skill of filteredSkills) {
                queryParams.append('skill', skill)
            }
        } else {
            queryParams.delete("skill")
        }
        if (filteredWorkLocation.length) {
            for (let workLocation of filteredWorkLocation) {
                queryParams.append('workLocation', workLocation)
            }
        } else {
            queryParams.delete("workLocation")
        }
        getData()
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

    const handleApplyButton = (formData) => {
        fetch(`http://localhost:3001/api/application`, {
            method: 'POST',
            body: formData
        })
            .then((res) => { res.json(); console.log('done') })
            .catch((err) => {
                console.log(err.message);
            });

    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>
                <SearchComponent setLocation={setLocation} setName={setName} component='Job' />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'no-wrap' }}>
                    <Grid container spacing={2} xs={12} md={9} lg={9} sx={{ height: 'fit-content', width: '100%' }}>
                        {filteredData.length ?
                            filteredData.map((job, i) => {
                                return <Grid container item sm={12} md={6} lg={6} xl={4} key={i}>
                                    <JobCard job={job} handleApplyButton={handleApplyButton} />
                                </Grid>
                            })
                            : <Grid item sm={12} md={12} lg={12} xl={12} key={'No data'} sx={{ width: noDataWidth, }}>
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant='h5'> No data</Typography>
                                </Box>

                            </Grid>
                        }

                    </Grid>

                    <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        {jobTypes && skills && workLocations ? <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                            <JobFilters title={'Job type'} data={jobTypes.map((el) => el.key)} setFilter={setFilteredJobType} filter={filteredJobType} />
                            <JobFilters title={'Skills'} data={skills.map((el) => el.key)} setFilter={setFilteredSkills} filter={filteredSkills} />
                            <JobFilters title={'Work location'} data={workLocations.map((el) => el.key)} setFilter={setFilteredWorkLocation} filter={filteredWorkLocation} />
                        </Stack> : null}

                    </Grid>
                </Box>
            </Box>
        </Box>

    )
}

export default JobsPage;