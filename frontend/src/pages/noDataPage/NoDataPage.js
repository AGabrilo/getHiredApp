import { Box, Typography } from '@mui/material';
import React from 'react';

function NoDataPage() {

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', height: '100vh' }}>
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h4'>No data</Typography>
            </Box>
        </Box>
    )
}

export default NoDataPage;