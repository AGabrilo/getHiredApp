import React, { useState } from 'react';
import { Button } from '@mui/material';
import JobDialogForm from '../jobDialogForm/JobDialogForm';

function UpdateJobButton(props) {
    const { job, getData } = props;
    const [open, setOpen] = useState(false)

    const handleUpdate = (updatedJobObject) => {
console.log('handle updateeee', updatedJobObject)
        fetch(`http://localhost:3001/api/job/${updatedJobObject._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedJobObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(() => getData())
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <>
            <Button variant="contained" sx={{ backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpen(true)}>
                Update
            </Button>
            <JobDialogForm open={open} setOpen={setOpen} job={job} handleSubmit={handleUpdate} />
        </>

    )
}

export default UpdateJobButton;
