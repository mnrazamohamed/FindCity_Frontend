import { Box, Typography } from "@mui/material";
import React from 'react'


const Table = ({ name, value, fcwidth, fontSize = 14, sx, width }) => {
    return (
        <Box display="flex" width={width}>
            <Typography fontSize={fontSize} sx={{ width: fcwidth, ...sx }} color="black">{name}</Typography>
            <Typography fontSize={fontSize} textAlign="center" sx={{ width: 50, ...sx }} color="black">:</Typography>
            <Typography fontSize={fontSize} color="black" sx={{ ...sx }}>{value}</Typography>
        </Box>
    )
}

export default Table



