import { Box, Dialog, DialogTitle } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dialogActions } from '../../store/dialogSlice';
import UserProfile from '../../pages/Profile'

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