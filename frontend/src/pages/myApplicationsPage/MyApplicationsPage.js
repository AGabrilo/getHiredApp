import React from 'react';
import { Box, Grid, Chip, Typography } from '@mui/material';
import {  ApplicationTable } from '../../components';

function MyApplicationsPage() {

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                <Typography variant='h4' sx={{mb:4}}>My applications</Typography>
                <Grid container direction={'row'} spacing={1} sx={{mb:4}}>
                    <Grid item>
                        <Typography variant='h6'>12 applications</Typography>
                    </Grid>
                    <Grid item>
                        <Chip label="All" variant="outlined" />
                    </Grid>

                    <Grid item>
                        <Chip label="Pending" variant="outlined" />
                    </Grid>

                    <Grid item>
                        <Chip label="On hold" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <Chip label="Candidate" variant="outlined" />
                    </Grid>



                </Grid>
                <ApplicationTable />
            </Box>
        </Box>

    )
}

export default MyApplicationsPage;