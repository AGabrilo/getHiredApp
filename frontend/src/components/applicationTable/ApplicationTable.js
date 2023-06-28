import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'date',
    headerName: 'Date applied',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Company name',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Job name',
    width: 110,
  },
  {
    field: 'age',
    headerName: 'Job type',
    width: 110,
  },
  {
    field: 'a',
    headerName: 'Status',
    width: 110,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', date: '30.6.2023', age: 'remote', a:'developer' },
  { id: 2, lastName: 'Lannister', date: '14.6.2023', age: 'remote', a:'developer' },
  { id: 3, lastName: 'Lannister', date: '11.5.2023', age: 'remote', a:'developer' },
  { id: 4, lastName: 'Stark', date: '8.5.2023', age: 'remote', a:'developer' },
  { id: 5, lastName: 'Targaryen', date: '27.4.2023', age: 'remote', a:'developer' },
  { id: 6, lastName: 'Melisandre', date: '13.6.2023', age: 'remote', a:'developer' },
  { id: 7, lastName: 'Clifford', date: '1.4.2023', age: 'remote', a:'developer' },
  { id: 8, lastName: 'Frances', date: '3.4.2023', age: 'remote', a:'developer' },
  { id: 9, lastName: 'Roxie', date: '8.8.2022', age: 'remote', a:'developer' },
];

export default function ApplicationTable() {


  return (
    <Box sx={{ height: 'fit-content', p:8, backgroundColor:'white' }}>
        <Typography variant='h5' sx={{mb:3}}>Applications table</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}