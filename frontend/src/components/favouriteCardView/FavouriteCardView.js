import React, { useState, useEffect, useCallback } from 'react';
import { Stack } from '@mui/material';
import JobCard from '../jobCard/JobCard';

function FavouriteCardView(props) {
    const { favourite } = props;
    const [jobs, setJobs] = useState([])

    const getData = useCallback(() => {
        fetch(`http://localhost:3001/api/job`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setJobs(data.filter((job) => favourite.filter((fav) => fav.jobId === job._id).length === 1))
            });
    }, [favourite])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Stack direction={'column'} spacing={3}>
            {jobs.length ? jobs.map((job, i) => {
                return <JobCard job={job} fav key={i} />
            }) : null}
        </Stack>
    )
}

export default FavouriteCardView;