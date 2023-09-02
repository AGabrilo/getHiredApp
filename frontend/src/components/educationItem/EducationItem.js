import React from 'react';
import { Box, Avatar, Typography, Divider, Stack, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dateFormat from 'dateformat';

function EducationItem(props) {
    const { education, getData, userData, i, details } = props;
    const newArray = userData.education

    const handleUpdate = (id) => {
        fetch(`http://localhost:3001/api/user/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ education: newArray }),
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
                            <Typography variant='body1'>{dateFormat(education.startDate, "mmmm dS, yyyy")} - {dateFormat(education.endDate, "mmmm dS, yyyy")}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                {details ?
                    null
                    : <IconButton onClick={() => handleUpdate(userData._id, { education: newArray.splice(i, 1) })}><DeleteIcon /></IconButton>}
            </Box>
            <Divider />
        </>
    )
}

export default EducationItem;