import React from 'react';
import { Box, Avatar, Typography, Divider, Stack, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ExperienceItem(props) {
    const {experience} = props;

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar sx={{ width: 56, height: 56 }}>{experience.companyName.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item>
                        <Stack>
                            <Typography variant='h5'>{experience.jobTitle}</Typography>
                            <Typography variant='h6'>{experience.companyName}, {experience.location.city}</Typography>
                            <Typography variant='body1'>{experience.startDate} - {experience.endDate}</Typography>
                            <Typography variant='body1'>{experience.description}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Avatar><EditIcon /></Avatar>
            </Box>
            <Divider />
        </>

    )
}

export default ExperienceItem;
