import { Autocomplete, Box, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const ACSelect = ({ formik, data, multiple = false }) => {
    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)


    if (multiple) {
        if (data.defaultValue)
            data.defaultValue = data.defaultValue[0][0].split(',').map(d => {
                return { name: capitalizeFirstLetter(String(d)), value: String(d) }
            })
        else data.defaultValue = undefined
    }
    else
        data.defaultValue = { name: data?.defaultValue ? capitalizeFirstLetter(data?.defaultValue) : "", value: data?.defaultValue }

    const onChange = (e, value) => {
        if (multiple)
            formik.values[data.value] = value.map(v => v.value)
        else
            formik.values[data.value] = value.value
    }

    return (
        <Box mb={1} >
            <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>

            <Autocomplete
                size='small'
                multiple={multiple}
                options={data.list}
                defaultValue={data.defaultValue}
                onChange={onChange}
                getOptionLabel={option => option.name}
                PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: "100px !important" } }}
                renderInput={(params) => (
                    < TextField
                        {...params}
                        name={data.value}
                        placeholder={data.name}
                        error={formik.touched[data.value] && Boolean(formik.errors[data.value])}
                        helperText={formik.touched[data.value] && formik.errors[data.value]}
                        onBlur={formik.handleBlur}
                        inputProps={{ ...params.inputProps, readOnly: true }}
                        sx={{ minWidth: 200, }}
                    />
                )}
            />
        </Box>
    )
}

export default ACSelect


const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}