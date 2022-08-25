import { Box, Dialog } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../../pages/Profile';
import { dialogActions } from '../../store/dialogSlice';

const UserDetails = () => {
    const dispatch = useDispatch()
    const { status, data } = useSelector(state => state.dialog.userDetails)
    return (
        <Dialog open={status} onClose={() => { dispatch(dialogActions.hide("userDetails")) }}>
            <Box width={500} height={500}>
                <UserProfile userDefault={data} />
            </Box>
        </Dialog >
    )
}


export default UserDetails