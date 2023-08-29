import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, CardContent, Button, Card, CardActions, IconButton, Grid, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import ApplyForm from '../applyForm/ApplyForm';


function JobCard(props) {
    const { job, handleApplyButton, fav } = props;
    const shortedSkills = job.skills.length > 3 ? job.skills.slice(0, 3) : job.skills
    const shortedDescription = job.description.length > 200 ? fav && job.description.length > 300  ? job.description.slice(0, 300) + '...': job.description.slice(0, 200) + '...' : job.description;
    const navigate = useNavigate();
    const [favourite, setFavourite] = useState([])
    const [company, setCompany] = useState({})
    const [open, setOpen] = useState(false);
    const isCompany = localStorage.getItem('role') === 'company'? true :false;
    const screenSize = window.innerWidth <=900 ? 'small' : 'large'
    const id = localStorage.getItem('id')

    const getData = () => {
        fetch('http://localhost:3001/api/favourite/649e9c19f92c6b347d394b33', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('dataa', data)
                setFavourite(data)
            });
            
                fetch(`http://localhost:3001/api/company/${job.companyId}`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setCompany(data)
                    });
        
    }

    const checkIfFavourite = (jobId) => {
        let check = favourite.filter((el) => el.jobId === jobId)
        console.log(check)
        if (check.length) return check
        else return false
    }

    const handleFavouriteButton = (jobId) =>{
        let check  = checkIfFavourite(jobId)
        if(checkIfFavourite(jobId)){
            fetch(`http://localhost:3001/api/favourite/${check[0]._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
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
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                overflow: 'auto',
                resize: 'horizontal',
                borderRadius: 2.5,
                height: screenSize === 'small' ? 515 : 395,
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
                    {dateFormat(job.datePosted, "mmmm dS, yyyy")}
                </Typography>
            </Box>
            <CardContent sx= {{height:screenSize === 'small' ? 340 : 230}}>
                <Typography variant="h5">
                    {job.jobTitle}
                </Typography>
                <Typography variant="body1">
                    {company.name ? company.name : ''}
                </Typography>
                <Grid container spacing={2}>
                    {shortedSkills.map((skill, i) => {
                        return <Grid item key={i} >
                            <Chip label={skill} variant="outlined" size='medium' sx={{ backgroundColor: '#ccccff' }} />
                        </Grid>
                    })}
                </Grid>
                <Typography level="body2">
                    {shortedDescription}
                </Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
                {isCompany ? 
                null:
                <IconButton variant="outlined" color={checkIfFavourite(job._id)?"error":"neutral"} sx={{ mr: 'auto' }} onClick={()=>handleFavouriteButton(job._id)}>
                    <FavoriteIcon />
                </IconButton> }
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { navigate(`/jobs/${job._id}`) }}>
                    View
                </Button>
                {isCompany && id === job.companyId? 
                <>
                <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={()=>setOpen(true)}>
                        Modify
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={()=>setOpen(true)}>
                        Delete
                    </Button>
                </> : null }
                
              {!isCompany ?
              <>
              <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={()=>setOpen(true)}>
                     Apply
                 </Button>
                 <ApplyForm open={open} setOpen={setOpen} id={job._id} handleApplyButton={handleApplyButton}/>
             </>
             : null}
               
                    
            </CardActions>
        </Card>

    )
}

export default JobCard;
