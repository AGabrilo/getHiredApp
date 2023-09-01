import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography, IconButton, Avatar } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver'
import { useNavigate } from "react-router-dom";

function ApplicationTable(props) {
  const { applications, users, jobs, getData, setApplications } = props;
  const navigate = useNavigate();
  const [rows, setRows] = useState(applications.map((appl, i) => {
    return {
      id: i,
      _id: appl._id,
      firstName: users.filter((user) => user._id === appl.userId)[0].firstName,
      lastName: users.filter((user) => user._id === appl.userId)[0].lastName,
      picture: users.filter((user) => user._id === appl.userId)[0].picture,
      jobTitle: jobs.filter((job) => job._id === appl.jobId)[0].jobTitle,
      jobType: jobs.filter((job) => job._id === appl.jobId)[0].jobType,
      status: appl.status
    }
  }))
  const role = localStorage.getItem('role')

  console.log('rowsss', rows)

  const handleDeleteButton = (id) => {
    console.log('iddd', id)
    fetch(`http://localhost:3001/api/application/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
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
        picture: users.filter((user) => user._id === appl.userId)[0].picture,
        jobTitle: jobs.filter((job) => job._id === appl.jobId)[0].jobTitle,
        jobType: jobs.filter((job) => job._id === appl.jobId)[0].jobType,
        status: appl.status,
        resume: appl.resume,
        userId: appl.userId
      }
    }))
  }, [applications])


  const handleUpdate = (application, updatedStatus) => {
    fetch(`http://localhost:3001/api/application/${application._id}`, {
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
        console.log(application, 'iddddddddddd')
        sendNotification(application.userId, application.jobTitle, application.status)
        getData()

      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  const sendNotification = (userId, jobName, status) => {
    fetch(`http://localhost:3001/api/user/notification`, {
      method: 'POST',
      body: JSON.stringify({ status, userId, jobName }),
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

  const handleDownload = (rowData) => {
    console.log(rowData, 'resume')
    fetch(`http://localhost:3001/api/user/download/${rowData._id}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const blob = new Blob([data], { type: 'application/pdf' })
        saveAs(blob, `Resume_${rowData.firstName}_${rowData.lastName}.pdf`)
        console.log('done', data)
        getData()

      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const columns = [
    { field: 'picture', headerName: '', flex: 1, minWidth: 70,
    renderCell: (row) =>
    <Avatar sx={{ml:2}} src={row.row.picture ? `http://localhost:3001${row.row.picture}`:''}/> },
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
      renderCell: (row) =>
        <IconButton onClick={() => handleDownload(row.row)}>
          <DownloadIcon />
        </IconButton>
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 200,
      renderCell: (row) =>
        <Stack direction={'row'} spacing={2}>
          {role === 'user' ?
            <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleDeleteButton(row.row._id)}>Delete</Button>
            : <>
              <IconButton onClick={() => handleUpdate(row.row, 'Candidate')}>
                <DoneOutlineIcon />
              </IconButton>
              <IconButton onClick={() => handleUpdate(row.row, 'Rejected')}>
                <ClearIcon />
              </IconButton>
              <IconButton onClick={() => navigate(`/users/${row.row.userId}`)}>
                <InfoIcon />
              </IconButton>
            </>}

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