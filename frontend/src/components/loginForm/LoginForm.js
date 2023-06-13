import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, CardHeader, TextField, Card, CardActions, CardContent, Typography } from '@mui/material';

function LoginForm() {
    const initialValues = { username: '', password: '' }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
        }
    })

    return (
        <Card sx={{ minWidth: 175, p: 5, backgroundColor: '#fafafa' }}>
            <CardHeader
                title='GetHired Login'
            />
            <CardContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        key='username'
                        type='text'
                        name='username'
                        label='Username'
                        value={formik.values['username']}
                        onChange={formik.handleChange}
                        placeholder='Enter your username'
                        error={Boolean(formik.errors['username'])}
                        helperText={formik.errors['username']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <TextField
                        key='password'
                        type='password'
                        name='password'
                        label='Password'
                        value={formik.values['password']}
                        onChange={formik.handleChange}
                        placeholder='Enter your password'
                        error={Boolean(formik.errors['password'])}
                        helperText={formik.errors['password']}
                        margin='normal'
                        variant='standard'
                        size='small'
                        fullWidth
                    />
                    <Typography>Don't have an account? <Button >Sign up</Button></Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button onClick={formik.handleReset} variant='contained' sx={{ mr: 2, backgroundColor: '#3b44d4', color: '#fafafa' }}>
                    Cancel
                </Button>
                <Button disabled={Object.keys(formik.errors).length ? true : false} type='submit' variant='contained' sx={{ backgroundColor: '#3b44d4', color: '#fafafa' }}> Log in</Button>
            </CardActions>
        </Card>
    )
}

export default LoginForm;
