import { TextField } from '@mui/material'
import React from 'react'

const TextBox = ({ data, formik, sx }) => {
    return (
        <TextField
            variant="outlined"
            size='small'
            type="text"
            placeholder={data.placeholder}
            name={data.value}
            sx={{...style_txtbox, ...sx}}
            onChange={formik.handleChange}
            error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
            helperText={formik.touched[data.value] && formik.errors[data.value]}
            onBlur={formik.handleBlur}
            {...data.options}
        />)
}

export default TextBox

const style_txtbox = {
    width: "100%",
    ".MuiOutlinedInput-root": {
        bgcolor: "white",
        borderRadius: 10
    }
}
