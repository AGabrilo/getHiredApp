import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Paper, Stack } from '@mui/material';
import FavouriteCard from '../favouriteCard/FavouriteCard';
import JobCard from '../jobCard/JobCard';

function FavouriteCardView(props) {
    const { favourite } = props;
    const [jobs, setJobs] = useState([])

    const getData = () => {
        fetch(`http://localhost:3001/api/job`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJobs(data.filter((job)=>favourite.filter((fav)=>fav.jobId===job._id).length===1))
            });
    }
console.log('jobsss',jobs)
    useEffect(() => {
        getData()

    }, [])


    return (
        <Stack direction={'column'} spacing={3}>
            {jobs.length? jobs.map((job, i)=>{
                return <JobCard job={job}/>
            }) :null}
        </Stack>
    )
}

export default FavouriteCardView;
