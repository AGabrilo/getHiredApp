import React from 'react';
import { Box, Avatar, Typography, CardContent, Button, Card, CardActions, IconButton, Grid, Chip } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { palette } from '../../utils/palette'
import { useNavigate } from 'react-router-dom';


function JobCard(props) {
    const { job } = props;
    const shortedSkills = job.skills.length > 3 ? job.skills.slice(0, 3) : job.skills
    const shortedDescription = job.description.length > 200 ? job.description.slice(0, 200) + '...' : job.description;
    const navigate = useNavigate();
    const isCompany = false;

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                // to make the card resizable
                overflow: 'auto',
                resize: 'horizontal',
                borderRadius: 2.5
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Avatar src="../../../public/logo192.png" sx={{ width: 56, height: 56 }} />
                <Typography variant="h6">
                    {job.datePosted}
                </Typography>
            </Box>
            <CardContent>
                <Typography variant="h5">
                    {job.jobTitle}
                </Typography>
                <Typography variant="body1">
                    {job.companyId}
                </Typography>
                <Grid container spacing={2}>
                    {shortedSkills.map((skill, i) => {
                        return <Grid item key={i} >
                            <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: palette[i] }} />
                        </Grid>
                    })}
                </Grid>
                <Typography level="body2">
                    {shortedDescription}
                </Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
                <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                    <FavoriteBorder />
                </IconButton>
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { navigate(`/jobs/${job._id}`) }}>
                    View
                </Button>
                {isCompany ? null :
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }}>
                        Apply
                    </Button>}

            </CardActions>
        </Card>

    )
}

export default JobCard;
