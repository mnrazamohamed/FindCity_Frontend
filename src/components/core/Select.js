import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import MUISelect from '@mui/material/Select';
import React from 'react';

const Select = ({ data, formik }) => {


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <MUISelect
                    value={formik.values[data.value]}
                    placholder="asd"
                    size='small'
                    sx={{ ...style_txtbox }}
                    onChange={formik.handleChange}
                    error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                    helperText={formik.touched[data.value] && formik.errors[data.value]}
                    onBlur={formik.handleBlur}
                >
                    {data.items.map((item, i) => <MenuItem key={i} value={item.value}>{item.name}</MenuItem>)}
                </MUISelect>
            </FormControl>
        </Box>
    );
}


export default Select

const style_txtbox = {
    width: "100%",
    ".MuiSelect-outlined": {
        bgcolor: "white",
        borderRadius: 10
    }
}
