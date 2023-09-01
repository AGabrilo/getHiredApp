import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import { useNavigate } from "react-router-dom";
import UserForm from '../userForm/UserForm';
import CompanyDialogForm from '../companyDialogForm/CompanyDialogForm';

function UserTable(props) {
    const { rows, getData, type } = props;
    const [open, setOpen] = useState(false)
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [user, setUser] = useState()
    const [company, setCompany] = useState()
    const navigate = useNavigate();

    const handleDeleteButton = (id) => {
        fetch(`http://localhost:3001/api/${type === 'users' ? 'user' : 'company'}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(() => getData())
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleUpdate = (userId, updatedUserObject) => {
        fetch(`http://localhost:3001/api/${type === 'users' ? 'user' : 'company'}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUserObject),
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

    const columns = type === 'users' ? [
        {
            field: 'picture', headerName: '', flex: 1, minWidth: 70,
            renderCell: (row) =>
                <Avatar sx={{ ml: 2 }} src={row.row.picture ? `http://localhost:3001${row.row.picture}` : ''} />
        },
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
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 160
        },
        {
            field: "action",
            headerName: "",
            flex: 1,
            minWidth: 230,
            renderCell: (row) =>
                <Stack direction={'row'} spacing={2}>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setUser(row.row); setOpenUpdateForm(true) }}>
                        Update {console.log('row', row)}
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setUser(row.row); setOpen(true) }}>Delete</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => navigate(`/${type}/${row.row._id}`)}>View</Button>
                </Stack>
            ,
        },
    ]
        : [
            {
                field: 'picture', headerName: '', flex: 1, minWidth: 70,
                renderCell: (row) =>
                    <Avatar sx={{ ml: 2 }} src={row.row.picture ? `http://localhost:3001${row.row.picture}` : ''} />
            },
            {
                field: 'name',
                headerName: 'Company name',
                flex: 1,
                minWidth: 110
            },
            {
                field: 'employersNum',
                headerName: 'Number of employers',
                flex: 1,
                minWidth: 110
            },
            {
                field: 'email',
                headerName: 'Email',
                flex: 1,
                minWidth: 160
            },
            {
                field: "action",
                headerName: "",
                flex: 1,
                minWidth: 230,
                renderCell: (row) =>
                    <Stack direction={'row'} spacing={2}>
                        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setCompany(row.row); setOpenUpdateForm(true) }}>
                            Update {console.log('row', row)}
                        </Button>
                        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => { setCompany(row.row); setOpen(true) }}>Delete</Button>
                        <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => navigate(`/${type}/${row.row._id}`)}>View</Button>
                    </Stack>
            },
        ];

    return (
        <Box sx={{ height: 'fit-content', p: 8, backgroundColor: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>Table</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableRowSelectionOnClick
                sx={{ width: '100%' }}
            />

            {user ? <>
                <DeleteDialog open={open} setOpen={setOpen} id={user._id} handleDeleteButton={handleDeleteButton} component='user' />
                <UserForm open={openUpdateForm} setOpen={setOpenUpdateForm} user={user} handleUpdate={handleUpdate} />
            </> : company ? <>
                <DeleteDialog open={open} setOpen={setOpen} id={company._id} handleDeleteButton={handleDeleteButton} component='company' />
                <CompanyDialogForm open={openUpdateForm} setOpen={setOpenUpdateForm} company={company} handleUpdate={handleUpdate} /></> : null}
        </Box>
    );
}

export default UserTable;