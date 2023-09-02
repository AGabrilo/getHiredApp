import { Box } from '@mui/material';
import React from 'react';
import ProfilePageUser from './ProfilePageUser';
import ProfilePageCompany from './ProfilePageCompany';

function ProfilePage() {
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    return (
        <Box sx={{ backgroundColor: '#e9e8eb', height: '100vh' }}>
            {role === 'user' || role === 'admin' ?
                <ProfilePageUser id={id} role={role} />
                : <ProfilePageCompany id={id} />
            }
        </Box>
    )
}

export default ProfilePage;