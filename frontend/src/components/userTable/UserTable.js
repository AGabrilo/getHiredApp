import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import UserDialogForm from '../userDialogForm/UserDialogForm';



function  UserTable(props) {
    const { rows, getData } = props;
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] =useState(false);
    const [user, setUser] = useState()

    const handleDeleteButton = (id) => {
console.log('iddd',id)
        fetch(`http://localhost:3001/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // body: JSON.stringify({ role: localStorage.getItem('role') })
        })
            .then((res) => {
                res.json()
                getData()
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    const handleUpdate = (userId, updatedUserObject) => {

        fetch(`http://localhost:3001/api/user/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUserObject),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 60 },
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1,
            minWidth: 110
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1,
            minWidth: 110
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
            minWidth: 160
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 160
        },
        {
            field: "action",
            headerName:"",
            flex: 1,
            minWidth: 230,
            renderCell: (row) =>
                <Stack direction={'row'} spacing={2}>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setUser(row.row) ;setOpenForm(true)}}>
                        Update {console.log('row',row)}
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setUser(row.row) ;setOpen(true)}}>Delete</Button>
                </Stack>
            ,
        },
    ];


    return (
        <Box sx={{ height: 'fit-content', p: 8, backgroundColor: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>Users table</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableRowSelectionOnClick
                sx={{ width: '100%' }}
            />
            
          {user ?  <>
            <DeleteDialog open={open} setOpen={setOpen} id={user._id} handleDeleteButton={handleDeleteButton} component='user' />
            <UserDialogForm open={openForm} setOpen={setOpenForm} user={user} handleUpdate={handleUpdate} />
          </> : null }
        </Box>
    );
}

export default UserTable;