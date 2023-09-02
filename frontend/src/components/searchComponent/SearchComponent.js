import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

function SearchComponent(props) {
    const { setName, setLocation, component } = props
    const [searchedName, setSearchedName] = useState();
    const [searchedLocation, setSearchedLocation] = useState();

    return (
        <Box sx={{ width: '100%',  p: 4, backgroundColor: 'white', borderRadius: 2.5 }}>
            <Typography variant='h4' sx={{ mb: 2, fontWeight: 700, color: '#f2572c' }}>Search {component}</Typography>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: '100%' }}
            >
                <TextField label={`${component} title`} variant="outlined" fullWidth sx={{ backgroundColor: '#e9e8eb' }} onInput={(e) => setSearchedName(e.target.value)} />

                <TextField label={`${component} location`} variant="outlined" fullWidth sx={{ backgroundColor: '#e9e8eb' }} onInput={(e) => setSearchedLocation(e.target.value)} />

                <Button variant='contained' sx={{ fontSize: '18px', backgroundColor: '#f2572c', minWidth: 200 }} onClick={() => { setName(searchedName && searchedName.toLowerCase()); setLocation(searchedLocation && searchedLocation.toLowerCase()) }}>Search</Button>

                <Button variant='contained' fullWidth sx={{ fontSize: '18px', backgroundColor: '#f2572c', flexGrow: 1, display: { xs: 'block', md: 'none' } }}>Filters</Button>
            </Stack>
        </Box>
    )
}

export default SearchComponent;