import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, CardContent, Button, Card, CardActions, IconButton, Grid, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { palette } from '../../utils/palette'
import { useNavigate } from 'react-router-dom';


function JobCard(props) {
    const { job } = props;
    const shortedSkills = job.skills.length > 3 ? job.skills.slice(0, 3) : job.skills
    const shortedDescription = job.description.length > 200 ? job.description.slice(0, 200) + '...' : job.description;
    const navigate = useNavigate();
    const [favourite, setFavourite] = useState([])
    const isCompany = false;


    const getData = () => {
        fetch('http://localhost:3001/api/favourite/649e9c19f92c6b347d394b33', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFavourite(data)
            });
    }

    const checkIfFavourite = (jobId) => {
        let check = favourite.filter((el) => el.jobId === jobId)
        if (check.length) return check
        else return false
    }

    const handleFavouriteButton = (jobId) =>{
        let check  = checkIfFavourite(jobId)
        console.log(check)
        if(checkIfFavourite(jobId)){
            fetch(`http://localhost:3001/api/favourite/${check[0]._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                // body: JSON.stringify({ role: localStorage.getItem('role') })
            })
                .then((res) => {
                    res.json()
                    getData()
                })
                .catch((err) => {
                    console.log(err.message);
                });
    
        }
        else {
            fetch(`http://localhost:3001/api/favourite`, {
                method: 'POST',
                body: JSON.stringify({userId:'649e9c19f92c6b347d394b33', jobId:jobId}),
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
    }

    useEffect(() => {
        getData()
    }, [])

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
                <IconButton variant="outlined" color={checkIfFavourite(job._id)?"error":"neutral"} sx={{ mr: 'auto' }} onClick={()=>handleFavouriteButton(job._id)}>
                    <FavoriteIcon />
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
