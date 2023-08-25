import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Card, Typography, Stack, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import CompanyDialogForm from '../companyDialogForm/CompanyDialogForm';

function UpdateCompanyButton(props) {
    const { company, getData } = props;
    const [open, setOpen] = useState(false)

    const handleUpdate = (companyId, updatedCompanyObject) => {

        fetch(`http://localhost:3001/api/company/${companyId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCompanyObject),
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

    return (
        <>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpen(true)}>
                Update
            </Button>
            <CompanyDialogForm open={open} setOpen={setOpen} company={company} handleUpdate={handleUpdate} />
        </>

    )
}

export default UpdateCompanyButton;
