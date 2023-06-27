import React from 'react';
import { Box, Grid } from '@mui/material';
import { CompanyCard, CompanySearch } from '../../components';

function CompaniesPage() {

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>
                <CompanySearch />

                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'no-wrap' }}>
                    <Grid container spacing={2} item xs={12} md={12} lg={12} >
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <CompanyCard />
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Box>

    )
}

export default CompaniesPage;