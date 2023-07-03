import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Card, Typography, Stack, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import { useNavigate } from 'react-router-dom';

function DeleteCompanyButton(props) {
    const { company} = props;
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleDeleteButton = (companyId) => {

        fetch(`http://localhost:3001/api/company/${companyId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // body: JSON.stringify({ role: localStorage.getItem('role') })
        })
            .then((res) => {
                res.json()
                // getData()
                navigate('/companies')
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    return (
        <>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpen(true)}>
                Delete
            </Button>
            <DeleteDialog open={open} setOpen={setOpen} id={company._id} handleDeleteButton={handleDeleteButton} component='company' />
        </>

    )
}

export default DeleteCompanyButton;
