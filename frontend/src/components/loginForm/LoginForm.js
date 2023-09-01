import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { Box, Button, CardHeader, TextField, Card, Autocomplete, CardActions, CardContent, Typography } from '@mui/material';

function LoginForm() {
    const navigate = useNavigate();
    const initialValues = { email: '', password: '', type: 'user' }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('Values on submit:', values)
            handleLogin(values.email, values.password, values.type)
        }
    })

    const handleLogin = (email, password, type) => {
        console.log(email, password, type)
        fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password, type }),
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.data.user.role);
                    localStorage.setItem("id", data.data.user._id);

                    if (data.data.user.firstName) localStorage.setItem("name", data.data.user.firstName);
                    else localStorage.setItem("name", data.data.user.name);

                    if (data.data.user.role === 'admin') navigate('/studentsTable')
                    else navigate("/jobs")

                } else {
                    console.log("Authentication error");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <Card sx={{ minWidth: 175, p: 5, backgroundColor: '#fafafa' }}>
            <CardHeader
                title='GetHired Sign in'
            />
            <CardContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Autocomplete
                        size='small'
                        name='type'
                        defaultValue={formik.values['type']}
                        value={formik.values['type']}
                        onChange={(e, value) => formik.setFieldValue("type", value)}
                        options={['user', 'company', 'admin']}
                        renderInput={(params) => (
                            <TextField {...params} label={'Login as'} />
                        )}
                        sx={{ mb: 2 }}
                    />
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
                    <Typography>Don't have an account? <Button onClick={() => navigate("/signup")}>Sign up</Button></Typography>

                    <CardActions>
                        <Button onClick={formik.handleReset} variant='contained' sx={{ mr: 2, backgroundColor: '#f2572c', color: '#fafafa' }}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='contained' sx={{ backgroundColor: '#f2572c', color: '#fafafa' }}> Log in</Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    )
}

export default LoginForm;
