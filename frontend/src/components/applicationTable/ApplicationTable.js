import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography, IconButton } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';


function ApplicationTable(props) {
  const { applications, users, jobs, getData, setApplications } = props;
  const [rows, setRows] = useState(applications.map((appl, i) => {

    return {
      id: i,
      _id: appl._id,
      firstName: users.filter((user) => user._id === appl.userId)[0].firstName,
      lastName: users.filter((user) => user._id === appl.userId)[0].lastName,
      jobTitle: jobs.filter((job) => job._id === appl.jobId)[0].jobTitle,
      jobType: jobs.filter((job) => job._id === appl.jobId)[0].jobType,
      status: appl.status
    }
  }))

  console.log('rowsss', rows)

  const handleDeleteButton = (id) => {
    console.log('iddd', id)
    fetch(`http://localhost:3001/api/application/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      // body: JSON.stringify({ role: localStorage.getItem('role') })
    })
      .then((res) => {
        res.json()
        setApplications([])
        getData()
      })
      .catch((err) => {
        console.log(err.message);
      });

  }
  console.log('Applicationssssss', applications)

  useEffect(() => {
    setRows(applications.map((appl, i) => {

      return {
        id: i,
        _id: appl._id,
        firstName: users.filter((user) => user._id === appl.userId)[0].firstName,
        lastName: users.filter((user) => user._id === appl.userId)[0].lastName,
        jobTitle: jobs.filter((job) => job._id === appl.jobId)[0].jobTitle,
        jobType: jobs.filter((job) => job._id === appl.jobId)[0].jobType,
        status: appl.status
      }
    }))
  }, [applications])


  const handleUpdate = (applicationId, updatedStatus) => {
    fetch(`http://localhost:3001/api/application/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: updatedStatus }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications(data)
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
      field: 'jobTitle',
      headerName: 'Job Title',
      flex: 1,
      minWidth: 160
    },
    {
      field: 'jobType',
      headerName: 'Job type',
      flex: 1,
      minWidth: 110
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 110
    },
    {
      field: 'resume',
      headerName: 'Resume',
      flex: 1,
      width: 50,
      renderCell: (row) => <Button variant='contained' sx={{ backgroundColor: '#f2572c' }}>Download</Button>
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 200,
      renderCell: (row) =>
        <Stack direction={'row'} spacing={2}>
          <IconButton onClick={() => handleUpdate(row.row._id, 'Candidate')}>
            <DoneOutlineIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdate(row.row._id, 'Rejected')}>
            <ClearIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdate(row.row._id, 'Rejected')}>
            <InfoIcon />
          </IconButton>
          {/* <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleUpdate(row.row._id, 'Rejected')}>
            Rejected
          </Button> */}
          {/* <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleUpdate(row.row._id, 'Candidate')}>
            Candidate
          </Button> */}
          {/* <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleDeleteButton(row.row._id)}>Delete</Button> */}
        </Stack>
      ,
    },
  ];


  return (
    <Box sx={{ height: 'fit-content', p: 8, backgroundColor: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <Typography variant='h5' sx={{ mb: 3 }}>Application table</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        sx={{ width: '100%' }}
      />
    </Box>
  );
}

export default ApplicationTable;