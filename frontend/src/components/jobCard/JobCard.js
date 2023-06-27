import React from 'react';
import { Box, Avatar, Typography, CardContent, Button, Card, CardActions, IconButton, Grid, Chip } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { palette } from '../../utils/palette'

const skills = ['Javascript', 'C#', 'Python', 'Nodejs', 'MongoDB']

function JobCard(props) {
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
                    30.6.2023
                </Typography>
            </Box>
            <CardContent>
                <Typography variant="h5">
                    NYC Coders
                </Typography>
                <Grid container spacing={2}>
                    {skills.slice(0, 3).map((skill, i) => {
                        return <Grid item key={i} >
                            <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: palette[i] }} />
                        </Grid>
                    })}
                </Grid>
                <Typography level="body2">
                    We are a community of developers prepping for coding interviews,
                    participate, chat with others and get better at interviewing.
                </Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
                <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                    <FavoriteBorder />
                </IconButton>
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }}>
                    View
                </Button>
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }}>
                    Apply
                </Button>
            </CardActions>
        </Card>

    )
}

export default JobCard;
