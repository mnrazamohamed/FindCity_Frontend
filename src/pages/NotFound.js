import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" >
      <Typography fontSize={42} textAlign="center" fontWeight={900}>404 Not Found :(</Typography>
    </Box>
  )
}

export default NotFound