import { Button } from '@mui/material'
import React from 'react'

function BtnSecondary({ type, onClick, sx, name }) {
    return (
        <Button
            variant='contained'
            type={type}
            onClick={onClick}
            size="small"
            sx={{ ...style_btn, ...sx }}>
            {name}
        </Button>
    )
}

export default BtnSecondary

const style_btn = {
    mt: 3,
    mb: 1,
    minWidth: 100,
    bgcolor: "secondary.main",
    color: "white",
    ":hover": {
        bgcolor: "secondary.light",
    }
}
