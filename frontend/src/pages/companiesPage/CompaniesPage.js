import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { CompanyCard, SearchComponent } from '../../components';

function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [filteredData, setFilteredData] = useState([])

    const getData = () => {
        fetch('http://localhost:3001/api/company', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCompanies(data)
                setFilteredData(data)
            });
    }

    const getFilteredData = () => {
        if (!name && !location) {
            setFilteredData(companies);
        } else if (name && !location) {
            setFilteredData(companies.filter((d) => d.name.toLowerCase().includes(name)));
        }
        else if (!name && location) {
            setFilteredData(companies.filter((d) => d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)));
        }
        else {
            setFilteredData(companies.filter((d) => (d.location.city.toLowerCase().includes(location) || d.location.country.toLowerCase().includes(location)) && d.name.toLowerCase().includes(name)));
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getFilteredData()
    }, [name, location])

    const handleDeleteButton = (companyId) => {

        fetch(`http://localhost:3001/api/company/${companyId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // body: JSON.stringify({ role: localStorage.getItem('role') })
        })
            .then((res) => {
                res.json()
                getData()
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    const handleUpdate = (companyId, updatedCompanyObject) => {

        fetch(`http://localhost:3001/api/company/${companyId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCompanyObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((data) => {
                getData()
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>
                <SearchComponent setLocation={setLocation} setName={setName} component='Company' />

                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'no-wrap' }}>
                    <Grid container spacing={2} item xs={12} md={12} lg={12} >
                        {filteredData.length ? filteredData.map((company, i) => {
                            return <Grid item xs={12} md={4} lg={4} key={i}>
                                <CompanyCard company={company} handleDeleteButton={handleDeleteButton} handleUpdate={handleUpdate} />
                            </Grid>
                        }) : null}
                    </Grid>

                </Box>
            </Box>
        </Box>

    )
}

export default CompaniesPage;