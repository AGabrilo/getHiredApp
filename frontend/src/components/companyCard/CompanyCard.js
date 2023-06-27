import React from 'react';
import { Box, Button, CardContent, Card, Typography, Stack } from '@mui/material';

function CompanyCard(props) {

    return (
        <Card
            orientation="horizontal"
            sx={{
                width: '100%',
                flexWrap: 'wrap'
            }}
        >
            <CardContent>
                <Stack direction={{ md: 'row', xs: 'column' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ width: '100%' }}>
                    <img
                        src={require("./company.jpeg")}
                        alt=""
                    />
                    <Box>
                        <Typography variant='h4'>
                            Ericsson
                        </Typography>
                        <Typography variant='h6'>
                            Split, Croatia
                        </Typography>
                    </Box>

                </Stack>
                <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>Description</Typography>
                <Typography variant='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>

                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c' }}>
                    View details
                </Button>
            </CardContent>
        </Card>
    )
}

export default CompanyCard;