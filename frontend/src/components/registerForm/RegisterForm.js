import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { Box, Button, CardHeader, TextField, Card, CardActions, CardContent, Typography } from '@mui/material';

function RegisterForm(props) {
    const { type } = props
    const navigate = useNavigate();
    const initialValues = type === 'user' ? { firstName: '', lastName: '', password: '', repeatedPassword: '', type: 'user', email: '' } : { name: '', password: '', passwordRepeated: '', type: 'company', email: '' }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            values.type = type
            handleRegister(values)
        }
    })
    const handleRegister = (values) => {
        fetch("http://localhost:3001/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("User Registered!", data);
                navigate("/login")
            })
            .catch((err) => console.log(err));
    }

    return (
        <Card sx={{ minWidth: 175, maxWidth: 780, p: 5, backgroundColor: '#fafafa' }}>
            <CardHeader
                title='GetHired Sign up'
            />
            <CardContent>
                {type === 'user' ?
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            key='email'
                            type='text'
                            name='email'
                            label='Email'
                            value={formik.values['email']}
                            onChange={formik.handleChange}
                            placeholder='Enter your email'
                            error={Boolean(formik.errors['email'])}
                            helperText={formik.errors['email']}
                            margin='normal'
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                        <TextField
                            key='firstName'
                            type='text'
                            name='firstName'
                            label='First name'
                            value={formik.values['firstName']}
                            onChange={formik.handleChange}
                            placeholder='Enter your first name'
                            error={Boolean(formik.errors['firstName'])}
                            helperText={formik.errors['firstName']}
                            margin='normal'
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                        <TextField
                            key='lastName'
                            type='text'
                            name='lastName'
                            label='Last name'
                            value={formik.values['lastName']}
                            onChange={formik.handleChange}
                            placeholder='Enter your last name'
                            error={Boolean(formik.errors['lastName'])}
                            helperText={formik.errors['lastName']}
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
                        <TextField
                            key='repeatedPassword'
                            type='password'
                            name='repeatedPassword'
                            label='Repeat password'
                            value={formik.values['repeatedPassword']}
                            onChange={formik.handleChange}
                            placeholder='Enter your password again'
                            error={Boolean(formik.errors['repeatedPassword'])}
                            helperText={formik.errors['repeatedPassword']}
                            margin='normal'
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                        <Typography>Already have an account? <Button onClick={() => navigate("/login")}>Sign in</Button></Typography>
                        <CardActions>
                            <Button onClick={formik.handleReset} variant='contained' sx={{ mr: 2, backgroundColor: '#f2572c', color: '#fafafa' }}>
                                Cancel
                            </Button>
                            <Button disabled={Object.keys(formik.errors).length ? true : false} type='submit' variant='contained' sx={{ backgroundColor: '#f2572c', color: '#fafafa' }}> Sign up</Button>
                        </CardActions>
                    </Box>
                    :
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            key='email'
                            type='text'
                            name='email'
                            label='Email'
                            value={formik.values['email']}
                            onChange={formik.handleChange}
                            placeholder='Enter your email'
                            error={Boolean(formik.errors['email'])}
                            helperText={formik.errors['email']}
                            margin='normal'
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                        <TextField
                            key='name'
                            type='text'
                            name='name'
                            label='Company name'
                            value={formik.values['name']}
                            onChange={formik.handleChange}
                            placeholder='Enter your company name'
                            error={Boolean(formik.errors['name'])}
                            helperText={formik.errors['name']}
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
                        <TextField
                            key='repeatedPassword'
                            type='password'
                            name='repeatedPassword'
                            label='Repeat password'
                            value={formik.values['repeatedPassword']}
                            onChange={formik.handleChange}
                            placeholder='Enter your password again'
                            error={Boolean(formik.errors['repeatedPassword'])}
                            helperText={formik.errors['repeatedPassword']}
                            margin='normal'
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                        <Typography>Already have an account? <Button >Sign in</Button></Typography>
                        <CardActions>
                            <Button onClick={formik.handleReset} variant='contained' sx={{ mr: 2, backgroundColor: '#f2572c', color: '#fafafa' }}>
                                Cancel
                            </Button>
                            <Button disabled={Object.keys(formik.errors).length ? true : false} type='submit' variant='contained' sx={{ backgroundColor: '#f2572c', color: '#fafafa' }}> Sign up</Button>
                        </CardActions>
                    </Box>}

            </CardContent>
        </Card>
    )
}

export default RegisterForm;
