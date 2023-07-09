// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography } from '@mui/material';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   {
//     field: 'date',
//     headerName: 'Date applied',
//     width: 150,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Company name',
//     width: 150,
//   },
//   {
//     field: 'age',
//     headerName: 'Job name',
//     width: 110,
//   },
//   {
//     field: 'age',
//     headerName: 'Job type',
//     width: 110,
//   },
//   {
//     field: 'a',
//     headerName: 'Status',
//     width: 110,
//   }
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', date: '30.6.2023', age: 'remote', a:'developer' },
//   { id: 2, lastName: 'Lannister', date: '14.6.2023', age: 'remote', a:'developer' },
//   { id: 3, lastName: 'Lannister', date: '11.5.2023', age: 'remote', a:'developer' },
//   { id: 4, lastName: 'Stark', date: '8.5.2023', age: 'remote', a:'developer' },
//   { id: 5, lastName: 'Targaryen', date: '27.4.2023', age: 'remote', a:'developer' },
//   { id: 6, lastName: 'Melisandre', date: '13.6.2023', age: 'remote', a:'developer' },
//   { id: 7, lastName: 'Clifford', date: '1.4.2023', age: 'remote', a:'developer' },
//   { id: 8, lastName: 'Frances', date: '3.4.2023', age: 'remote', a:'developer' },
//   { id: 9, lastName: 'Roxie', date: '8.8.2022', age: 'remote', a:'developer' },
// ];

// export default function ApplicationTable() {


//   return (
//     <Box sx={{ height: 'fit-content', p:8, backgroundColor:'white' }}>
//         <Typography variant='h5' sx={{mb:3}}>Applications table</Typography>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';



function ApplicationTable(props) {
  const { applications, users, jobs, getData , setApplications} = props;
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

  console.log('rowsss',rows)

  const handleDeleteButton = (id) => {
    console.log('iddd', id)
    fetch(`http://localhost:3001/api/application/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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
console.log('handleUpdate',applicationId, updatedStatus)
    fetch(`http://localhost:3001/api/application/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: updatedStatus }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
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
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 350,
      renderCell: (row) =>
        <Stack direction={'row'} spacing={2}>
          <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleUpdate(row.row._id, 'On hold')}>
            On hold
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleUpdate(row.row._id, 'Candidate')}>
            Candidate
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#f2572c' }} onClick={() => handleDeleteButton(row.row._id)}>Delete</Button>
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