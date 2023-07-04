import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Paper } from '@mui/material';

function JobFilters(props) {
    const { title, data, setFilter, filter } = props;

    const handleChange = (event) => {
        if (filter.includes(event.target.value)) {
            setFilter(array => array.filter((el) => el !== event.target.value))
        }
        else {
            setFilter(oldArray => [...oldArray, event.target.value])
        }
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ fontWeight: 700, color: '#f2572c' }}>
                {title}
            </Typography>
            <div>
                <FormGroup>
                    {data.map((item, i) => {
                        return <FormControlLabel
                            control={<Checkbox sx={{
                                color: '#f2572c',
                                '&.Mui-checked': {
                                    color: '#f2572c',
                                },
                            }} />}
                            label={item}
                            value={item}
                            onChange={(e) => handleChange(e)}
                            sx={{
                                "& .MuiSvgIcon-root":
                                    { fontSize: 28 }
                            }}
                        />
                    })}
                </FormGroup>
            </div>
        </Paper>
    )
}

export default JobFilters;
