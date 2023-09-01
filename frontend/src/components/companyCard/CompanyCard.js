import React, { useEffect, useState } from 'react';
import { Box, Button, CardContent, Card, Typography, Stack, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../deleteDialog/DeleteDialog';
import CompanyDialogForm from '../companyDialogForm/CompanyDialogForm';

function CompanyCard(props) {
    const { company, top, handleDeleteButton, handleUpdate } = props
    const isCompany = true
    const shortedDescription = company.description && company.description.length > 200 ? company.description.length > 300  ? company.description.slice(0, 300) + '...': company.description.slice(0, 200) + '...' : company.description;
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

console.log(company)
    return (
        <Card
            orientation="horizontal"
            sx={{
                width: '100%',
                flexWrap: 'wrap',
                height:400
            }}
        >
            <CardContent sx={{   height:400}}>
                <Stack direction={{ md: top ? 'column' : 'row', xs: 'column' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ width: '100%' }}>
                    <img
                        src={company.picture ? `http://localhost:3001${company.picture}`:require("./company.jpeg")}
                        alt=""
                        width={170}
                        height={170}
                    />
                    <Box>
                        <Typography variant='h4'>
                            {company.name}
                        </Typography>
                        <Typography variant='h6'>
                            {company.location ? company.location.city : null}, {company.location ? company.location.country : null}
                        </Typography>
                    </Box>

                </Stack>
                <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>Description</Typography>
                <Typography variant='body1' sx={{ height:105}}>
                    {shortedDescription}
                </Typography>

                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c', mr: 2 }} onClick={() => { navigate(`/companies/${company._id}`) }}>
                    View details
                </Button>
                {isCompany && !top ?
                    <>
                        <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpen(true)}>
                            Delete
                        </Button>
                        <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f2572c', mr: 2 }} onClick={() => setOpenUpdate(true)}>
                            Update
                        </Button>
                    </>
                    : null}
            </CardContent>
            <DeleteDialog open={open} setOpen={setOpen} id={company._id} handleDeleteButton={handleDeleteButton} component='company' />
            <CompanyDialogForm open={openUpdate} setOpen={setOpenUpdate} company={company} handleUpdate={handleUpdate} />
        </Card>
    )
}

export default CompanyCard;