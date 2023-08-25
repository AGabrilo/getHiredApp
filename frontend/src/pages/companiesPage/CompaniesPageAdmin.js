import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { UserTable } from '../../components';



function CompaniesPageAdmin() {
    const [rows, setRows] = useState([])

    const getData = () => {
        fetch('http://localhost:3001/api/company', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setRows(data.map((el, i) => {
                    return {
                        id: i,
                        _id: el._id,
                        name: el.name,
                        employersNum: el.employersNum,
                        email: el.email,
                    }
                }))
            });
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                <Typography variant='h4' sx={{ mb: 4 }}>Companies</Typography>
                {rows.length ? <UserTable rows={rows} getData={getData} type='company' /> : null}

            </Box>
        </Box>

    )
}

export default CompaniesPageAdmin;