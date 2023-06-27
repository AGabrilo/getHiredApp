import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

function JobSearch(props) {

    return (
        <Box sx={{ width: '100%', mx: 5, p: 4, backgroundColor: 'white', borderRadius: 2.5 }}>
            <Typography variant='h4' sx={{ mb: 2, fontWeight: 700, color: '#f2572c' }}>Search job</Typography>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <TextField label="Job title" variant="outlined" fullWidth sx={{ backgroundColor: '#e9e8eb' }} />

                <TextField label="Job location" variant="outlined" fullWidth sx={{ backgroundColor: '#e9e8eb' }} />

                <Button variant='contained' sx={{ fontSize: '18px', backgroundColor: '#f2572c', minWidth: 200 }}>Search</Button>

                <Button variant='contained' fullWidth sx={{ fontSize: '18px', backgroundColor: '#f2572c', flexGrow: 1, display: { xs: 'block', md: 'none' } }}>Filters</Button>
            </Stack>
        </Box>
    )
}

export default JobSearch;
