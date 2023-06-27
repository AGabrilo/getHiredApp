import React from 'react';
import { Box, Avatar, Typography, Divider, Stack, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EducationItem(props) {
    const { education } = props;
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar sx={{ width: 56, height: 56 }}>{education.schoolName.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item>
                        <Stack>
                            <Typography variant='h5'>{education.schoolName}</Typography>
                            <Typography variant='h6'>{education.degreeType}, {education.degreeName}</Typography>
                            <Typography variant='body1'>{education.startDate} - {education.endDate}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Avatar><EditIcon /></Avatar>
            </Box>
            <Divider />
        </>

    )
}

export default EducationItem;
