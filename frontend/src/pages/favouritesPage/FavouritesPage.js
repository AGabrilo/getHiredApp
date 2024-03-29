import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { FavouriteCardView } from '../../components';
function FavouritesPage() {
    const [favourite, setFavourite] = useState([])
    const id = localStorage.getItem('id')

    const getData = useCallback(() => {
        fetch(`http://localhost:3001/api/favourite/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setFavourite(data)
            });
    },[id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: 8, mx: 4, backgroundColor: '#e9e8eb' }}>
                <Typography variant='h4' sx={{ mb: 4 }}>Favourites</Typography>
               {favourite.length ?  <FavouriteCardView favourite={favourite} setFavourite={setFavourite} /> : null}
            </Box>
        </Box>
    )
}

export default FavouritesPage;