import { Button } from '@mui/material'
import React from 'react'

function BtnText({ type, onClick, sx, name }) {
    return (
        <Button
            variant='text'
            size='small'
            type={type}
            onClick={onClick}
            sx={{ ...sx }}>
            {name}
        </Button>
    )
}

export default BtnText
