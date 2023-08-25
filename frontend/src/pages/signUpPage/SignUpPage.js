import React, { useState } from 'react';
import { Box, Autocomplete, Typography, TextField } from '@mui/material';
import { RegisterForm } from '../../components';

function LoginPage() {
    const [formType, setFormType] = useState('user')

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', backgroundColor: '#0d1a30', alignItems: 'center', px: 5 }}>
                <Typography variant='h3' sx={{ mt: 7, mb: 2, color: '#fafafa' }} align="center">GetHired Sign up</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', my: 7 }}>
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', my: 7 }}>
                            <Typography sx={{ mb: 2, mr:2, color: 'white' }}> Sign up as: </Typography>
                            <Autocomplete
                                size='small'
                                name='type'
                                defaultValue={formType}
                                value={formType}
                                onChange={(e, value) => setFormType(value)}
                                options={['user', 'company']}
                                renderInput={(params) => (
                                    <TextField {...params}/>
                                )}
                                sx={{ mb: 2, backgroundColor:'white', width:200 }} />
                        </Box>
                        
                   
                        <RegisterForm type={formType} />
                    </Box>

                </Box>
            </Box>
            <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className='test' fill="#fff" fillOpacity="1" d="M0,96L60,90.7C120,85,240,75,360,90.7C480,107,600,149,720,165.3C840,181,960,171,1080,138.7C1200,107,1320,53,1380,26.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </>

    )
}

export default LoginPage;