import { Box, Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

const PopoverRole = ({ anchor, setAnchor }) => {
    return (
        <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={style_popover}
        >
            <Box p={1}>
                <Typography sx={{ mb: 1 }} fontWeight={500} color="white">Hosteler</Typography>
                <Typography sx={{ mb: 1 }} color="white" textAlign='justify'>
                Hosteler is a person who seeks boarding hostels. Hosteler can create posts.
                </Typography>
                <Typography sx={{ mb: 1 }} fontWeight={500} color="white">Manager</Typography>
                <Typography sx={{ mb: 1 }} color="white" textAlign='justify'>
                Manager is a person who owns the boarding hostel or boarding manager. Manager can create a boarding profile.
                </Typography>
            </Box>
        </Popover>)
}

export default PopoverRole

const style_popover = {
    '.MuiPopover-paper': {
        bgcolor: "background.mainbg",
        borderRadius: 0.3,
        mt: 0.5,
        width: 250
    },
}