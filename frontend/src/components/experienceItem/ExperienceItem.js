import React from 'react';
import { Box, Avatar, Typography, Divider, Stack, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ExperienceItem(props) {
    const {experience, getData, userData,  i } = props;
    const newArray = userData.workExperience

    console.log(newArray)


    const handleUpdate = (id, updatedObject) => {
        
        fetch(`http://localhost:3001/api/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({workExperience:newArray}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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
                <IconButton onClick={()=>handleUpdate(userData._id,{workExperience: newArray.splice(i,1)})}><DeleteIcon /></IconButton>
            </Box>
            <Divider />
        </>

    )
}

export default ExperienceItem;
