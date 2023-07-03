import React, { useState, useEffect } from 'react';
import { Box, Button, CardContent, Card, Typography, Stack, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DeleteCompanyButton, PostedJob, TopCompanies } from '../../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiperCustom.css';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import UpdateCompanyButton from '../../components/updateCompanyButton/UpdateCompanyButton';

function CompanyDetailsPage() {
    let { companyId } = useParams();
    const isCompany = true
    const [company, setCompany] = useState();

    const getData = ()=>{
        fetch(`http://localhost:3001/api/company/${companyId}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCompany(data)
            });
    }
    
    useEffect(() => {
     getData()

    }, [companyId])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', py: 8, mx: 4, alignItems: 'center', backgroundColor: '#e9e8eb' }}>

                <Typography variant='h3' >Company Details</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 4, flexWrap: 'wrap' }}>
                    <Grid container spacing={2} item xs={12} md={9} lg={9} sx={{ height: 'fit-content', mb: 3 }}>
                        {company ?
                            <Card
                                orientation="horizontal"
                                sx={{
                                    width: '100%',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <CardContent>
                                    <Stack direction={{ md: 'row', xs: 'column' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ width: '100%', alignItems: 'center' }} >
                                        <img
                                            src={require("../../components/companyCard/company.jpeg")}
                                            alt=""
                                            width={'50%'}
                                        />
                                        <Box>
                                            <Typography variant='h4' sx={{ fontWeight: 700 }}>
                                                {company.name}
                                            </Typography>
                                            <Typography variant='h6'>
                                                {company.location.city}, {company.location.country}
                                            </Typography>
                                        </Box>

                                    </Stack>
                                    <Typography variant='h5' sx={{ fontWeight: 700, color: '#f2572c', mt: 2 }}>Description</Typography>
                                    <Typography variant='h6' sx={{ mt: 1 }}>
                                        {company.description}
                                    </Typography>

                                    <Typography variant='h5' sx={{ fontWeight: 700, color: '#f2572c', mt: 2 }}>Numbers of employers</Typography>
                                    <Typography variant='h6' sx={{ mt: 1 }}>
                                        {company.employersNum}
                                    </Typography>

                                    <Typography variant='h5' sx={{ fontWeight: 700, color: '#f2572c', mt: 2 }}>Jobs posted</Typography>
                                    <Typography variant='h6' sx={{ mt: 1 }}>

                                        <Swiper
                                            spaceBetween={50}
                                            onSlideChange={() => console.log('slide change')}
                                            onSwiper={(swiper) => console.log(swiper)}
                                            navigation
                                            modules={[Navigation]}
                                            breakpoints={{
                                                0: {
                                                    width: 330,
                                                    slidesPerView: 1,
                                                },
                                                640: {
                                                    width: 600,
                                                    slidesPerView: 2,
                                                },
                                                // when window width is >= 768px
                                                800: {
                                                    width: 730,
                                                    slidesPerView: 3,
                                                },
                                                1200: {
                                                    width: 1180,
                                                    slidesPerView: 3,
                                                }
                                            }}
                                            className='swiper-container'
                                        >
                                            {company.jobsPosted.map((job) => {
                                                return <SwiperSlide><PostedJob /></SwiperSlide>
                                            })}
                                        </Swiper>

                                    </Typography>

                                    {isCompany ?
                                        <>
                                            <DeleteCompanyButton  company={company}/>
                                            <UpdateCompanyButton company={company} getData={getData}/>
                                        </>
                                        : null}
                                </CardContent>
                            </Card>
                            : <Typography variant='h5' >No Data</Typography>}
                    </Grid>

                    <Grid container item xs={12} md={2} lg={2} sx={{ height: 'fit-content' }}>
                        <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                            <Paper sx={{ p: 3, minWidth: 150 }}>
                                <Typography variant='h5' >Active companies</Typography>
                            </Paper>
                            <TopCompanies />
                        </Stack>
                    </Grid>
                </Box>

            </Box>
        </Box >
    )
}

export default CompanyDetailsPage;