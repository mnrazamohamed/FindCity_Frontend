import { Autocomplete, Box, Paper, Skeleton, TextField, Typography } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete';

import React from 'react'

const ACTSelect = ({ formik, data }) => {
    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.name,
    });

    if (!data)
        return (
            <>
                <Skeleton width={"100%"} height={24} sx={{ mb: 0.3 }} />
                <Skeleton width={"100%"} height={40} sx={{ mb: 0.3 }} />
            </>
        )

    if (data)
        return (
            <Box mb={1} >
                <Typography fontWeight={700} fontSize={14} sx={{ mb: 0.3, ml: 1.5 }} >{data.name}</Typography>
                <Autocomplete
                    size='small'
                    options={data.list}
                    defaultValue={{ name: data?.defaultValue ?? "" }}
                    onChange={(e, value) => formik.values[data.value] = value.value}
                    getOptionLabel={option => option.name}
                    filterOptions={filterOptions}
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
                            sx={{ minWidth: 200, }}
                        />
                    )}
                />
            </Box>
        )
}

export default ACTSelect


const paperStyle = {
    bgcolor: "background.mainbg",
    borderRadius: 0.3,
    mt: 0.5,
    "li": {
        color: "white",
        px: 2
    },
}