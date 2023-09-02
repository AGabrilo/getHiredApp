import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import { useNavigate } from 'react-router-dom';

function DeleteJobButton(props) {
    const { job } = props;
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleDeleteButton = (jobId) => {
        fetch(`http://localhost:3001/api/job/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(() =>
                navigate('/jobs')
            )
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpen(true)}>
                Delete
            </Button>
            <DeleteDialog open={open} setOpen={setOpen} id={job._id} handleDeleteButton={handleDeleteButton} component='job' />
        </>
    )
}

export default DeleteJobButton;
