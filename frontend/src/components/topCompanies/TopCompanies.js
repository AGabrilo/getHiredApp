import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Paper } from '@mui/material';
import CompanyCard from '../companyCard/CompanyCard';

function TopCompanies() {
    const [companies, setCompanies] = useState();
    const [comp, setComp] = useState();
    useEffect(() => {
        fetch('http://localhost:3001/api/company', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCompanies(data.sort((a, b) => a.jobsPosted.length < b.jobsPosted.length ? 1 : -1).slice(0, 3))
                setComp(data)
            });

    }, [])
    return (
        <>
            {companies ? companies.map((company, i) => {
                return <CompanyCard company={company} key={i} top={true} />
            }) : <Paper sx={{p:3}}> <Typography variant='h6'>No Companies</Typography></Paper>}

        </>
    )
}

export default TopCompanies;
